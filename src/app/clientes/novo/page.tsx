"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { apiGet, apiPost } from "@/lib/api";
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
  numero: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  observacoes: string;
}

const EMPTY_FORM: ClienteForm = {
  nome: "",
  cpf: "",
  email: "",
  telefone: "",
  cep: "",
  logradouro: "",
  numero: "",
  complemento: "",
  bairro: "",
  localidade: "",
  uf: "",
  observacoes: "",
};

export default function NovoClientePage() {
  const router = useRouter();
  const [form, setForm] = useState<ClienteForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [ultimoCepConsultado, setUltimoCepConsultado] = useState("");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));

    if (name === "cep") {
      handleCepChange(value);
    }
  };

  const handleCepChange = async (cep: string) => {
    const cepLimpo = cep.replace(/\D/g, "");

    if (cepLimpo.length !== 8 || cepLimpo === ultimoCepConsultado) return;

    try {
      const dados = await apiGet(`/cep/${cepLimpo}`);

      setForm((f) => ({
        ...f,
        cep: dados.cep || f.cep,
        logradouro: dados.logradouro || "",
        bairro: dados.bairro || "",
        localidade: dados.localidade || "",
        uf: dados.uf || "",
      }));

      setUltimoCepConsultado(cepLimpo);
    } catch (err) {
      console.error("Erro ao buscar CEP", err);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      await apiPost("/clientes", form);
      router.push("/clientes");
    } catch (err) {
      console.error("Erro ao salvar cliente", err);
      alert("Erro ao salvar cliente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell header={<Header title="Novo Cliente" />}>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 p-6"
      >
        {/* Card 1 — Dados Pessoais */}
        <div className="tropi-card flex flex-col gap-6">
          <div className="tropi-field">
            <label className="tropi-label" htmlFor="nome">
              Nome Completo
            </label>
            <input
              id="nome"
              name="nome"
              className="tropi-input"
              placeholder="Nome do cliente"
              value={form.nome}
              onChange={handleChange}
              required
            />
          </div>

          <div className="tropi-field">
            <label className="tropi-label" htmlFor="cpf">
              CPF
            </label>
            <input
              id="cpf"
              name="cpf"
              className="tropi-input"
              placeholder="000.000.000-00"
              value={form.cpf}
              onChange={handleChange}
              required
            />
          </div>

          <div className="tropi-field">
            <label className="tropi-label" htmlFor="telefone">
              Telefone
            </label>
            <input
              id="telefone"
              name="telefone"
              className="tropi-input"
              placeholder="(11) 99999-9999"
              value={form.telefone}
              onChange={handleChange}
            />
          </div>

          <div className="tropi-field">
            <label className="tropi-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="tropi-input"
              placeholder="cliente@email.com"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        {/* Card 2 — Endereco */}
        <div className="tropi-card flex flex-col gap-6">
          <div className="tropi-field">
            <label className="tropi-label" htmlFor="cep">
              CEP
            </label>
            <input
              id="cep"
              name="cep"
              className="tropi-input"
              placeholder="00000-000"
              value={form.cep}
              onChange={handleChange}
            />
          </div>

          <div className="tropi-field">
            <label className="tropi-label" htmlFor="localidade">
              Cidade
            </label>
            <input
              id="localidade"
              name="localidade"
              className="tropi-input"
              placeholder="São Paulo"
              value={form.localidade}
              onChange={handleChange}
            />
          </div>

          <div className="tropi-field">
            <label className="tropi-label" htmlFor="uf">
              UF
            </label>
            <input
              id="uf"
              name="uf"
              className="tropi-input"
              placeholder="SP"
              value={form.uf}
              onChange={handleChange}
              maxLength={2}
            />
          </div>

          <div className="tropi-field">
            <label className="tropi-label" htmlFor="logradouro">
              Logradouro
            </label>
            <input
              id="logradouro"
              name="logradouro"
              className="tropi-input"
              placeholder="Rua, avenida..."
              value={form.logradouro}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-3">
            <div className="tropi-field w-1/3">
              <label className="tropi-label" htmlFor="numero">
                Numero
              </label>
              <input
                id="numero"
                name="numero"
                className="tropi-input"
                placeholder="123"
                value={form.numero}
                onChange={handleChange}
              />
            </div>

            <div className="tropi-field flex-1">
              <label className="tropi-label" htmlFor="bairro">
                Bairro
              </label>
              <input
                id="bairro"
                name="bairro"
                className="tropi-input"
                placeholder="Bairro"
                value={form.bairro}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="tropi-field">
            <label className="tropi-label" htmlFor="complemento">
              Complemento
            </label>
            <input
              id="complemento"
              name="complemento"
              className="tropi-input"
              placeholder="Apto, bloco..."
              value={form.complemento}
              onChange={handleChange}
            />
          </div>

          <div className="tropi-field">
            <label className="tropi-label" htmlFor="observacoes">
              Observações
            </label>
            <textarea
              id="observacoes"
              name="observacoes"
              className="tropi-textarea"
              placeholder="Informações adicionais..."
              value={form.observacoes}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Botao Salvar */}
        <Button
          type="submit"
          variant="tropi"
          size="tropi"
          disabled={loading}
        >
          {loading ? "Salvando..." : "Salvar Cliente"}
        </Button>
      </form>
    </AppShell>
  );
}
