"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGet, apiPut, apiDelete } from "@/lib/api";
import { Atendimento } from "@/app/types/atendimento";
import { Header } from "@/app/components/Header";
import { Button } from "@/app/components/Buttom";
import AppShell from "@/app/components/AppShell";

interface AtendimentoForm {
  tipo: string;
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
  const [excluindo, setExcluindo] = useState(false);

  const [form, setForm] = useState<AtendimentoForm>({
     tipo: "",
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
        setForm({
          tipo: atendimento.tipo ?? "",
          duracao: atendimento.duracacao ?? "",
          resumo: atendimento.resumo ?? "",
          observacoes: atendimento.observacoes ?? "",
          intervencoes: atendimento.intervencoes ?? "",
          recomendacoes: atendimento.recomendacoes ?? "",
        });
      } catch (e) {
        console.error(e);
        alert("Não foi possível carregar o atendimento.");
        router.push("/atendimentos");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

  };

  const onSalvar = async () => {
    setSalvando(true);
    try {
      await apiPut(`/atendimentos/${id}`, form);
      alert("Alterações salvas!");
      router.push("/atendimentos");
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  };

  const onExcluir = async () => {
    const ok = confirm("Tem certeza que deseja excluir este atendimento?");
    if (!ok) return;

    setExcluindo(true);
    try {
      await apiDelete(`/atendimentos/${id}`);
      alert("Atendimento excluído!");
      router.push("/atendimento");
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir atendimento.");
    } finally {
      setExcluindo(false);
    }
  };

  if (loading) return <div style={{ padding: 24 }}>Carregando...</div>;

  return (
    <AppShell header={<Header title="Editar Atendimento" />}>
      <form style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <input name="tipo" placeholder="Tipo do Atendimento" value={form.tipo} onChange={handleChange} />
        <input name="duracao" placeholder="Duração" value={form.duracao} onChange={handleChange} />
        <input name="resumo" placeholder="Resumo do Trabalho Realizado" value={form.resumo} onChange={handleChange} />
        <input name="observacoes" placeholder="Observações Iniciais" value={form.observacoes} onChange={handleChange} />

        <input name="intervencoes" placeholder="Intervenções Realizadas" value={form.intervencoes} onChange={handleChange} />
        <input name="recomendacoes" placeholder="Recomendacoes" value={form.recomendacoes} onChange={handleChange} />

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Button variant={"tropi"} size={"lg"} onClick={onSalvar} disabled={salvando}>
            {salvando ? "Salvando..." : "Salvar Alterações"}
          </Button>

          <Button
            variant={"ghost"}
            size={"lg"}
            onClick={onExcluir}
            disabled={excluindo}
            style={{ background: "#ffdddd" }}
          >
            {excluindo ? "Excluindo..." : "Excluir Atendimento"}
          </Button>
        </div>
      </form>
    </AppShell>
  );
}