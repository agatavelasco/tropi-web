"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { useParams } from "next/navigation";
import { apiGet, apiPost } from "@/lib/api";
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

const EMPTY_FORM: AtendimentoForm = {
  tipo: "",
  duracao: "",
  resumo: "",
  observacoes: "",
  intervencoes: "",
  recomendacoes: "",
};

export default function AtendimentosPage() {
  const [atendimento, setAtendimento] = useState<Atendimento[]>([]);
  const [form, setForm] = useState<AtendimentoForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const clienteId = Number(params.id);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const payload = {
    cliente_id: clienteId, // <- precisa vir da tela/rota do cliente
    data_hora_inicio: new Date().toISOString(),
    data_hora_fim: new Date(Date.now() + 60 * 60 * 1000).toISOString(), // +1h
    tipo_servico: form.tipo,
    duracao: form.duracao,
    resumo: form.resumo,
    observacoes: form.observacoes,
    intervencoes: form.intervencoes,
    recomendacoes: form.recomendacoes,
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      const novoAtendimento = await apiPost("/atendimentos", payload);
      setAtendimento((lista) => [...lista, novoAtendimento]);
      setForm(EMPTY_FORM);
    } catch (err) {
      console.error("Erro ao salvar atendimento", err);
      alert("Erro ao salvar atendimento.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell header={<Header title="Novo Atendimento" />}>
      <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 8, maxWidth: 400 }}
      >
        <input
          name="tipo"
          placeholder="Tipo do atendimento"
          value={form.tipo}
          onChange={handleChange}
          required
        />

        <input
          name="duracao"
          placeholder="Duração"
          value={form.duracao}
          onChange={handleChange}
          required
        />

        <input
          name="resumo"
          placeholder="Resumo do Trabalho realizado"
          value={form.resumo}
          onChange={handleChange}
          required
        />

        <input
          name="observacoes"
          placeholder="Observacoes Iniciais"
          value={form.observacoes}
          onChange={handleChange}
        />

        <input
          name="intervencoes"
          placeholder="Intervencoes Realizadas"
          value={form.intervencoes}
          onChange={handleChange}
        />

        <input
          name="recomendacoes"
          placeholder="Recomendações"
          value={form.recomendacoes}
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading} variant={"tropi"} size={"lg"}>
          {loading ? "Salvando..." : "Salvar atendimento"}
        </Button>
      </form>
    </AppShell>
  );
}