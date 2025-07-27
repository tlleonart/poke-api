"use client";

import { Search, X, Zap, Clock } from "lucide-react";
import { useEffect, useRef, type ChangeEvent, type FC } from "react";

interface SearchbarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onReset: () => void;
  totalResults: number;
  totalPokemons: number;
  isSearching: boolean;
  isDebouncing?: boolean;
}

export const SearchBar: FC<SearchbarProps> = ({
  searchQuery,
  onSearchChange,
  onReset,
  totalResults,
  totalPokemons,
  isSearching,
  isDebouncing = false,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(event.target.value);
  };

  const handleClear = () => {
    onReset();
    inputRef.current?.focus();
  };

  const getResultsText = () => {
    if (isDebouncing) return "Buscando...";
    if (!isSearching) return `${totalPokemons} Pokémons disponibles`;
    if (totalResults === 0) return "No se encontraron resultados";
    return `${totalResults} resultado${totalResults !== 1 ? "s" : ""} encontrado${totalResults !== 1 ? "s" : ""}`;
  };

  const getResultsColor = () => {
    if (isDebouncing) return "text-yellow-600";
    if (!isSearching) return "text-gray-600";
    if (totalResults === 0) return "text-red-600";
    return "text-green-600";
  };

  const getStatusIcon = () => {
    if (isDebouncing) {
      return <Clock className="h-4 w-4 animate-pulse" />;
    }
    if (isSearching && totalResults > 0) {
      return <Zap className="h-4 w-4" />;
    }
    return null;
  };

  return (
    <div className="mb-4 rounded-xl border border-gray-200 bg-white p-4 shadow-lg sm:mb-6 sm:rounded-2xl sm:p-6">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search
            className={`h-5 w-5 ${isDebouncing ? "animate-pulse text-yellow-500" : "text-gray-400"}`}
          />
        </div>

        <input
          ref={inputRef}
          type="text"
          value={searchQuery}
          onChange={handleInputChange}
          placeholder="Buscar Pokémon o evoluciones... (ej: pikachu, charmander)"
          className="block w-full rounded-lg border border-gray-300 bg-white py-2.5 pr-12 pl-10 text-base leading-5 text-gray-900 placeholder-gray-500 transition-all duration-200 focus:border-indigo-500 focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:outline-none sm:rounded-xl sm:py-3 sm:text-lg"
          autoComplete="off"
          spellCheck="false"
        />

        {searchQuery && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <button
              onClick={handleClear}
              className="rounded-full p-1 transition-colors hover:bg-gray-100 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              aria-label="Limpiar búsqueda"
            >
              <X className="h-4 w-4 text-gray-400 hover:text-gray-600" />
            </button>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-col gap-2 sm:mt-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
        <div className="flex items-center space-x-2">
          <span className={`text-sm font-medium ${getResultsColor()}`}>
            {getResultsText()}
          </span>

          {(isSearching || isDebouncing) && (
            <div
              className={`flex items-center space-x-1 ${isDebouncing ? "text-yellow-600" : "text-indigo-600"}`}
            >
              {getStatusIcon()}
              <span className="text-xs font-medium">
                {isDebouncing ? "Procesando..." : "Búsqueda en vivo"}
              </span>
            </div>
          )}
        </div>

        <div className="hidden items-center space-x-1 text-xs text-gray-400 sm:flex">
          <kbd className="rounded border border-gray-300 bg-gray-100 px-2 py-1 font-mono text-xs">
            ⌘K
          </kbd>
          <span>para buscar</span>
        </div>
      </div>

      {isSearching && !isDebouncing && totalResults === 0 && (
        <div className="mt-4 rounded-xl border border-yellow-200 bg-yellow-50 p-4">
          <h4 className="mb-2 text-sm font-medium text-yellow-800">
            Consejos de búsqueda:
          </h4>
          <ul className="space-y-1 text-sm text-yellow-700">
            <li>
              • Busca por nombre:{" "}
              <code className="rounded bg-yellow-200 px-1">pikachu</code>
            </li>
            <li>
              • Busca evoluciones:{" "}
              <code className="rounded bg-yellow-200 px-1">char</code> encuentra
              Charmander, Charmeleon, Charizard
            </li>
            <li>• Revisa la ortografía y prueba con menos caracteres</li>
          </ul>
        </div>
      )}

      {!isSearching && !isDebouncing && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-500">Búsquedas populares:</span>
          {["pikachu", "charizard", "mewtwo", "eevee", "lucario"].map(
            (term) => (
              <button
                key={term}
                onClick={() => onSearchChange(term)}
                className="cursor-pointer rounded-full bg-gray-100 px-3 py-1.5 text-sm text-gray-700 transition-all duration-200 hover:scale-105 hover:bg-indigo-100 hover:text-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              >
                {term}
              </button>
            ),
          )}
        </div>
      )}
    </div>
  );
};
