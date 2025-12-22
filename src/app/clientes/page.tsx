"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { apiGet } from "@/lib/api";
import { Cliente } from "../types/cliente";
import { Button } from "../components/Buttom";
import { Header } from "../components/Header";
import AppShell from "../components/AppShell";

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiGet("/clientes")
      .then(setClientes)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <AppShell header={<Header title="Clientes" />}>
            <Link href="/clientes/novo">
            <Button variant={"tropi"} size={"lg"}>
                Adicionar Cliente
            </Button>
        </Link>

      {loading && <p>Carregando clientes...</p>}

      {!loading && clientes.length === 0 && (
        <p>Nenhum cliente cadastrado.</p>
      )}

      {!loading && clientes.length > 0 && (
        <>
          <hr style={{ margin: "24px 0" }} />

          <h2>Clientes cadastrados</h2>
          <ul>
            {clientes.map((c) => (
              <li key={c.id}>
                <Link key={c.id} href={`/clientes/${c.id}`}>
                  {c.nome} — {c.email}
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </AppShell>
  );
}