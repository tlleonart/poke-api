import Link from "next/link";
import { HeaderLogo } from "./header-logo";

export function Header() {
  return (
    <header className="z-50 w-full border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-3 sm:px-4 lg:px-6">
        <div className="flex h-14 items-center justify-between sm:h-16">
          <Link href="/">
            <HeaderLogo />
          </Link>
          <Link href="/">
            <h3 className="font-semibold text-black/40 hover:text-black hover:underline">
              Inicio
            </h3>
          </Link>
        </div>
      </div>
    </header>
  );
}
