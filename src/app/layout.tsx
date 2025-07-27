import "@/styles/globals.css";

import { type Metadata } from "next";
import { Geist } from "next/font/google";
import { TRPCReactProvider } from "@/trpc/react";
import { Header } from "@/modules/shared/components/header";

export const metadata: Metadata = {
  title: "PokéDex - Explora el mundo Pokémon",
  description:
    "Descubre información detallada sobre todos los Pokémon, sus evoluciones, estadísticas y más.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es" className={`${geist.variable}`}>
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
        <TRPCReactProvider>
          <Header />
          <main className="pb-8">{children}</main>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
