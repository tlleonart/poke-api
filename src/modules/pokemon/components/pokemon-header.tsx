import Image from "next/image";
import type { FC } from "react";
import { TypeBadges } from "./pokemon-type-badges";
import type { PokemonDetail } from "@/modules/shared/types/pokemon-types";

interface PokemonHeaderProps {
  pokemon: PokemonDetail;
}

export const PokemonHeader: FC<PokemonHeaderProps> = ({ pokemon }) => {
  const getGenerationNumber = (generation: string) => {
    return generation.replace("generation-", "").toUpperCase();
  };

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-xl">
      <div className="relative bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-8">
        <div className="flex flex-col items-center gap-8 md:flex-row">
          <div className="relative">
            <div className="flex h-48 w-48 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm">
              <Image
                src={pokemon.image}
                alt={pokemon.name}
                width={160}
                height={160}
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
            <div className="absolute -top-2 -right-2 rounded-full bg-white px-4 py-2 shadow-lg">
              <span className="text-sm font-bold text-gray-700">
                #{pokemon.id.toString().padStart(3, "0")}
              </span>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h1 className="mb-4 text-5xl font-bold text-white capitalize">
              {pokemon.name}
            </h1>
            <div className="mb-6 flex flex-col items-center gap-4 md:flex-row md:items-start">
              <TypeBadges types={pokemon.types} />
              <div className="flex items-center gap-4">
                <span className="rounded-full bg-white/20 px-4 py-2 font-semibold text-white backdrop-blur-sm">
                  Gen {getGenerationNumber(pokemon.generation)}
                </span>
                {pokemon.isLegendary && (
                  <span className="rounded-full bg-yellow-400 px-4 py-2 text-sm font-bold text-yellow-900">
                    Legendario
                  </span>
                )}
                {pokemon.isMythical && (
                  <span className="rounded-full bg-purple-400 px-4 py-2 text-sm font-bold text-purple-900">
                    Mítico
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
