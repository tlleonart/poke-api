import {
  PokemonListSchema,
  SimpleEvolutionChainSchema,
  type PokemonListResponse,
  type SimpleEvolutionChainResponse,
} from "@/modules/shared/lib/schemas";
import type { SimplePokemon } from "@/modules/shared/types/pokemon-types";
import { API_ENDPOINTS } from "@/modules/shared/utils/api-endpoints";
import { TRPCError } from "@trpc/server";

export const loadSimplePokemonData = async (
  url: string,
  limit = 1500,
): Promise<SimplePokemon[]> => {
  try {
    const listResponse = await fetch(
      `${url}/${API_ENDPOINTS.pokemon}?limit=${limit}`,
    );

    if (!listResponse.ok || !listResponse) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "Error al cargar la lista de Pokemon.",
      });
    }

    const listData = (await listResponse.json()) as PokemonListResponse;
    const validatedList = PokemonListSchema.parse(listData);

    const evolutionChains = await getAllEvolutionChains(
      url,
      validatedList.results.length,
    );

    const simplePokemon: SimplePokemon[] = validatedList.results.map(
      (pokemon, index) => {
        const id = index + 1;
        const evolutionFamily = getEvolutionFamilyForPokemon(
          pokemon.name,
          evolutionChains,
        );

        return {
          id,
          name: pokemon.name,
          url: pokemon.url,
          images: {
            artwork: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`,
          },
          evolutionFamily,
        };
      },
    );

    return simplePokemon.sort((a, b) => a.id - b.id);
  } catch (error) {
    console.error("Error durante procesamiento simplificado:", error);
    throw new TRPCError({
      code: "INTERNAL_SERVER_ERROR",
      message: "Error al cargar los datos de Pokemon.",
    });
  }
};

const getAllEvolutionChains = async (
  url: string,
  length: number,
): Promise<Map<string, string[]>> => {
  const evolutionChains = new Map<string, string[]>();

  const evolutionPromises: Promise<null | { id: number; family: string[] }>[] =
    [];

  for (let i = 1; i <= length; i++) {
    evolutionPromises.push(
      fetch(`${url}/${API_ENDPOINTS.evolutionChain}/${i}`)
        .then(async (response) => {
          if (!response.ok) return null;

          const data = (await response.json()) as SimpleEvolutionChainResponse;
          const validatedChain = SimpleEvolutionChainSchema.parse(data);
          const family = extractEvolutionNames(validatedChain.chain);

          return { id: i, family };
        })
        .catch(() => null),
    );
  }
  const results = await Promise.all(evolutionPromises);

  for (const result of results) {
    if (result) {
      for (const pokemonName of result.family) {
        evolutionChains.set(pokemonName, result.family);
      }
    }
  }

  return evolutionChains;
};

const extractEvolutionNames = (chain: {
  species: { name: string };
  evolves_to: Array<{
    species: { name: string };
    evolves_to: Array<{
      species: { name: string };
      evolves_to: Array<unknown>;
    }>;
  }>;
}): string[] => {
  const names: string[] = [chain.species.name];

  for (const evolution of chain.evolves_to) {
    names.push(evolution.species.name);

    for (const thirdEvolution of evolution.evolves_to) {
      names.push(thirdEvolution.species.name);
    }
  }

  return names;
};

const getEvolutionFamilyForPokemon = (
  pokemonName: string,
  evolutionChains: Map<string, string[]>,
): string[] => {
  return evolutionChains.get(pokemonName) ?? [pokemonName];
};
