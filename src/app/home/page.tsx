"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ChevronRight } from "lucide-react";
import { apiGet } from "@/lib/api";
import { Cliente } from "../types/cliente";
import { Atendimento } from "../types/atendimento";
import AppShell from "../components/AppShell";
import ListCard from "../components/ListCard";
import ClienteAvatar from "../components/ClienteAvatar";
import ServicoIcon from "../components/ServicoIcon";
import { formatPhone, formatDate } from "@/lib/formatters";
import { useAuth } from "../contexts/AuthContext";

function HomeHeader({ primeiroNome }: { primeiroNome: string }) {
  return (
    <header
      className="relative w-full overflow-hidden"
      style={{
        height: 104,
        background: "linear-gradient(165deg, #0D332B 0%, #1A4D42 100%)",
      }}
    >
      {/* Círculos decorativos */}
      <div
        className="absolute bg-white rounded-full"
        style={{
          width: 96,
          height: 96,
          top: -32,
          right: 40,
          opacity: 0.05,
        }}
      />
      <div
        className="absolute bg-white rounded-full"
        style={{
          width: 64,
          height: 64,
          top: 56,
          left: -16,
          opacity: 0.05,
        }}
      />

      {/* Conteúdo */}
      <div className="flex items-center justify-between px-6 pt-5 h-full">
        <div className="flex flex-col gap-2">
          <h1
            className="font-bold text-white"
            style={{
              fontSize: 30,
              lineHeight: "36px",
              letterSpacing: "0.4px",
            }}
          >
            Olá, {primeiroNome}
          </h1>
          <div className="flex items-center gap-2">
            <Sparkles size={20} className="text-white" />
            <span
              className="font-medium text-white"
              style={{
                fontSize: 14,
                lineHeight: "20px",
                letterSpacing: "-0.15px",
              }}
            >
              Bom trabalho hoje!
            </span>
          </div>
        </div>

        <span
          className="text-white font-bold italic"
          style={{
            fontSize: 28,
            opacity: 0.9,
            letterSpacing: "-0.5px",
          }}
        >
          tropi
        </span>
      </div>
    </header>
  );
}

export default function HomePage() {
  const router = useRouter();
  const { user } = useAuth();
  const primeiroNome = (user?.user_metadata?.full_name ?? user?.email ?? "")
    .split(" ")[0];
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [atendimentos, setAtendimentos] = useState<Atendimento[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([apiGet("/clientes"), apiGet("/atendimentos")])
      .then(([clientesData, atendimentosData]) => {
        setClientes(clientesData);
        setAtendimentos(atendimentosData);
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  // Mapa de cliente_id → nome para exibir nos cards de atendimento
  const clienteMap = useMemo(() => {
    const map: Record<number, string> = {};
    clientes.forEach((c) => {
      map[c.id] = c.nome;
    });
    return map;
  }, [clientes]);

  const recentClientes = clientes.slice(0, 3);
  const recentAtendimentos = atendimentos.slice(0, 3);

  return (
    <AppShell header={<HomeHeader primeiroNome={primeiroNome} />} showNavigation={true}>
      <div className="flex flex-col gap-8 pt-6 px-6">
        {/* === CLIENTES RECENTES === */}
        <section className="flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h2
              className="font-bold"
              style={{
                fontSize: 20,
                lineHeight: "28px",
                color: "var(--tropi-dark-gray)",
                letterSpacing: "-0.45px",
              }}
            >
              Clientes Recentes
            </h2>
            <button
              onClick={() => router.push("/clientes")}
              className="flex items-center justify-center rounded-full px-4 font-semibold"
              style={{
                height: 36,
                fontSize: 14,
                lineHeight: "20px",
                color: "var(--tropi-warm-green)",
                letterSpacing: "-0.15px",
                background: "rgba(140, 154, 63, 0.1)",
              }}
            >
              Ver todos
            </button>
          </div>

          {loading && (
            <p className="text-sm" style={{ color: "var(--tropi-medium-gray)" }}>
              Carregando...
            </p>
          )}

          {!loading && recentClientes.length === 0 && (
            <p className="text-sm" style={{ color: "var(--tropi-medium-gray)" }}>
              Nenhum cliente cadastrado ainda.
            </p>
          )}

          {!loading && recentClientes.length > 0 && (
            <div className="flex flex-col gap-4">
              {recentClientes.map((cliente) => (
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
        </section>

        {/* === ÚLTIMOS ATENDIMENTOS === */}
        <section className="flex flex-col gap-5">
          <h2
            className="font-bold"
            style={{
              fontSize: 20,
              lineHeight: "28px",
              color: "var(--tropi-dark-gray)",
              letterSpacing: "-0.45px",
            }}
          >
            Últimos Atendimentos
          </h2>

          {loading && (
            <p className="text-sm" style={{ color: "var(--tropi-medium-gray)" }}>
              Carregando...
            </p>
          )}

          {!loading && recentAtendimentos.length === 0 && (
            <p className="text-sm" style={{ color: "var(--tropi-medium-gray)" }}>
              Nenhum atendimento registrado ainda.
            </p>
          )}

          {!loading && recentAtendimentos.length > 0 && (
            <div className="flex flex-col gap-4">
              {recentAtendimentos.map((atendimento) => {
                const clienteNome =
                  clienteMap[atendimento.cliente_id] || "Cliente";

                return (
                  <ListCard
                    key={atendimento.id}
                    onClick={() =>
                      router.push(
                        `/atendimentos/${atendimento.id}/editar`
                      )
                    }
                  >
                    {/* Ícone do serviço */}
                    <ServicoIcon tipo={atendimento.tipo_servico} />

                    {/* Info */}
                    <div className="flex-1 flex flex-col gap-1 min-w-0">
                      <span
                        className="font-semibold leading-[27px]"
                        style={{
                          fontSize: 18,
                          color: "var(--tropi-dark-gray)",
                          letterSpacing: "-0.44px",
                        }}
                      >
                        {atendimento.tipo_servico}
                      </span>
                      <span
                        className="text-sm"
                        style={{
                          color: "var(--tropi-medium-gray)",
                          letterSpacing: "-0.15px",
                        }}
                      >
                        {clienteNome} •{" "}
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
      </div>
    </AppShell>
  );
}
