"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";
import { Atendimento } from "../types/atendimento";
import AppShell from "../components/AppShell";
import { Header } from "../components/Header";

export default function AtendimentosPage() {
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/atendimentos")
      .then(setAtendimentos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppShell header={<Header title="Atendimentos" />}>
      {loading && <p>Carregando atendimentos...</p>}

      {!loading && atendimentos.length === 0 && (
        <p>Nenhum atendimento cadastrado.</p>
      )}

      {!loading && atendimentos.length > 0 && (
        <>
          <hr style={{ margin: "24px 0" }} />

          <h2>Atendimentos cadastrados</h2>
          <ul>
            {atendimentos.map((a) => (
              <li key={a.id}>
                {a.tipo_servico}
              </li>
            ))}
          </ul>
        </>
      )}
    </AppShell>
  );
}