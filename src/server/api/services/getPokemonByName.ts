import {
  PokemonDataSchema,
  PokemonSpeciesDataSchema,
  SimpleEvolutionChainSchema,
  type FlavorTextEntries,
  type PokemonDataResponse,
  type PokemonSpeciesDataResponse,
  type SimpleEvolutionChainResponse,
} from "@/modules/shared/lib/schemas";
import type {
  Evolution,
  ExtractedEvolution,
  PokemonDetail,
} from "@/modules/shared/types/pokemon-types";
import { API_ENDPOINTS } from "@/modules/shared/utils/api-endpoints";
import { TRPCError } from "@trpc/server";

export const loadPokemonDetail = async (
  nameOrId: string,
  url: string,
): Promise<PokemonDetail> => {
  try {
    const pokemonResponse = await fetch(
      `${url}/${API_ENDPOINTS.pokemon}/${nameOrId}`,
    );

    if (!pokemonResponse.ok) {
      throw new TRPCError({
        code: "NOT_FOUND",
        message: `Pokémon ${nameOrId} no encontrado`,
      });
    }

    const pokemonData = (await pokemonResponse.json()) as PokemonDataResponse;
    const validatedPokemonData = PokemonDataSchema.parse(pokemonData);

    const speciesResponse = await fetch(validatedPokemonData.species.url);
    const speciesData =
      (await speciesResponse.json()) as PokemonSpeciesDataResponse;
    const validatedSpeciesData = PokemonSpeciesDataSchema.parse(speciesData);

    const evolutionResponse = await fetch(
      validatedSpeciesData.evolution_chain.url,
    );
    const evolutionData =
      (await evolutionResponse.json()) as SimpleEvolutionChainResponse;
    const validatedChain = SimpleEvolutionChainSchema.parse(evolutionData);

    const evolutions = await buildDetailedEvolutionChain(
      validatedChain,
      validatedPokemonData.name,
      url,
    );

    const flavorText = getFlavorText(validatedSpeciesData.flavor_text_entries);

    const pokemonDetail: PokemonDetail = {
      id: validatedPokemonData.id,
      name: validatedPokemonData.name,
      image:
        validatedPokemonData.sprites.other?.["official-artwork"]
          ?.front_default ??
        validatedPokemonData.sprites.front_default ??
        "",
      height: validatedPokemonData.height,
      weight: validatedPokemonData.weight,
      types: validatedPokemonData.types.map((t) => t.type.name),
      generation: `generation-${
        validatedSpeciesData.generation?.name
          ? parseInt(validatedSpeciesData.generation.name.split("-")[1] ?? "1")
          : 1
      }`,
      stats: validatedPokemonData.stats.reduce(
        (acc, stat) => {
          acc[stat.stat.name] = stat.base_stat;
          return acc;
        },
        {} as Record<string, number>,
      ),
      abilities: validatedPokemonData.abilities.map((a) => a.ability.name),
      evolutions,
      isLegendary: validatedSpeciesData.is_legendary,
      isMythical: validatedSpeciesData.is_mythical,
      flavorText,
    };

    return pokemonDetail;
  } catch (error) {
    console.error(`Error cargando detalles de ${nameOrId}: `, error);

    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: `Error al cargar los detalles de ${nameOrId}`,
    });
  }
};

const buildDetailedEvolutionChain = async (
  chain: SimpleEvolutionChainResponse,
  currentPokemonName: string,
  url: string,
): Promise<Evolution[]> => {
  const extractAllEvolutions = (
    evolutionChain: SimpleEvolutionChainResponse["chain"],
  ): ExtractedEvolution[] => {
    const evolutions: ExtractedEvolution[] = [
      { name: evolutionChain.species.name },
    ];

    for (const evolution of evolutionChain.evolves_to) {
      evolutions.push({
        name: evolution.species.name,
        evolutionDetails: evolution.evolution_details?.[0],
      });

      for (const thirdEvolution of evolution.evolves_to) {
        evolutions.push({
          name: thirdEvolution.species.name,
          evolutionDetails: thirdEvolution.evolution_details?.[0],
        });
      }
    }

    return evolutions;
  };

  const evolutions = extractAllEvolutions(chain.chain);

  const detailedEvolutions = await Promise.all(
    evolutions.map(async (evolution) => {
      try {
        const response = await fetch(
          `${url}/${API_ENDPOINTS.pokemon}/${evolution.name}`,
        );

        if (!response.ok) {
          throw new Error(`Pokemon ${evolution.name} not found`);
        }

        const data = (await response.json()) as PokemonDataResponse;

        return {
          id: data.id,
          name: data.name,
          image:
            data.sprites.other?.["official-artwork"]?.front_default ??
            data.sprites.front_default ??
            "",
          isCurrent: data.name === currentPokemonName,
        };
      } catch (error) {
        console.error(`Error loading evolution ${evolution.name}:`, error);
        return null;
      }
    }),
  );

  return detailedEvolutions.filter((evo): evo is Evolution => evo !== null);
};

const getFlavorText = (flavorTextEntries: FlavorTextEntries): string => {
  const spanishEntry = flavorTextEntries.find(
    (entry) => entry.language.name === "es",
  );

  if (spanishEntry) {
    return spanishEntry.flavor_text.replace(/\n/g, " ").replace(/\f/g, " ");
  }

  const englishEntry = flavorTextEntries.find(
    (entry) => entry.language.name === "en",
  );

  if (englishEntry) {
    return englishEntry.flavor_text.replace(/\n/g, " ").replace(/\f/g, " ");
  }

  return "No hay descripción disponible.";
};
