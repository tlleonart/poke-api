import { PokemonDetailPage } from "@/modules/pokemon/components";
import { api } from "@/trpc/server";

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pokemonData = await api.pokemon.getByName(name);

  if (!pokemonData) return null;

  return <PokemonDetailPage pokemon={pokemonData} />;
}
