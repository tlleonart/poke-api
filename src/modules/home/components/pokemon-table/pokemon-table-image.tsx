"use client";

import Image from "next/image";
import { useState, type FC } from "react";
import { ImageIcon, Zap } from "lucide-react";
import type { SimplePokemon } from "@/modules/shared/types/pokemon-types";

interface PokemonTableImageProps {
  pokemon: SimplePokemon;
  size?: number;
  priority?: boolean;
  quality?: number;
  className?: string;
}

type ImageState = "artwork" | "sprite" | "placeholder";

export const PokemonTableImage: FC<PokemonTableImageProps> = ({
  pokemon,
  size = 64,
  priority = false,
  quality = 30,
  className = "object-contain",
}) => {
  const [imageState, setImageState] = useState<ImageState>("artwork");

  const handleImageError = () => {
    setImageState((currentState) => {
      if (currentState === "artwork") {
        return "sprite";
      }
      return "placeholder";
    });
  };

  const getCurrentImageSrc = (): string => {
    switch (imageState) {
      case "artwork":
        return pokemon.images.artwork;
      case "sprite":
        return pokemon.images.sprite;
      default:
        return "";
    }
  };

  const renderPlaceholder = () => (
    <div
      className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-100 to-gray-200"
      style={{ width: size, height: size }}
    >
      <div className="flex flex-col items-center space-y-1">
        <ImageIcon className="h-6 w-6 text-gray-400" />
        <span className="px-1 text-center text-xs font-medium text-gray-500">
          #{pokemon.id.toString().padStart(3, "0")}
        </span>
      </div>
    </div>
  );

  const renderImage = () => (
    <div className="group relative">
      <Image
        src={getCurrentImageSrc()}
        alt={`${pokemon.name} - Pokémon #${pokemon.id}`}
        width={size}
        height={size}
        className={`${className} transition-opacity duration-200`}
        onError={handleImageError}
        priority={priority}
        quality={quality}
        unoptimized={imageState === "sprite"}
      />

      {imageState === "sprite" && (
        <div className="absolute -top-1 -right-1 rounded-full border border-yellow-300 bg-yellow-100 p-1">
          <Zap className="h-3 w-3 text-yellow-600" />
        </div>
      )}
    </div>
  );

  return (
    <div
      className="relative flex-shrink-0"
      style={{ width: size, height: size }}
    >
      {imageState === "placeholder" ? renderPlaceholder() : renderImage()}
    </div>
  );
};
