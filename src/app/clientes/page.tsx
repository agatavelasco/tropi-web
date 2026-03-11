"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Plus } from "lucide-react";
import { apiGet } from "@/lib/api";
import { Cliente } from "../types/cliente";
import { Button } from "../components/Buttom";
import { Header } from "../components/Header";
import AppShell from "../components/AppShell";
import ListCard from "../components/ListCard";
import ClienteAvatar from "../components/ClienteAvatar";
import { formatPhone } from "@/lib/formatters";

export default function ClientesPage() {
  const router = useRouter();
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);
  const [busca, setBusca] = useState("");

  useEffect(() => {
    apiGet("/clientes")
      .then(setClientes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const filtered = useMemo(() => {
    if (!busca.trim()) return clientes;
    const term = busca.toLowerCase();
    return clientes.filter(
      (c) =>
        c.nome.toLowerCase().includes(term) ||
        (c.localidade && c.localidade.toLowerCase().includes(term))
    );
  }, [clientes, busca]);

  return (
    <AppShell header={<Header title="Clientes" showBack={false} />}>
      <div className="flex flex-col gap-4 p-6">
        {/* Barra de busca */}
        <div className="relative">
          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--tropi-medium-gray)]"
          />
          <input
            type="text"
            placeholder="Buscar por nome, cidade..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="w-full h-14 bg-white rounded-[16px] pl-12 pr-4 text-sm text-[#0a0a0a] placeholder:text-[var(--tropi-medium-gray)] outline-none"
            style={{
              boxShadow: "0px 2px 12px rgba(45, 42, 38, 0.06)",
            }}
          />
        </div>

        {/* Botão Adicionar */}
        <Button
          variant="tropi"
          size="tropi"
          onClick={() => router.push("/clientes/novo")}
        >
          <Plus size={20} className="mr-2" />
          Adicionar Cliente
        </Button>

        {/* Loading */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-[var(--tropi-medium-gray)]">Carregando clientes...</p>
          </div>
        )}

        {/* Estado vazio */}
        {!loading && clientes.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <p className="text-sm text-[var(--tropi-medium-gray)]">
              Nenhum cliente cadastrado ainda.
            </p>
            <p className="text-xs text-[var(--tropi-medium-gray)]">
              Toque em &quot;Adicionar Cliente&quot; para começar.
            </p>
          </div>
        )}

        {/* Sem resultados na busca */}
        {!loading && clientes.length > 0 && filtered.length === 0 && (
          <div className="flex items-center justify-center py-12">
            <p className="text-sm text-[var(--tropi-medium-gray)]">
              Nenhum resultado para &quot;{busca}&quot;
            </p>
          </div>
        )}

        {/* Lista de clientes */}
        {!loading && filtered.length > 0 && (
          <div className="flex flex-col gap-4">
            {filtered.map((cliente) => (
              <ListCard
                key={cliente.id}
                onClick={() => router.push(`/clientes/${cliente.id}`)}
              >
                {/* Avatar */}
                <ClienteAvatar nome={cliente.nome} />

                {/* Info */}
                <div className="flex flex-col gap-1 min-w-0">
                  <span
                    className="text-lg font-bold truncate"
                    style={{
                      color: "var(--tropi-dark-gray)",
                      letterSpacing: "-0.44px",
                    }}
                  >
                    {cliente.nome}
                  </span>

                  {cliente.localidade && (
                    <span
                      className="text-sm truncate"
                      style={{
                        color: "var(--tropi-medium-gray)",
                        letterSpacing: "-0.15px",
                      }}
                    >
                      {cliente.localidade}
                      {cliente.uf ? `, ${cliente.uf}` : ""}
                    </span>
                  )}

                  {cliente.telefone && (
                    <span className="text-xs" style={{ color: "var(--tropi-warm-green)" }}>
                      {formatPhone(cliente.telefone)}
                    </span>
                  )}
                </div>
              </ListCard>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}