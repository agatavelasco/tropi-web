"use client";

import { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { apiGet, apiPost } from "@/lib/api";
import { Cliente } from "@/app/types/cliente";
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
}

const EMPTY_FORM: ClienteForm = {
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
};

export default function ClientesPage() {
  const [clientes, setClientes] = useState<Cliente[]>([]);
  const [form, setForm] = useState<ClienteForm>(EMPTY_FORM);
  const [loading, setLoading] = useState(false);
  const [ultimoCepConsultado, setUltimoCepConsultado] = useState("");

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      const novoCliente = await apiPost("/clientes", form);
      setClientes((lista) => [...lista, novoCliente]);
      setForm(EMPTY_FORM);
      setUltimoCepConsultado("");
    } catch (err) {
      console.error("Erro ao salvar cliente", err);
      alert("Erro ao salvar cliente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell header={<Header title="Novo Cliente"/>}>
            <form
        onSubmit={handleSubmit}
        style={{ display: "grid", gap: 8, maxWidth: 400 }}
      >
        <input
          name="nome"
          placeholder="Nome"
          value={form.nome}
          onChange={handleChange}
          required
        />

        <input
          name="cpf"
          placeholder="CPF"
          value={form.cpf}
          onChange={handleChange}
          required
        />

        <input
          name="email"
          type="email"
          placeholder="E-mail"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          name="telefone"
          placeholder="Telefone"
          value={form.telefone}
          onChange={handleChange}
        />

        <input
          name="cep"
          placeholder="CEP"
          value={form.cep}
          onChange={handleChange}
        />


        <input
          name="logradouro"
          placeholder="Logradouro"
          value={form.logradouro}
          onChange={handleChange}
        />

        <input
          name="bairro"
          placeholder="Bairro"
          value={form.bairro}
          onChange={handleChange}
        />

        <input
          name="localidade"
          placeholder="Cidade"
          value={form.localidade}
          onChange={handleChange}
        />

        <input
          name="uf"
          placeholder="UF"
          value={form.uf}
          onChange={handleChange}
        />

        <input
          name="complemento"
          placeholder="Complemento / Número"
          value={form.complemento}
          onChange={handleChange}
        />

        <Button type="submit" disabled={loading} variant={"tropi"} size={"lg"}>
          {loading ? "Salvando..." : "Salvar cliente"}
        </Button>
      </form>
    </AppShell>
  );
}