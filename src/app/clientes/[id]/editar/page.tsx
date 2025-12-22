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
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  estado: string;
  numero: string;
}

export default function EditarClientePage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [loading, setLoading] = useState(true);
  const [salvando, setSalvando] = useState(false);
  const [excluindo, setExcluindo] = useState(false);

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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
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
      alert("Alterações salvas!");
      router.push("/clientes");
    } catch (e) {
      console.error(e);
      alert("Erro ao salvar alterações.");
    } finally {
      setSalvando(false);
    }
  };

  const onExcluir = async () => {
    const ok = confirm("Tem certeza que deseja excluir este cliente?");
    if (!ok) return;

    setExcluindo(true);
    try {
      await apiDelete(`/clientes/${id}`);
      alert("Cliente excluído!");
      router.push("/clientes");
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir cliente.");
    } finally {
      setExcluindo(false);
    }
  };

  if (loading) return <div style={{ padding: 24 }}>Carregando...</div>;

  return (
    <AppShell header={<Header title="Editar Cliente" />}>
      <form style={{ display: "grid", gap: 8, maxWidth: 420 }}>
        <input name="nome" placeholder="Nome" value={form.nome} onChange={handleChange} />
        <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} />
        <input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} />
        <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} />

        <input name="cep" placeholder="CEP" value={form.cep} onChange={handleChange} />
        <input name="logradouro" placeholder="Logradouro" value={form.logradouro} onChange={handleChange} />
        <input name="numero" placeholder="Número" value={form.numero} onChange={handleChange} />
        <input name="complemento" placeholder="Complemento" value={form.complemento} onChange={handleChange} />
        <input name="bairro" placeholder="Bairro" value={form.bairro} onChange={handleChange} />
        <input name="localidade" placeholder="Cidade" value={form.localidade} onChange={handleChange} />
        <input name="uf" placeholder="UF" value={form.uf} onChange={handleChange} />

        <div style={{ display: "flex", gap: 8, marginTop: 12 }}>
          <Button variant={"tropi"} size={"lg"} onClick={onSalvar} disabled={salvando}>
            {salvando ? "Salvando..." : "Salvar Alterações"}
          </Button>
        
          <Button
            type="button"
            onClick={onExcluir}
            disabled={excluindo}
            variant={"ghost"}
            size={"lg"}
          >
            {excluindo ? "Excluindo..." : "Excluir cliente"}
          </Button>
        </div>
      </form>
    </AppShell>
  );
}
