"use client";

import type { FC } from "react";
import type { PaginationInfo } from "../../types/pokemon-table.types";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PokemonTablePaginationProps {
  paginationInfo: PaginationInfo;
  onPageChange: (page: number) => void;
}

export const PokemonTablePagination: FC<PokemonTablePaginationProps> = ({
  paginationInfo,
  onPageChange,
}) => {
  const { currentPage, totalPages, totalItems, startIndex, endIndex } =
    paginationInfo;

  if (totalPages <= 1) {
    return null;
  }

  const goToPage = (page: number) => {
    onPageChange(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div className="flex items-center justify-between border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 px-3 py-3 sm:px-4 sm:py-4 lg:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-700 sm:px-4"
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Anterior
        </button>

        <div className="flex items-center px-3">
          <span className="text-sm font-medium text-gray-700">
            {currentPage} / {totalPages}
          </span>
        </div>

        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="relative inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-700 sm:px-4"
        >
          Siguiente
          <ChevronRight className="ml-1 h-4 w-4" />
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700">
            Mostrando{" "}
            <span className="font-medium text-indigo-600">
              {startIndex + 1}
            </span>{" "}
            a{" "}
            <span className="font-medium text-indigo-600">
              {Math.min(endIndex, totalItems)}
            </span>{" "}
            de <span className="font-medium text-indigo-600">{totalItems}</span>{" "}
            resultados
          </p>
        </div>

        <div>
          <nav className="relative z-0 inline-flex -space-x-px rounded-lg shadow-sm">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-500"
              aria-label="Página anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {Array.from({ length: Math.min(totalPages, 7) }, (_, i) => {
              let pageNumber;
              if (totalPages <= 7) {
                pageNumber = i + 1;
              } else if (currentPage <= 4) {
                pageNumber = i + 1;
              } else if (currentPage >= totalPages - 3) {
                pageNumber = totalPages - 6 + i;
              } else {
                pageNumber = currentPage - 3 + i;
              }

              return (
                <button
                  key={pageNumber}
                  onClick={() => goToPage(pageNumber)}
                  className={`relative inline-flex items-center border px-3 py-2 text-sm font-medium transition-all duration-200 lg:px-4 ${
                    currentPage === pageNumber
                      ? "z-10 border-indigo-500 bg-indigo-500 text-white shadow-lg"
                      : "border-gray-300 bg-white text-gray-500 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600"
                  }`}
                  aria-label={`Ir a página ${pageNumber}`}
                  aria-current={currentPage === pageNumber ? "page" : undefined}
                >
                  {pageNumber}
                </button>
              );
            })}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-lg border border-gray-300 bg-white px-2 py-2 text-sm font-medium text-gray-500 transition-all duration-200 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-600 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-500"
              aria-label="Página siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};
