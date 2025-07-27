import type { FC } from "react";

interface PokemonStatsDisplayProps {
  stats: Record<string, number>;
}

const statLabels: Record<string, string> = {
  hp: "PS",
  attack: "Ataque",
  defense: "Defensa",
  "special-attack": "At. Especial",
  "special-defense": "Def. Especial",
  speed: "Velocidad",
};

const statColors: Record<string, string> = {
  hp: "bg-red-500",
  attack: "bg-orange-500",
  defense: "bg-yellow-500",
  "special-attack": "bg-blue-500",
  "special-defense": "bg-green-500",
  speed: "bg-purple-500",
};

export const PokemonStatsDisplay: FC<PokemonStatsDisplayProps> = ({
  stats,
}) => {
  const maxStat = Math.max(...Object.values(stats));
  const totalStats = Object.values(stats).reduce((sum, stat) => sum + stat, 0);

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg">
      <h3 className="tex-gray-800 mb-6 text-2xl font-bold">Estadísticas</h3>
      <div className="mb-6 space-y-4">
        {Object.entries(stats).map(([statKey, value]) => {
          const percentage = (value / maxStat) * 100;
          const colorClass = statColors[statKey] ?? "bg-gray-500";
          const label = statLabels[statKey] ?? statKey;

          return (
            <div key={statKey} className="flex items-center gap-4">
              <div className="w-24 text-sm font-medium text-gray-700">
                {label}
              </div>

              <div className="relative flex-1">
                <div className="h-6 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className={`h-full ${colorClass} relative rounded-full transition-all duration-1000 ease-out`}
                    style={{ width: `${percentage}%` }}
                  >
                    <div className="absolute inset-0 animate-pulse bg-white/20"></div>
                  </div>
                </div>
              </div>

              <div className="w-12 text-right font-bold text-gray-800">
                {value}
              </div>
            </div>
          );
        })}
      </div>
      <div className="border-t pt-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-semibold text-gray-800">Total:</span>
          <span className="text-2xl font-bold text-indigo-600">
            {totalStats}
          </span>
        </div>
      </div>
    </div>
  );
};
