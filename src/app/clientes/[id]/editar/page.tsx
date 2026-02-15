"use client";

import { useEffect, useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiGet, apiPut, apiDelete } from "@/lib/api";
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
  estado: string;
  observacoes: string;
}

export default function EditarClientePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [confirmExcluir, setConfirmExcluir] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

  const [form, setForm] = useState<ClienteForm>({
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
    estado: "",
    observacoes: "",
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
          numero: cliente.numero ?? "",
          complemento: cliente.complemento ?? "",
          bairro: cliente.bairro ?? "",
          localidade: cliente.localidade ?? "",
          uf: cliente.uf ?? "",
          estado: cliente.estado ?? "",
          observacoes: cliente.observacoes ?? "",
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
    if (cepLimpo.length !== 8) return;

    try {
      const dados = await apiGet(`/cep/${cepLimpo}`);
      setForm((f) => ({
        ...f,
        cep: dados.cep || f.cep,
        logradouro: dados.logradouro || "",
        bairro: dados.bairro || "",
        localidade: dados.localidade || "",
        uf: dados.uf || "",
        estado: dados.estado || "",
      }));
    } catch (err) {
      console.error("Erro ao buscar CEP", err);
    }
  };

  const onSalvar = async () => {
    setSalvando(true);
    try {
      await apiPut(`/clientes/${id}`, form);
      router.push(`/clientes/${id}`);
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  };

  const onExcluir = async () => {
    setExcluindo(true);
    try {
      await apiDelete(`/clientes/${id}`);
      router.push("/clientes");
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir cliente.");
    } finally {
      setExcluindo(false);
    }
  };

  if (loading) {
    return (
      <AppShell header={<Header title="Editar Cliente" />}>
        <div className="p-6 text-sm text-[var(--tropi-medium-gray)]">
          Carregando...
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell header={<Header title="Editar Cliente" />}>
      <div className="flex flex-col gap-6 p-6">
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

        {/* Botoes */}
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

          {!confirmExcluir ? (
            <button
              type="button"
              onClick={() => setConfirmExcluir(true)}
              className="w-full h-12 rounded-[16px] text-sm font-medium text-[var(--destructive)] hover:bg-red-50 transition"
            >
              Excluir cliente
            </button>
          ) : (
            <div className="tropi-card flex flex-col items-center gap-4">
              <p className="tropi-label text-center leading-5">
                Tem certeza que deseja excluir este cliente? Esta ação não pode
                ser desfeita.
              </p>
              <div className="flex gap-3 w-full">
                <button
                  type="button"
                  onClick={() => setConfirmExcluir(false)}
                  className="flex-1 h-12 rounded-[14px] text-sm font-medium bg-[#f3f3f5] text-[#0a0a0a] hover:bg-[#e8e8ea] transition"
                >
                  Voltar
                </button>
                <button
                  type="button"
                  onClick={onExcluir}
                  disabled={excluindo}
                  className="flex-1 h-12 rounded-[14px] text-sm font-medium bg-[var(--destructive)] text-white hover:opacity-90 transition disabled:opacity-50"
                >
                  {excluindo ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
