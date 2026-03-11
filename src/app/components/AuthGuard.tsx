"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/contexts/AuthContext";

const PUBLIC_PATHS = ["/login", "/cadastro"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const isPublic = PUBLIC_PATHS.includes(pathname);

  useEffect(() => {
    if (!loading && !user && !isPublic) {
      router.replace("/login");
    }
  }, [user, loading, isPublic, router]);

  if (isPublic) {
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "var(--tropi-cream)" }}
      >
        <p className="text-sm" style={{ color: "#8b8680" }}>
          Carregando...
        </p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
}
