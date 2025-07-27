# Pokédex App

> **⚠️ Nota sobre tRPC**: Este proyecto utiliza tRPC como demostración de la tecnología. Sin embargo, **no hubiera recurrido al uso de tRPC para aplicaciones como esta** que consumen APIs REST externas simples. Para casos de uso que involucran únicamente el consumo de APIs de terceros, una implementación directa con `fetch` o librerías como Axios me parece más apropiada.

Una aplicación web de Pokédex construida con el T3 Stack que permite explorar información detallada de todos los Pokémon, incluyendo filtros, búsqueda y visualización de cadenas evolutivas.

## Características

- ✅ Listado completo de Pokémon ordenado por ID
- ✅ Búsqueda en tiempo real por nombre (incluye evoluciones)
- ✅ Páginas de detalle con información completa
- ✅ Visualización de cadenas evolutivas interactivas
- ✅ Navegación entre evoluciones
- ✅ Persistencia de estado de filtros y búsqueda

## Tecnologías Utilizadas

- [Next.js 14](https://nextjs.org) - Framework de React con App Router
- [TypeScript](https://www.typescriptlang.org/) - Tipado estático
- [Tailwind CSS](https://tailwindcss.com) - Framework de CSS utility-first
- [tRPC](https://trpc.io) - Type-safe APIs (usado con fines educativos)
- [Zod](https://zod.dev) - Validación de esquemas y type safety
- [PokéAPI](https://pokeapi.co) - API REST de datos de Pokémon

## Instalación y Desarrollo Local

### Prerrequisitos

- Node.js 18+ y npm/yarn/pnpm

### Pasos para ejecutar localmente

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/tlleonart/poke-api.git
   cd poke-api
   ```

2. **Instala las dependencias**

   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Ejecuta el servidor de desarrollo**

   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

4. **Abre la aplicación**

   Navega a [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye la aplicación para producción
- `npm run start` - Inicia el servidor de producción
- `npm run lint` - Ejecuta el linter de código
- `npm run type-check` - Verifica los tipos de TypeScript

## Estructura del Proyecto

```
poke-api/
├─ src/
│  ├─ app/                          # App Router de Next.js 14
│  │  ├─ api/trpc/                  # Endpoint tRPC
│  │  ├─ layout.tsx                 # Layout principal
│  │  ├─ page.tsx                   # Página principal (listado)
│  │  └─ pokemon/[name]/            # Páginas dinámicas de detalle
│  │
│  ├─ modules/                      # Módulos organizados por funcionalidad
│  │  ├─ home/                      # Módulo del listado principal
│  │  │  ├─ components/             # Componentes del listado y tabla
│  │  │  ├─ hooks/                  # Hooks personalizados para búsqueda
│  │  │  └─ types/                  # Tipos específicos del módulo
│  │  │
│  │  ├─ pokemon/                   # Módulo de detalle de Pokémon
│  │  │  └─ components/             # Componentes de información detallada
│  │  │
│  │  └─ shared/                    # Recursos compartidos
│  │     ├─ components/             # Componentes reutilizables
│  │     ├─ lib/                    # Esquemas Zod y validaciones
│  │     ├─ types/                  # Tipos compartidos
│  │     └─ utils/                  # Utilidades y constantes
│  │
│  ├─ server/                       # Configuración del servidor tRPC
│  │  └─ api/
│  │     ├─ routers/                # Routers tRPC por dominio
│  │     ├─ services/               # Servicios de datos (API calls)
│  │     └─ trpc.ts                 # Configuración base tRPC
│  │
│  ├─ trpc/                         # Cliente tRPC
│  └─ styles/                       # Estilos globales
│
├─ public/                          # Archivos estáticos
└─ configuración de herramientas    # ESLint, Prettier, TypeScript, etc.
```

### Explicación de Directorios Clave

- **`src/app/`**: Utiliza el nuevo App Router de Next.js 14 para el enrutamiento basado en sistema de archivos.

- **`src/modules/`**: Organización modular del código por funcionalidades específicas:
  - `home/`: Todo lo relacionado con el listado principal y filtros
  - `pokemon/`: Componentes para las páginas de detalle
  - `shared/`: Recursos que se comparten entre módulos

- **`src/server/`**: Contiene la configuración del servidor tRPC y los servicios que realizan las llamadas a la PokéAPI.

- **`src/trpc/`**: Configuración del cliente tRPC para el frontend, incluyendo React Query.
