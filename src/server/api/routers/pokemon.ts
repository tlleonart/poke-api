import { createTRPCRouter, publicProcedure } from "../trpc";
import z from "zod";
import { loadSimplePokemonData } from "../services/getAllPokemons";
import { loadPokemonDetail } from "../services/getPokemonByName";
import type {
  PokemonDetail,
  SimplePokemon,
} from "@/modules/shared/types/pokemon-types";

const pokemonDataCache = new Map<string, SimplePokemon[]>();
const pokemonDetailCache = new Map<string, PokemonDetail>();

const API_URL = process.env.API_URL ?? "https://pokeapi.co/api/v2";

export const PokemonRouter = createTRPCRouter({
  getAll: publicProcedure.query(async () => {
    const ALL_POKEMON_KEY = "simple_pokemon_data";

    if (!pokemonDataCache.has(ALL_POKEMON_KEY)) {
      const allPokemon = await loadSimplePokemonData(API_URL);
      pokemonDataCache.set(ALL_POKEMON_KEY, allPokemon);
    }

    return pokemonDataCache.get(ALL_POKEMON_KEY);
  }),
  getByName: publicProcedure
    .input(z.string().min(1, "El nombre del Pokémon es requerido"))
    .query(async ({ input }) => {
      const cacheKey = `pokemon_detail_${input.toLowerCase()}`;

      if (!pokemonDetailCache.has(cacheKey)) {
        const pokemonDetail = await loadPokemonDetail(
          input.toLowerCase(),
          API_URL,
        );
        pokemonDetailCache.set(cacheKey, pokemonDetail);
      }

      return pokemonDetailCache.get(cacheKey);
    }),
});
