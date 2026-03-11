"use client";

import { useEffect, useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Phone,
  Mail,
  MapPin,
  Plus,
  ChevronRight,
  SquarePen,
} from "lucide-react";
import { apiGet } from "@/lib/api";
import { Cliente } from "@/app/types/cliente";
import { Atendimento } from "@/app/types/atendimento";
import { Button } from "@/app/components/Buttom";
import { Header } from "@/app/components/Header";
import AppShell from "@/app/components/AppShell";
import ListCard from "@/app/components/ListCard";
import ServicoIcon from "@/app/components/ServicoIcon";
import { formatPhone, formatDate } from "@/lib/formatters";

function buildEndereco(cliente: Cliente): string {
  const parts: string[] = [];
  if (cliente.logradouro) {
    let rua = cliente.logradouro;
    if (cliente.numero) rua += `, ${cliente.numero}`;
    parts.push(rua);
  }
  if (cliente.bairro) parts.push(cliente.bairro);
  if (cliente.localidade) {
    let cidade = cliente.localidade;
    if (cliente.uf) cidade += ` - ${cliente.uf}`;
    parts.push(cidade);
  }
  return parts.join(", ");
}

export default function ClientePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [cliente, setCliente] = useState<Cliente | null>(null);
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [clienteData, atendimentosData] = await Promise.all([
          apiGet(`/clientes/${id}`),
          apiGet("/atendimentos"),
        ]);
        setCliente(clienteData);
        setAtendimentos(atendimentosData);
      } catch (e) {
        console.error(e);
        router.push("/clientes");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  // Filtra atendimentos deste cliente
  const clienteAtendimentos = useMemo(
    () => atendimentos.filter((a) => a.cliente_id === Number(id)),
    [atendimentos, id]
  );

  if (loading || !cliente) {
    return (
      <AppShell header={<Header title="Carregando..." />}>
        <div className="flex items-center justify-center py-20">
          <p className="text-sm" style={{ color: "var(--tropi-medium-gray)" }}>
            Carregando dados do cliente...
          </p>
        </div>
      </AppShell>
    );
  }

  const endereco = buildEndereco(cliente);

  return (
    <AppShell header={<Header title={cliente.nome} />}>
      <div className="flex flex-col gap-6 p-6">
        {/* === CARD DE CONTATO === */}
        <div className="tropi-card flex flex-col gap-5" style={{ borderRadius: 24 }}>
          {/* Telefone */}
          {cliente.telefone && (
            <div className="flex items-center gap-4">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{ width: 40, height: 40, backgroundColor: "var(--tropi-navy-blue)" }}
              >
                <Phone size={18} className="text-white" />
              </div>
              <span
                className="text-base"
                style={{ color: "var(--tropi-dark-gray)", letterSpacing: "-0.31px" }}
              >
                {formatPhone(cliente.telefone)}
              </span>
            </div>
          )}

          {/* Email */}
          {cliente.email && (
            <div className="flex items-center gap-4">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{ width: 40, height: 40, backgroundColor: "var(--tropi-navy-blue)" }}
              >
                <Mail size={18} className="text-white" />
              </div>
              <span
                className="text-base"
                style={{ color: "var(--tropi-dark-gray)", letterSpacing: "-0.31px" }}
              >
                {cliente.email}
              </span>
            </div>
          )}

          {/* Endereço */}
          {endereco && (
            <div className="flex items-center gap-4">
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-full"
                style={{ width: 40, height: 40, backgroundColor: "var(--tropi-navy-blue)" }}
              >
                <MapPin size={18} className="text-white" />
              </div>
              <span
                className="text-base leading-[22px]"
                style={{ color: "var(--tropi-dark-gray)", letterSpacing: "-0.31px" }}
              >
                {endereco}
              </span>
            </div>
          )}
        </div>

        {/* === SEÇÃO DE ATENDIMENTOS === */}
        <section className="flex flex-col gap-4">
          <h2
            className="font-bold"
            style={{
              fontSize: 20,
              lineHeight: "28px",
              color: "var(--tropi-dark-gray)",
              letterSpacing: "-0.45px",
            }}
          >
            Atendimentos
          </h2>

          {/* Botão Adicionar */}
          <Button
            variant="tropi"
            size="tropi"
            onClick={() => router.push(`/atendimentos/${id}/novo`)}
          >
            <Plus size={20} className="mr-2" />
            Adicionar Atendimento
          </Button>

          {/* Lista de atendimentos */}
          {clienteAtendimentos.length === 0 && (
            <p className="text-sm py-4" style={{ color: "var(--tropi-medium-gray)" }}>
              Nenhum atendimento registrado ainda.
            </p>
          )}

          {clienteAtendimentos.length > 0 && (
            <div className="flex flex-col gap-4">
              {clienteAtendimentos.map((atendimento) => {
                return (
                  <ListCard
                    key={atendimento.id}
                    onClick={() =>
                      router.push(`/atendimentos/${atendimento.id}/editar`)
                    }
                  >
                    {/* Ícone do serviço */}
                    <ServicoIcon tipo={atendimento.tipo_servico} />

                    {/* Info */}
                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                      <span
                        className="font-semibold leading-[24px]"
                        style={{
                          fontSize: 16,
                          color: "var(--tropi-dark-gray)",
                          letterSpacing: "-0.31px",
                        }}
                      >
                        {atendimento.resumo || atendimento.tipo_servico}
                      </span>
                      <span
                        className="text-sm"
                        style={{
                          color: "var(--tropi-medium-gray)",
                          letterSpacing: "-0.15px",
                        }}
                      >
                        {atendimento.tipo_servico} •{" "}
                        {formatDate(atendimento.data_hora_inicio)}
                      </span>
                    </div>

                    {/* Seta */}
                    <ChevronRight
                      size={20}
                      className="flex-shrink-0"
                      style={{ color: "var(--tropi-medium-gray)" }}
                    />
                  </ListCard>
                );
              })}
            </div>
          )}
        </section>

        {/* === LINK EDITAR CLIENTE === */}
        <button
          onClick={() => router.push(`/clientes/${id}/editar`)}
          className="flex items-center justify-center gap-3 py-4 transition hover:opacity-70"
        >
          <SquarePen size={18} style={{ color: "var(--tropi-moss-green)" }} />
          <span
            className="font-semibold"
            style={{
              fontSize: 16,
              color: "var(--tropi-moss-green)",
              letterSpacing: "-0.31px",
            }}
          >
            Editar Cliente
          </span>
        </button>
      </div>
    </AppShell>
  );
}
