"use client";

import { useMemo } from "react";
import { usePathname, useRouter } from "next/navigation";
import { BottomNavigation } from "@/app/components/BottomNavigation";

function getScreenFromPath(pathname: string): string {
  if (pathname.startsWith("/home")) return "home";
  if (pathname.startsWith("/clientes")) return "client-list";
  if (pathname.startsWith("/agenda")) return "calendar";
  if (pathname.startsWith("/config")) return "settings";
  return "home";
}

type AppShellProps = {
  children: React.ReactNode;
  header?: React.ReactNode;
  showNavigation?: boolean;
};

export default function AppShell({
  children,
  header,
  showNavigation = true, // ✅ padrão
}: AppShellProps) {
  const pathname = usePathname();
  const router = useRouter();

  const currentScreen = useMemo(() => getScreenFromPath(pathname), [pathname]);

  const onNavigate = (screen: string) => {
    switch (screen) {
      case "home":
        router.push("/home");
        break;
      case "client-list":
        router.push("/clientes");
        break;
      case "calendar":
        router.push("/agenda");
        break;
      case "settings":
        router.push("/configuracoes");
        break;
      default:
        router.push("/home");
    }
  };

  return (
    <div className="min-h-screen bg-[var(--tropi-cream)]">
      {/* ✅ HEADER FULL WIDTH */}
      {header ? <div className="w-full">{header}</div> : null}

      {/* ✅ CONTEÚDO CENTRAL */}
      <div className="flex justify-center">
        <div className="w-full max-w-[384px] min-h-screen bg-background relative">
          {/* ✅ Só aplica padding quando a navegação existe */}
          <main className={showNavigation ? "pb-28" : ""}>{children}</main>

          {/* ✅ Sintaxe correta */}
          {showNavigation && (
            <BottomNavigation
              currentScreen={currentScreen}
              onNavigate={onNavigate}
            />
          )}
        </div>
      </div>
    </div>
  );
}