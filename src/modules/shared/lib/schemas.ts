import { z } from "zod";

const NamedAPIResourceSchema = z.object({
  name: z.string(),
  url: z.string(),
});

export const PokemonListSchema = z.object({
  count: z.number(),
  next: z.string().nullable(),
  previous: z.string().nullable(),
  results: z.array(NamedAPIResourceSchema),
});

export type PokemonListResponse = z.infer<typeof PokemonListSchema>;

const EvolutionDetailSchema = z.object({
  min_level: z.number().nullable().optional(),
  trigger: NamedAPIResourceSchema,
  item: NamedAPIResourceSchema.nullable().optional(),
  gender: z.number().nullable().optional(),
  held_item: NamedAPIResourceSchema.nullable().optional(),
  known_move: NamedAPIResourceSchema.nullable().optional(),
  known_move_type: NamedAPIResourceSchema.nullable().optional(),
  location: NamedAPIResourceSchema.nullable().optional(),
  min_happiness: z.number().nullable().optional(),
  min_beauty: z.number().nullable().optional(),
  min_affection: z.number().nullable().optional(),
  needs_overworld_rain: z.boolean().optional(),
  party_species: NamedAPIResourceSchema.nullable().optional(),
  party_type: NamedAPIResourceSchema.nullable().optional(),
  relative_physical_stats: z.number().nullable().optional(),
  time_of_day: z.string().optional(),
  trade_species: NamedAPIResourceSchema.nullable().optional(),
  turn_upside_down: z.boolean().optional(),
});

export type EvolutionDetailResponse = z.infer<typeof EvolutionDetailSchema>;

export const SimpleEvolutionChainSchema = z.object({
  id: z.number(),
  baby_trigger_item: NamedAPIResourceSchema.nullable().optional(),
  chain: z.object({
    is_baby: z.boolean().optional(),
    species: z.object({
      name: z.string(),
      url: z.string(),
    }),
    evolution_details: z.array(EvolutionDetailSchema).nullable().optional(),
    evolves_to: z.array(
      z.object({
        is_baby: z.boolean().optional(),
        species: z.object({
          name: z.string(),
          url: z.string(),
        }),
        evolution_details: z.array(EvolutionDetailSchema).optional(),
        evolves_to: z.array(
          z.object({
            is_baby: z.boolean().optional(),
            species: z.object({
              name: z.string(),
              url: z.string(),
            }),
            evolution_details: z.array(EvolutionDetailSchema).optional(),
            evolves_to: z.array(z.any()),
          }),
        ),
      }),
    ),
  }),
});

export type SimpleEvolutionChainResponse = z.infer<
  typeof SimpleEvolutionChainSchema
>;

const PokemonSpritesSchema = z.object({
  front_default: z.string().nullable(),
  front_shiny: z.string().nullable(),
  back_default: z.string().nullable(),
  back_shiny: z.string().nullable(),
  other: z
    .object({
      "official-artwork": z
        .object({
          front_default: z.string().nullable(),
          front_shiny: z.string().nullable(),
        })
        .optional(),
      dream_world: z
        .object({
          front_default: z.string().nullable(),
        })
        .optional(),
      home: z
        .object({
          front_default: z.string().nullable(),
          front_shiny: z.string().nullable(),
        })
        .optional(),
    })
    .optional(),
});

const PokemonStatSchema = z.object({
  base_stat: z.number(),
  effort: z.number(),
  stat: NamedAPIResourceSchema,
});

const PokemonTypeSchema = z.object({
  slot: z.number(),
  type: NamedAPIResourceSchema,
});

const PokemonAbilitySchema = z.object({
  ability: NamedAPIResourceSchema,
  is_hidden: z.boolean(),
  slot: z.number(),
});

export const PokemonDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  height: z.number(),
  weight: z.number(),
  base_experience: z.number().nullable(),
  order: z.number(),
  sprites: PokemonSpritesSchema,
  stats: z.array(PokemonStatSchema),
  types: z.array(PokemonTypeSchema),
  abilities: z.array(PokemonAbilitySchema),
  species: z.object({
    name: z.string(),
    url: z.string(),
  }),
  is_default: z.boolean().optional(),
  location_area_encounters: z.string().optional(),
  forms: z.array(NamedAPIResourceSchema).optional(),
  game_indices: z.array(z.any()).optional(),
  held_items: z.array(z.any()).optional(),
  moves: z.array(z.any()).optional(),
  past_types: z.array(z.any()).optional(),
  past_abilities: z.array(z.any()).optional(),
  cries: z
    .object({
      latest: z.string().nullable(),
      legacy: z.string().nullable(),
    })
    .optional(),
});

export type PokemonDataResponse = z.infer<typeof PokemonDataSchema>;

export const PokemonSpeciesDataSchema = z.object({
  id: z.number(),
  name: z.string(),
  order: z.number().optional(),
  gender_rate: z.number().optional(),
  capture_rate: z.number().optional(),
  base_happiness: z.number().optional(),
  is_baby: z.boolean().optional(),
  is_legendary: z.boolean(),
  is_mythical: z.boolean(),
  hatch_counter: z.number().optional(),
  has_gender_differences: z.boolean().optional(),
  forms_switchable: z.boolean().optional(),
  generation: NamedAPIResourceSchema,
  evolution_chain: z.object({
    url: z.string(),
  }),
  flavor_text_entries: z.array(
    z.object({
      flavor_text: z.string(),
      language: NamedAPIResourceSchema,
      version: NamedAPIResourceSchema.optional(),
    }),
  ),
  growth_rate: NamedAPIResourceSchema.optional(),
  pokedex_numbers: z.array(z.any()).optional(),
  egg_groups: z.array(NamedAPIResourceSchema).optional(),
  color: NamedAPIResourceSchema.optional(),
  shape: NamedAPIResourceSchema.optional(),
  evolves_from_species: NamedAPIResourceSchema.nullable().optional(),
  habitat: NamedAPIResourceSchema.nullable().optional(),
  names: z.array(z.any()).optional(),
  pal_park_encounters: z.array(z.any()).optional(),
  form_descriptions: z.array(z.any()).optional(),
  genera: z.array(z.any()).optional(),
  varieties: z.array(z.any()).optional(),
});

export type PokemonSpeciesDataResponse = z.infer<
  typeof PokemonSpeciesDataSchema
>;

const FlavorTextEntrySchema = z.object({
  flavor_text: z.string(),
  language: z.object({
    name: z.string(),
    url: z.string(),
  }),
  version: z
    .object({
      name: z.string(),
      url: z.string(),
    })
    .optional(),
});

export type FlavorTextEntry = z.infer<typeof FlavorTextEntrySchema>;

export const FlavorTextEntriesSchema = z.array(FlavorTextEntrySchema);

export type FlavorTextEntries = z.infer<typeof FlavorTextEntriesSchema>;
