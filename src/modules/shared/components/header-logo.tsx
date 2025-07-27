import type { FC } from "react";

export const HeaderLogo: FC = () => {
  return (
    <div className="group flex items-center space-x-2 sm:space-x-3">
      <div className="relative">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 shadow-lg transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl sm:h-10 sm:w-10">
          <span className="text-sm font-bold text-white sm:text-lg">P</span>
        </div>
        <div className="absolute -top-1 -right-1 h-3 w-3 animate-pulse rounded-full bg-yellow-400 sm:h-4 sm:w-4"></div>
      </div>
      <div className="hidden sm:block">
        <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-xl font-bold text-transparent sm:text-2xl">
          PokéDex
        </h1>
        <p className="-mt-1 text-xs text-gray-500">Gotta catch &apos;em all</p>
      </div>
      <div className="sm:hidden">
        <h1 className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-lg font-bold text-transparent">
          PokéDex
        </h1>
      </div>
    </div>
  );
};
