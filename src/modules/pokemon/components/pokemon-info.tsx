import type { PokemonDetail } from "@/modules/shared/types/pokemon-types";
import type { FC } from "react";

interface PokemonInfoProps {
  pokemon: PokemonDetail;
}

export const PokemonInfo: FC<PokemonInfoProps> = ({ pokemon }) => {
  const formatHeight = (height: number) => {
    return `${(height / 10).toFixed(1)} m`;
  };

  const formatWeight = (weight: number) => {
    return `${(weight / 10).toFixed(1)} kg`;
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="mb-6 text-2xl font-bold text-gray-800">Información</h3>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-blue-50 p-4 text-center">
            <div className="mb-1 text-3xl font-bold text-blue-600">
              {formatHeight(pokemon.height)}
            </div>
            <div className="text-sm font-medium text-gray-600">Altura</div>
          </div>

          <div className="rounded-xl bg-green-50 p-4 text-center">
            <div className="mb-1 text-3xl font-bold text-green-600">
              {formatWeight(pokemon.weight)}
            </div>
            <div className="text-sm font-medium text-gray-600">Peso</div>
          </div>
        </div>
        <div>
          <h4 className="mb-3 text-lg font-semibold text-gray-800">
            Habilidades
          </h4>
          <div className="space-y-2">
            {pokemon.abilities.map((ability) => (
              <div
                key={ability}
                className="rounded-lg border-l-4 border-indigo-500 bg-gray-50 px-4 py-3"
              >
                <span className="font-medium text-gray-800 capitalize">
                  {ability.replace("-", " ")}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
