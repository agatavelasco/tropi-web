"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Header } from "@/app/components/Header";
import AppShell from "@/app/components/AppShell";
import { useAuth } from "@/app/contexts/AuthContext";

export default function ConfiguracoesPage() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [saindo, setSaindo] = useState(false);

  const handleSair = async () => {
    setSaindo(true);
    await signOut();
    router.replace("/login");
  };

  return (
    <AppShell header={<Header title="Configurações" showBack={false} />}>
      <div className="flex flex-col gap-6 p-6">
        {/* Info do usuário */}
        {user?.email && (
          <div className="tropi-card flex flex-col gap-2">
            <span
              className="text-sm font-medium"
              style={{ color: "var(--tropi-medium-gray)" }}
            >
              Conectado como
            </span>
            <span
              className="text-base font-semibold"
              style={{ color: "var(--tropi-dark-gray)", letterSpacing: "-0.31px" }}
            >
              {user.user_metadata?.nome_completo || user.email}
            </span>
            {user.user_metadata?.nome_completo && (
              <span
                className="text-sm"
                style={{ color: "var(--tropi-medium-gray)" }}
              >
                {user.email}
              </span>
            )}
          </div>
        )}

        {/* Botão Sair */}
        <button
          type="button"
          onClick={handleSair}
          disabled={saindo}
          className="flex items-center gap-4 bg-white rounded-[16px] px-5 py-5 w-full text-left transition active:scale-[0.98] disabled:opacity-50"
          style={{
            boxShadow: "var(--tropi-list-shadow)",
          }}
        >
          <div
            className="flex-shrink-0 flex items-center justify-center rounded-full"
            style={{
              width: 40,
              height: 40,
              backgroundColor: "var(--tropi-destructive-bg)",
            }}
          >
            <LogOut size={18} style={{ color: "var(--tropi-destructive)" }} />
          </div>
          <span
            className="text-base font-semibold"
            style={{ color: "var(--tropi-destructive)", letterSpacing: "-0.31px" }}
          >
            {saindo ? "Saindo..." : "Sair"}
          </span>
        </button>
      </div>
    </AppShell>
  );
}
