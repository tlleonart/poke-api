# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Drizzle](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

```
poke-api
├─ eslint.config.js
├─ next.config.js
├─ package-lock.json
├─ package.json
├─ postcss.config.js
├─ prettier.config.js
├─ public
│  └─ favicon.ico
├─ README.md
├─ src
│  ├─ app
│  │  ├─ api
│  │  │  └─ trpc
│  │  │     └─ [trpc]
│  │  │        └─ route.ts
│  │  ├─ layout.tsx
│  │  ├─ page.tsx
│  │  └─ pokemon
│  │     └─ [name]
│  │        └─ page.tsx
│  ├─ env.js
│  ├─ modules
│  │  ├─ home
│  │  │  ├─ components
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ pokemon-table
│  │  │  │  │  ├─ index.ts
│  │  │  │  │  ├─ pokemon-table-grid.tsx
│  │  │  │  │  ├─ pokemon-table-image.tsx
│  │  │  │  │  ├─ pokemon-table-pagination.tsx
│  │  │  │  │  ├─ pokemon-table-row.tsx
│  │  │  │  │  └─ pokemon-table.tsx
│  │  │  │  └─ searchbar.tsx
│  │  │  ├─ hooks
│  │  │  │  └─ use-search-and-pagination.tsx
│  │  │  └─ types
│  │  │     └─ pokemon-table.types.ts
│  │  ├─ pokemon
│  │  │  └─ components
│  │  │     ├─ index.ts
│  │  │     ├─ pokemon-detail.tsx
│  │  │     ├─ pokemon-evolution-chain.tsx
│  │  │     ├─ pokemon-header.tsx
│  │  │     ├─ pokemon-info.tsx
│  │  │     ├─ pokemon-stats-display.tsx
│  │  │     └─ pokemon-type-badges.tsx
│  │  └─ shared
│  │     ├─ components
│  │     │  ├─ evolution-badge.tsx
│  │     │  ├─ header-logo.tsx
│  │     │  ├─ header.tsx
│  │     │  └─ index.ts
│  │     ├─ lib
│  │     │  └─ schemas.ts
│  │     ├─ types
│  │     │  ├─ api-types.ts
│  │     │  └─ pokemon-types.ts
│  │     └─ utils
│  │        └─ api-endpoints.ts
│  ├─ server
│  │  └─ api
│  │     ├─ root.ts
│  │     ├─ routers
│  │     │  └─ pokemon.ts
│  │     ├─ services
│  │     │  ├─ getAllPokemons.ts
│  │     │  └─ getPokemonByName.ts
│  │     └─ trpc.ts
│  ├─ styles
│  │  └─ globals.css
│  └─ trpc
│     ├─ query-client.ts
│     ├─ react.tsx
│     └─ server.ts
└─ tsconfig.json

```
