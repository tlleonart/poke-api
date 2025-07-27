import type { FC } from "react";
import { PokemonHeader } from "./pokemon-header";
import { PokemonInfo } from "./pokemon-info";
import { PokemonStatsDisplay } from "./pokemon-stats-display";
import { PokemonEvolutionChain } from "./pokemon-evolution-chain";
import type { PokemonDetail } from "@/modules/shared/types/pokemon-types";

interface PokemonDetailPageProps {
  pokemon: PokemonDetail;
}

export const PokemonDetailPage: FC<PokemonDetailPageProps> = ({ pokemon }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="mx-auto max-w-6xl px-4 py-8">
        <PokemonHeader pokemon={pokemon} />
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-1">
            <PokemonInfo pokemon={pokemon} />
          </div>
          <div className="lg:col-span-2">
            <PokemonStatsDisplay stats={pokemon.stats} />
          </div>
        </div>
        <div className="mt-12">
          <PokemonEvolutionChain evolutions={pokemon.evolutions} />
        </div>
        {pokemon.flavorText && (
          <div className="mt-8 rounded-2xl bg-white p-8 shadow-lg">
            <h3 className="mb-4 text-2xl font-bold text-gray-800">
              Descripción
            </h3>
            <p className="text-lg leading-relaxed text-gray-600 italic">
              &quot;{pokemon.flavorText}&quot;
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
