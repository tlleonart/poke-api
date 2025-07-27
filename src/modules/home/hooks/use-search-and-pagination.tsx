"use client";

import type { SimplePokemon } from "@/modules/shared/types/pokemon-types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface SearchAndPaginationState {
  searchQuery: string;
  currentPage: number;
}

interface UseSearchAndPaginationReturn {
  searchQuery: string;
  currentPage: number;
  filteredPokemons: SimplePokemon[];
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  resetSearch: () => void;
  totalResults: number;
  isSearching: boolean;
  isDebouncing: boolean;
}

const DEBOUNCE_DELAY = 300;

export const useSearchAndPagination = (
  allPokemons: SimplePokemon[],
): UseSearchAndPaginationReturn => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isDebouncing, setIsDebouncing] = useState(false);

  const [optimisticState, setOptimisticState] =
    useState<SearchAndPaginationState>({
      searchQuery: "",
      currentPage: 1,
    });

  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");

  useEffect(() => {
    const urlSearch = searchParams.get("search") ?? "";
    const urlPage = searchParams.get("page") ?? "1";

    const newState = {
      searchQuery: urlSearch,
      currentPage: parseInt(urlPage),
    };

    setOptimisticState(newState);
    setDebouncedSearchQuery(urlSearch);
  }, [searchParams]);

  const updateURL = useCallback(
    (searchQuery: string, currentPage: number) => {
      const params = new URLSearchParams();

      if (searchQuery.trim()) {
        params.set("search", searchQuery.trim());
      }

      if (currentPage > 1) {
        params.set("page", currentPage.toString());
      }

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.push(newUrl);
    },
    [router, pathname],
  );

  const filteredPokemons = useMemo(() => {
    if (!debouncedSearchQuery.trim()) {
      return allPokemons;
    }

    const query = debouncedSearchQuery.toLowerCase().trim();

    return allPokemons.filter((pokemon) => {
      const nameMatch = pokemon.name.toLowerCase().includes(query);
      const evolutionMatch = pokemon.evolutionFamily.some((evolution) =>
        evolution.toLowerCase().includes(query),
      );

      return nameMatch || evolutionMatch;
    });
  }, [allPokemons, debouncedSearchQuery]);

  const setSearchQuery = useCallback(
    (query: string) => {
      setOptimisticState((prev) => ({
        ...prev,
        searchQuery: query,
        currentPage: 1,
      }));

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      if (query.trim() === "") {
        setDebouncedSearchQuery("");
        setIsDebouncing(false);
        updateURL("", 1);
        return;
      }

      setIsDebouncing(true);

      debounceTimerRef.current = setTimeout(() => {
        setDebouncedSearchQuery(query);
        setIsDebouncing(false);
        updateURL(query, 1);
      }, DEBOUNCE_DELAY);
    },
    [updateURL],
  );

  const setCurrentPage = useCallback(
    (page: number) => {
      setOptimisticState((prev) => ({
        ...prev,
        currentPage: page,
      }));

      updateURL(debouncedSearchQuery, page);
    },
    [updateURL, debouncedSearchQuery],
  );

  const resetSearch = useCallback(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    setOptimisticState({
      searchQuery: "",
      currentPage: 1,
    });

    setDebouncedSearchQuery("");
    setIsDebouncing(false);
    router.push(pathname);
  }, [router, pathname]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    searchQuery: optimisticState.searchQuery,
    currentPage: optimisticState.currentPage,
    filteredPokemons,
    setSearchQuery,
    setCurrentPage,
    resetSearch,
    totalResults: filteredPokemons.length,
    isSearching: debouncedSearchQuery.trim().length > 0,
    isDebouncing,
  };
};
