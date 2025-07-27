interface NamedResource {
  name: string;
  url: string;
}

export interface SimplePokemon {
  id: number;
  name: string;
  url: string;
  images: {
    artwork: string;
    sprite: string;
  };
  evolutionFamily: string[];
}

export interface Evolution {
  id: number;
  name: string;
  image: string;
  isCurrent: boolean;
}

export interface PokemonDetail {
  id: number;
  name: string;
  image: string;
  height: number;
  weight: number;
  types: string[];
  generation: string;
  stats: Record<string, number>;
  abilities: string[];
  evolutions: Evolution[];
  isLegendary: boolean;
  isMythical: boolean;
  flavorText: string;
}

export interface EvolutionDetail {
  min_level?: number | null;
  trigger: NamedResource;
  item?: NamedResource | null;
  gender?: number | null;
  held_item?: NamedResource | null;
  known_move?: NamedResource | null;
  known_move_type?: NamedResource | null;
  location?: NamedResource | null;
  min_happiness?: number | null;
  min_beauty?: number | null;
  min_affection?: number | null;
  needs_overworld_rain?: boolean;
  party_species?: NamedResource | null;
  party_type?: NamedResource | null;
  relative_physical_stats?: number | null;
  time_of_day?: string;
  trade_species?: NamedResource | null;
  turn_upside_down?: boolean;
}

export interface ExtractedEvolution {
  name: string;
  evolutionDetails?: EvolutionDetail;
}
