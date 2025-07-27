import { PokemonTable } from "@/modules/home/components";
import { api, HydrateClient } from "@/trpc/server";

export default async function Home() {
  const pokemonList = await api.pokemon.getAll();

  if (!pokemonList) return null;

  return (
    <HydrateClient>
      <main className="p-10">
        <PokemonTable initialPokemon={pokemonList} />
      </main>
    </HydrateClient>
  );
}
