"use client";

import { useMemo, type FC } from "react";
import { PokemonTableRow } from "./pokemon-table-row";
import type { PaginationInfo } from "../../types/pokemon-table.types";
import { PokemonTablePagination } from "./pokemon-table-pagination";
import type { SimplePokemon } from "@/modules/shared/types/pokemon-types";

interface PokemonTableGridProps {
  pokemons: SimplePokemon[];
  currentPage: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

const ITEMS_PER_PAGE = 10;

export const PokemonTableGrid: FC<PokemonTableGridProps> = ({
  pokemons,
  currentPage,
  onPageChange,
  itemsPerPage = ITEMS_PER_PAGE,
}) => {
  const paginationInfo: PaginationInfo = useMemo(() => {
    const totalPages = Math.ceil(pokemons.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return {
      currentPage,
      totalPages,
      totalItems: pokemons.length,
      itemsPerPage,
      startIndex,
      endIndex,
    };
  }, [pokemons.length, itemsPerPage, currentPage]);

  const currentPokemons = useMemo(() => {
    return pokemons.slice(paginationInfo.startIndex, paginationInfo.endIndex);
  }, [pokemons, paginationInfo.startIndex, paginationInfo.endIndex]);

  if (pokemons.length === 0) {
    return (
      <div className="flex items-center justify-center py-12 sm:py-16 lg:py-20">
        <div className="text-center">
          <div className="mb-4 text-4xl sm:text-6xl">🔍</div>
          <h3 className="mb-2 text-lg font-semibold text-gray-900 sm:text-xl">
            No se encontraron Pokémon
          </h3>
          <p className="text-gray-600">Intenta con una búsqueda diferente</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-lg sm:rounded-2xl">
      <div className="border-b border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-4 py-4 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
          <h2 className="text-lg font-bold text-gray-900 sm:text-xl">
            Resultados
          </h2>
          <div className="text-sm text-gray-600">
            <span className="font-medium text-indigo-600">
              {pokemons.length}
            </span>{" "}
            Pokémon encontrados
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                Pokémon
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                Información
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:table-cell">
                Familia de Evolución
              </th>
              <th className="relative px-3 py-3 sm:px-6">
                <span className="sr-only">Acciones</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {currentPokemons.map((pokemon, index) => (
              <PokemonTableRow
                key={pokemon.id}
                pokemon={pokemon}
                isPriority={currentPage === 1 && index < 5}
              />
            ))}
          </tbody>
        </table>
      </div>

      <PokemonTablePagination
        paginationInfo={paginationInfo}
        onPageChange={onPageChange}
      />
    </div>
  );
};
