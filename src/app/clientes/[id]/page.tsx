"use client";

import { useEffect, useState, ChangeEvent } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { apiGet, apiPut, apiDelete } from "@/lib/api";
import { Atendimento } from "@/app/types/atendimento";
import { Button } from "@/app/components/Buttom";
import { Header } from "@/app/components/Header";
import AppShell from "@/app/components/AppShell";

interface ClienteForm {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  numero: string;
}

export default function ClientePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);

  const [form, setForm] = useState<ClienteForm>({
    nome: "",
    cpf: "",
    email: "",
    telefone: "",
    cep: "",
    logradouro: "",
    complemento: "",
    bairro: "",
    localidade: "",
    uf: "",
    estado: "",
    numero: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const cliente = await apiGet(`/clientes/${id}`);
        setForm({
          nome: cliente.nome ?? "",
          cpf: cliente.cpf ?? "",
          email: cliente.email ?? "",
          telefone: cliente.telefone ?? "",
          cep: cliente.cep ?? "",
          logradouro: cliente.logradouro ?? "",
          complemento: cliente.complemento ?? "",
          bairro: cliente.bairro ?? "",
          localidade: cliente.localidade ?? "",
          uf: cliente.uf ?? "",
          estado: cliente.estado ?? "",
          numero: cliente.numero ?? "",
        });
      } catch (e) {
        console.error(e);
        alert("Não foi possível carregar o cliente.");
        router.push("/clientes");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  useEffect(() => {
    apiGet("/atendimentos")
      .then(setAtendimentos)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);


  if (loading) return <div style={{ padding: 24 }}>Carregando...</div>;

  return (
    <AppShell header={<Header title={form.nome} />}>
        <div style={{ padding: 24 }}>
          <form style={{ display: "grid", gap: 8, maxWidth: 420 }}>
            <input name="cpf" placeholder="CPF" value={form.cpf} disabled />
            <input name="email" placeholder="E-mail" value={form.email} disabled/>
            <input name="telefone" placeholder="Telefone" value={form.telefone} disabled/>

            <input name="cep" placeholder="CEP" value={form.cep} disabled/>
            <input name="logradouro" placeholder="Logradouro" value={form.logradouro} disabled />
            <input name="numero" placeholder="Número" value={form.numero} disabled />
            <input name="complemento" placeholder="Complemento" value={form.complemento} disabled />
            <input name="bairro" placeholder="Bairro" value={form.bairro} disabled />
            <input name="localidade" placeholder="Cidade" value={form.localidade} disabled />
            <input name="uf" placeholder="UF" value={form.uf} disabled />

            <div style={{ padding: 24 }}>
              <h1>Atendimentos</h1>
              <Link href={`/atendimentos/${id}/novo`}>
                  <Button variant={"tropi"} size={"lg"}>
                      Adicionar Atendimento
                  </Button>
              </Link>
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
            </div>

            <Link href={`/clientes/${id}/editar`}>
                <Button variant={"link"}>
                    Editar Cliente
                </Button>
            </Link>

          </form>
        </div>
    </AppShell>
  );
}
