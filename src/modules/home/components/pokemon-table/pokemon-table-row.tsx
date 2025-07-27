import type { FC } from "react";
import { EvolutionBadge } from "@/modules/shared/components/evolution-badge";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { PokemonTableImage } from "./pokemon-table-image";
import type { SimplePokemon } from "@/modules/shared/types/pokemon-types";

interface PokemonTableRowProps {
  pokemon: SimplePokemon;
  isPriority?: boolean;
}

export const PokemonTableRow: FC<PokemonTableRowProps> = ({
  pokemon,
  isPriority = false,
}) => {
  return (
    <tr className="transition-all duration-200 focus-within:bg-indigo-50 hover:bg-indigo-50">
      <td className="px-3 py-4 sm:px-6">
        <PokemonTableImage pokemon={pokemon} priority={isPriority} />
      </td>

      <td className="px-3 py-4 sm:px-6">
        <div className="space-y-1">
          <h3 className="text-sm font-medium text-gray-900 capitalize sm:text-base">
            {pokemon.name}
          </h3>
          <p
            className="text-xs text-gray-500 sm:text-sm"
            aria-label={`Pokémon número ${pokemon.id}`}
          >
            #{pokemon.id.toString().padStart(3, "0")}
          </p>
          <div className="mt-2 sm:hidden">
            <EvolutionBadge pokemon={pokemon} />
          </div>
        </div>
      </td>

      <td className="hidden px-6 py-4 sm:table-cell">
        <EvolutionBadge pokemon={pokemon} />
      </td>

      <td className="px-3 py-4 text-right sm:px-6">
        <Link
          href={`/pokemon/${pokemon.name}`}
          className="inline-flex items-center rounded-lg border border-transparent bg-indigo-50 px-2.5 py-1.5 text-xs font-medium text-indigo-600 transition-all duration-200 hover:scale-105 hover:bg-indigo-100 hover:shadow-lg focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1 focus:outline-none active:scale-95 sm:px-3 sm:py-2 sm:text-sm"
          aria-label={`Ver detalles de ${pokemon.name}`}
        >
          <span className="hidden sm:inline">Ver más</span>
          <span className="sm:hidden">Ver</span>
          <ChevronRightIcon
            className="ml-1 h-3 w-3 sm:h-4 sm:w-4"
            aria-hidden="true"
          />
        </Link>
      </td>
    </tr>
  );
};
