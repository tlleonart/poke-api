import Image from "next/image";
import Link from "next/link";
import type { FC } from "react";

interface EvolutionChainElement {
  id: number;
  name: string;
  image: string;
  isCurrent: boolean;
}

interface PokemonEvolutionChainProps {
  evolutions: EvolutionChainElement[];
}

export const PokemonEvolutionChain: FC<PokemonEvolutionChainProps> = ({
  evolutions,
}) => {
  if (evolutions.length <= 1) return null;

  return (
    <div className="rounded-2xl bg-white p-8 shadow-lg">
      <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
        Cadena de Evolución
      </h3>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {evolutions.map((evolution, index) => (
          <div key={evolution.id} className="flex items-center gap-6">
            <Link
              href={`/pokemon/${evolution.name}`}
              className={`group relative transition-all duration-300 ${
                evolution.isCurrent
                  ? "z-10 scale-110"
                  : "hover:z-10 hover:scale-105"
              }`}
            >
              <div
                className={`relative rounded-2xl bg-gradient-to-br p-6 shadow-lg transition-all duration-300 ${
                  evolution.isCurrent
                    ? "from-indigo-100 to-purple-100 shadow-xl ring-4 ring-indigo-400"
                    : "from-gray-50 to-gray-100 group-hover:ring-2 group-hover:ring-indigo-200 hover:from-indigo-50 hover:to-purple-50 hover:shadow-xl"
                }`}
              >
                {evolution.isCurrent && (
                  <div className="absolute -top-2 -right-2 rounded-full bg-indigo-500 px-3 py-1 text-xs font-bold text-white shadow-lg">
                    Actual
                  </div>
                )}
                <div className="relative mx-auto mb-3 h-24 w-24">
                  <Image
                    src={evolution.image}
                    alt={evolution.name}
                    width={96}
                    height={96}
                    className="object-contain drop-shadow-lg transition-all duration-300 group-hover:drop-shadow-xl"
                  />
                </div>
                <div className="text-center">
                  <div className="mb-1 text-xs text-gray-500">
                    #{evolution.id.toString().padStart(3, "0")}
                  </div>
                  <div className="text-sm font-bold text-gray-800 capitalize">
                    {evolution.name}
                  </div>
                </div>
              </div>
            </Link>
            {index < evolutions.length - 1 && (
              <div className="hidden items-center md:flex">
                <div className="h-0.5 w-8 bg-gradient-to-r from-indigo-300 to-purple-300"></div>
                <div className="ml-1 h-0 w-0 border-y-4 border-l-8 border-y-transparent border-l-purple-400"></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
