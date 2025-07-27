import { ChevronRight } from "lucide-react";
import Link from "next/link";
import type { FC } from "react";
import type { SimplePokemon } from "../types/pokemon-types";

interface EvolutionBadgeProps {
  pokemon: SimplePokemon;
  showArrows?: boolean;
}

export const EvolutionBadge: FC<EvolutionBadgeProps> = ({
  pokemon,
  showArrows = true,
}) => {
  if (!pokemon.evolutionFamily || pokemon.evolutionFamily.length === 0) {
    return (
      <span className="inline-flex items-center rounded-full bg-gray-100 px-2 py-1 text-xs font-medium text-gray-800 capitalize">
        {pokemon.name}
      </span>
    );
  }

  return (
    <div className="flex flex-wrap gap-1">
      {pokemon.evolutionFamily.map((evolution, index) => {
        const isCurrentPokemon = evolution === pokemon.name;
        const isLastEvolution = index === pokemon.evolutionFamily.length - 1;

        return (
          <div key={evolution} className="flex items-center">
            <Link
              href={`/pokemon/${evolution}`}
              className={`inline-flex cursor-pointer items-center rounded-full px-2 py-1 text-xs font-medium capitalize transition-colors hover:opacity-80 ${
                isCurrentPokemon
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
            >
              {evolution}
            </Link>

            {showArrows && !isLastEvolution && (
              <ChevronRight className="mx-1 h-3 w-3 text-gray-400" />
            )}
          </div>
        );
      })}
    </div>
  );
};
