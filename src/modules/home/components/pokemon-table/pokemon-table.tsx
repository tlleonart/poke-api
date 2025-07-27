"use client";

import { type FC } from "react";
import { PokemonTableGrid } from "./pokemon-table-grid";
import { useSearchAndPagination } from "../../hooks/use-search-and-pagination";
import { SearchBar } from "../searchbar";
import type { SimplePokemon } from "@/modules/shared/types/pokemon-types";

interface PokemonTableProps {
  initialPokemon: SimplePokemon[];
}

export const PokemonTable: FC<PokemonTableProps> = ({ initialPokemon }) => {
  const {
    searchQuery,
    currentPage,
    filteredPokemons,
    setSearchQuery,
    setCurrentPage,
    resetSearch,
    totalResults,
    isSearching,
  } = useSearchAndPagination(initialPokemon);

  return (
    <div className="space-y-6">
      <SearchBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onReset={resetSearch}
        totalResults={totalResults}
        totalPokemons={initialPokemon.length}
        isSearching={isSearching}
      />

      <PokemonTableGrid
        pokemons={filteredPokemons}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};
