"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";
import { Cliente } from "../types/cliente";
import { Atendimento } from "../types/atendimento";
import AppShell from "../components/AppShell";
import { Header } from "../components/Header";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/clientes")
      .then(setClientes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppShell header={<Header title="Bem-vindo" />} showNavigation={false}>
      <div className="px-6 py-4 space-y-6">
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-medium">Clientes Recentes</h2>

            <Link href="/clientes">
              <button className="text-sm text-[var(--tropi-moss-green)]">
                Ver todos
              </button>
            </Link>
          </div>

          {loading && <p>Carregando clientes...</p>}

          {!loading && clientes.length === 0 && (
            <p>Nenhum cliente cadastrado.</p>
          )}

          {!loading && clientes.length > 0 && (
            <ul className="space-y-2">
              {clientes.map((c) => (
                <li key={c.id}>
                  {c.nome} — {c.email}
                </li>
              ))}
            </ul>
          )}
        </section>

        <hr />

        <section className="space-y-3">
          <h2 className="text-base font-medium">Últimos Atendimentos</h2>

          {loading && <p>Carregando atendimentos...</p>}

          {!loading && atendimentos.length === 0 && (
            <p>Nenhum atendimento cadastrado.</p>
          )}

          {!loading && atendimentos.length > 0 && (
            <ul className="space-y-2">
              {atendimentos.map((a) => (
                <li key={a.id}>{a.tipo_servico}</li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </AppShell>
  );
}