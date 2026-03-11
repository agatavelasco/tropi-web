"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Calendar, Clock } from "lucide-react";
import { apiGet, apiPut, apiDelete } from "@/lib/api";
import { toast } from "@/lib/toast";
import { Header } from "@/app/components/Header";
import { Button } from "@/app/components/Buttom";
import AppShell from "@/app/components/AppShell";
import ConfirmDeleteModal from "@/app/components/ConfirmDeleteModal";

type TipoServico = "Manutenção" | "Consultoria";

interface AtendimentoForm {
  tipo_servico: TipoServico;
  data: string;
  duracao: string;
  resumo: string;
  observacoes: string;
  intervencoes: string;
  recomendacoes: string;
}

export default function EditarAtendimentoPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [confirmExcluir, setConfirmExcluir] = useState(false);
  const [excluindo, setExcluindo] = useState(false);
  const [clienteId, setClienteId] = useState<number | null>(null);

  const [form, setForm] = useState<AtendimentoForm>({
    tipo_servico: "Manutenção",
    data: "",
    duracao: "",
    resumo: "",
    observacoes: "",
    intervencoes: "",
    recomendacoes: "",
  });

  useEffect(() => {
    async function load() {
      try {
        const atendimento = await apiGet(`/atendimentos/${id}`);
        setClienteId(atendimento.cliente_id);

        const dataInicio = atendimento.data_hora_inicio
          ? atendimento.data_hora_inicio.split("T")[0]
          : "";

        setForm({
          tipo_servico: atendimento.tipo_servico ?? "Manutenção",
          data: dataInicio,
          duracao: atendimento.duracao ?? "",
          resumo: atendimento.resumo ?? "",
          observacoes: atendimento.observacoes ?? "",
          intervencoes: atendimento.intervencoes ?? "",
          recomendacoes: atendimento.recomendacoes ?? "",
        });
      } catch (e) {
        console.error(e);
        toast.error("Não foi possível carregar o atendimento.");
        router.push("/atendimentos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  const update = (field: keyof AtendimentoForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSalvar = async () => {
    setSalvando(true);
    try {
      const dataInicio = form.data
        ? new Date(`${form.data}T08:00:00`).toISOString()
        : new Date().toISOString();

      const [horas, minutos] = (form.duracao || "01:00").split(":").map(Number);
      const inicio = new Date(dataInicio);
      const fim = new Date(inicio.getTime() + (horas * 60 + minutos) * 60 * 1000);

      const payload = {
        tipo_servico: form.tipo_servico,
        data_hora_inicio: dataInicio,
        data_hora_fim: fim.toISOString(),
        duracao: form.duracao || "01:00",
        resumo: form.resumo,
        observacoes: form.observacoes,
        intervencoes: form.intervencoes,
        recomendacoes: form.recomendacoes,
      };

      await apiPut(`/atendimentos/${id}`, payload);
      if (clienteId) {
        router.push(`/clientes/${clienteId}`);
      } else {
        router.push("/atendimentos");
      }
    } catch (e) {
      console.error(e);
      toast.error("Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  };

  const onExcluir = async () => {
    setExcluindo(true);
    try {
      await apiDelete(`/atendimentos/${id}`);
      if (clienteId) {
        router.push(`/clientes/${clienteId}`);
      } else {
        router.push("/atendimentos");
      }
    } catch (e) {
      console.error(e);
      toast.error("Erro ao excluir atendimento.");
    } finally {
      setExcluindo(false);
    }
  };

  if (loading) {
    return (
      <AppShell header={<Header title="Editar Atendimento" />}>
        <div className="p-6 text-sm text-[var(--tropi-medium-gray)]">
          Carregando...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell header={<Header title="Editar Atendimento" />}>
      <div className="flex flex-col gap-6 p-6">
        {/* Tipo de Atendimento */}
        <div className="tropi-card flex flex-col gap-6" style={{ borderRadius: 24 }}>
          <h2
            className="font-bold"
            style={{
              fontSize: 20,
              lineHeight: "28px",
              color: "#2d2a26",
              letterSpacing: "-0.45px",
            }}
          >
            Tipo de Atendimento
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => update("tipo_servico", "Manutenção")}
              className="flex flex-col items-center justify-center gap-2 rounded-[16px] border-2 pt-[18px] pb-[18px] px-[18px] transition"
              style={{
                borderColor:
                  form.tipo_servico === "Manutenção" ? "#8c9a3f" : "#e5e7eb",
                backgroundColor:
                  form.tipo_servico === "Manutenção"
                    ? "rgba(140, 154, 63, 0.1)"
                    : "transparent",
              }}
            >
              <span
                className="font-bold"
                style={{
                  fontSize: 16,
                  color: "#3d5919",
                  letterSpacing: "-0.31px",
                }}
              >
                Manutenção
              </span>
              <span
                className="font-normal"
                style={{ fontSize: 14, color: "#6a7282", letterSpacing: "-0.15px" }}
              >
                Presencial
              </span>
            </button>

            <button
              type="button"
              onClick={() => update("tipo_servico", "Consultoria")}
              className="flex flex-col items-center justify-center gap-2 rounded-[16px] border-2 pt-[18px] pb-[18px] px-[18px] transition"
              style={{
                borderColor:
                  form.tipo_servico === "Consultoria" ? "#8c9a3f" : "#e5e7eb",
                backgroundColor:
                  form.tipo_servico === "Consultoria"
                    ? "rgba(140, 154, 63, 0.1)"
                    : "transparent",
              }}
            >
              <span
                className="font-bold"
                style={{
                  fontSize: 16,
                  color: "#3d5919",
                  letterSpacing: "-0.31px",
                }}
              >
                Consultoria
              </span>
              <span
                className="font-normal"
                style={{ fontSize: 14, color: "#6a7282", letterSpacing: "-0.15px" }}
              >
                Online
              </span>
            </button>
          </div>
        </div>

        {/* Data do Atendimento */}
        <div className="tropi-card flex flex-col gap-6" style={{ borderRadius: 24 }}>
          <h2
            className="font-bold"
            style={{
              fontSize: 20,
              lineHeight: "28px",
              color: "#2d2a26",
              letterSpacing: "-0.45px",
            }}
          >
            Data do Atendimento
          </h2>

          <div className="relative">
            <input
              type="date"
              value={form.data}
              onChange={(e) => update("data", e.target.value)}
              className="w-full h-14 rounded-[16px] pl-4 pr-12 text-base outline-none"
              style={{
                background: "#f3f3f5",
                border: "1px solid #e5e7eb",
                color: form.data ? "#0a0a0a" : "#717182",
                letterSpacing: "-0.31px",
              }}
            />
            <Calendar
              size={24}
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#8b8680" }}
            />
          </div>
        </div>

        {/* Duração */}
        <div className="tropi-card flex flex-col gap-6" style={{ borderRadius: 24 }}>
          <h2
            className="font-bold"
            style={{
              fontSize: 20,
              lineHeight: "28px",
              color: "#2d2a26",
              letterSpacing: "-0.45px",
            }}
          >
            Duração
          </h2>

          <div className="relative">
            <input
              type="time"
              value={form.duracao}
              onChange={(e) => update("duracao", e.target.value)}
              placeholder="00:00"
              className="w-full h-14 rounded-[16px] pl-4 pr-12 text-base outline-none"
              style={{
                background: "#f3f3f5",
                border: "1px solid #e5e7eb",
                color: form.duracao ? "#0a0a0a" : "#717182",
                letterSpacing: "-0.31px",
              }}
            />
            <Clock
              size={24}
              className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
              style={{ color: "#8b8680" }}
            />
          </div>
        </div>

        {/* Resumo */}
        <div className="tropi-card flex flex-col gap-6" style={{ borderRadius: 24 }}>
          <h2
            className="font-bold"
            style={{
              fontSize: 20,
              lineHeight: "28px",
              color: "#2d2a26",
              letterSpacing: "-0.45px",
            }}
          >
            Resumo
          </h2>

          <textarea
            value={form.resumo}
            onChange={(e) => update("resumo", e.target.value)}
            placeholder="Ex: Adubo orgânico, substrato, mudas..."
            className="tropi-textarea"
            style={{
              minHeight: 100,
              borderRadius: 16,
              border: "1px solid #e5e7eb",
            }}
          />
        </div>

        {/* Observações */}
        <div className="tropi-card flex flex-col gap-6" style={{ borderRadius: 24 }}>
          <h2
            className="font-bold"
            style={{
              fontSize: 20,
              lineHeight: "28px",
              color: "#2d2a26",
              letterSpacing: "-0.45px",
            }}
          >
            Observações
          </h2>

          <textarea
            value={form.observacoes}
            onChange={(e) => update("observacoes", e.target.value)}
            placeholder="Ex: Adubo orgânico, substrato, mudas..."
            className="tropi-textarea"
            style={{
              minHeight: 100,
              borderRadius: 16,
              border: "1px solid #e5e7eb",
            }}
          />
        </div>

        {/* Intervenções */}
        <div className="tropi-card flex flex-col gap-6" style={{ borderRadius: 24 }}>
          <h2
            className="font-bold"
            style={{
              fontSize: 20,
              lineHeight: "28px",
              color: "#2d2a26",
              letterSpacing: "-0.45px",
            }}
          >
            Intervenções
          </h2>

          <textarea
            value={form.intervencoes}
            onChange={(e) => update("intervencoes", e.target.value)}
            placeholder="Informações adicionais sobre o atendimento..."
            className="tropi-textarea"
            style={{
              minHeight: 120,
              borderRadius: 16,
              border: "1px solid #e5e7eb",
            }}
          />
        </div>

        {/* Recomendações */}
        <div className="tropi-card flex flex-col gap-6" style={{ borderRadius: 24 }}>
          <h2
            className="font-bold"
            style={{
              fontSize: 20,
              lineHeight: "28px",
              color: "#2d2a26",
              letterSpacing: "-0.45px",
            }}
          >
            Recomendações
          </h2>

          <textarea
            value={form.recomendacoes}
            onChange={(e) => update("recomendacoes", e.target.value)}
            placeholder="Informações adicionais sobre o atendimento..."
            className="tropi-textarea"
            style={{
              minHeight: 120,
              borderRadius: 16,
              border: "1px solid #e5e7eb",
            }}
          />
        </div>

        {/* TODO: Fotos do Atendimento - implementar upload de imagens */}
        {/* <div className="tropi-card flex flex-col gap-6" style={{ borderRadius: 24 }}>
          <h2
            className="font-bold"
            style={{
              fontSize: 20,
              lineHeight: "28px",
              color: "#2d2a26",
              letterSpacing: "-0.45px",
            }}
          >
            Fotos do Atendimento
          </h2>

          <button
            type="button"
            className="flex flex-col items-center justify-center gap-3 rounded-[16px] border-2 transition hover:bg-[rgba(140,154,63,0.05)]"
            style={{
              height: 160,
              borderColor: "#8c9a3f",
            }}
          >
            <Camera size={16} style={{ color: "#8c9a3f" }} />
            <span
              className="font-medium"
              style={{
                fontSize: 16,
                color: "#8c9a3f",
                letterSpacing: "-0.31px",
              }}
            >
              Adicionar Fotos
            </span>
          </button>
        </div> */}

        {/* Botões */}
        <div className="flex flex-col gap-3">
          <Button
            type="button"
            variant="tropi"
            size="tropi"
            onClick={onSalvar}
            disabled={salvando}
          >
            {salvando ? "Salvando..." : "Salvar Alterações"}
          </Button>

          <button
            type="button"
            onClick={() => setConfirmExcluir(true)}
            className="w-full h-12 rounded-[16px] text-sm font-medium text-[var(--destructive)] hover:bg-red-50 transition"
          >
            Excluir atendimento
          </button>
        </div>
      </div>

      <ConfirmDeleteModal
        open={confirmExcluir}
        title="Tem certeza que deseja excluir o atendimento?"
        confirmLabel="Excluir atendimento"
        loading={excluindo}
        onConfirm={onExcluir}
        onCancel={() => setConfirmExcluir(false)}
      />
    </AppShell>
  );
}
