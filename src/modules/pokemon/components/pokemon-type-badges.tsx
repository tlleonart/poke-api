interface TypeBadgesProps {
  types: string[];
}

const typeColors: Record<string, { bg: string; text: string }> = {
  normal: { bg: "bg-gray-400", text: "text-white" },
  fire: { bg: "bg-red-500", text: "text-white" },
  water: { bg: "bg-blue-500", text: "text-white" },
  electric: { bg: "bg-yellow-400", text: "text-gray-900" },
  grass: { bg: "bg-green-500", text: "text-white" },
  ice: { bg: "bg-blue-200", text: "text-blue-900" },
  fighting: { bg: "bg-red-700", text: "text-white" },
  poison: { bg: "bg-purple-500", text: "text-white" },
  ground: { bg: "bg-yellow-600", text: "text-white" },
  flying: { bg: "bg-indigo-400", text: "text-white" },
  psychic: { bg: "bg-pink-500", text: "text-white" },
  bug: { bg: "bg-green-400", text: "text-white" },
  rock: { bg: "bg-yellow-800", text: "text-white" },
  ghost: { bg: "bg-purple-700", text: "text-white" },
  dragon: { bg: "bg-indigo-700", text: "text-white" },
  dark: { bg: "bg-gray-800", text: "text-white" },
  steel: { bg: "bg-gray-500", text: "text-white" },
  fairy: { bg: "bg-pink-300", text: "text-pink-900" },
};

export function TypeBadges({ types }: TypeBadgesProps) {
  return (
    <div className="flex gap-2">
      {types.map((type) => {
        const colors = typeColors[type] ?? typeColors.normal;
        return (
          <span
            key={type}
            className={`${colors?.bg} ${colors?.text} rounded-full px-4 py-2 text-sm font-bold tracking-wider uppercase shadow-lg`}
          >
            {type}
          </span>
        );
      })}
    </div>
  );
}
