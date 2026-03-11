"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { Button } from "@/app/components/Buttom";
import { Header } from "@/app/components/Header";
import AppShell from "@/app/components/AppShell";
import { useAuth } from "@/app/contexts/AuthContext";

export default function CadastroPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmSenha, setConfirmSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  if (!loading && user) {
    router.replace("/home");
    return null;
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");

    if (senha !== confirmSenha) {
      setErro("As senhas não coincidem");
      return;
    }

    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setEnviando(true);

    const { error } = await supabase.auth.signUp({
      email,
      password: senha,
      options: {
        data: { nome_completo: nome },
      },
    });

    if (error) {
      setErro(error.message);
      setEnviando(false);
      return;
    }

    router.replace("/home");
  };

  if (loading) {
    return (
      <AppShell header={<Header title="Criar Conta" />} showNavigation={false}>
        <div className="flex items-center justify-center py-20">
          <p className="text-sm" style={{ color: "#8b8680" }}>
            Carregando...
          </p>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell header={<Header title="Criar Conta" />} showNavigation={false}>
      <form onSubmit={onSubmit} className="flex flex-col gap-6 p-6">
        {/* Card — Dados do Usuário */}
        <div className="tropi-card flex flex-col gap-6">
          <div className="tropi-field">
            <label className="tropi-label" htmlFor="nome">
              Nome Completo
            </label>
            <input
              id="nome"
              type="text"
              className="tropi-input"
              placeholder="Seu nome completo"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
              autoComplete="name"
            />
          </div>

          <div className="tropi-field">
            <label className="tropi-label" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="tropi-input"
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="tropi-field">
            <label className="tropi-label" htmlFor="senha">
              Senha
            </label>
            <input
              id="senha"
              type="password"
              className="tropi-input"
              placeholder="Mínimo 6 caracteres"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>

          <div className="tropi-field">
            <label className="tropi-label" htmlFor="confirmSenha">
              Confirmar Senha
            </label>
            <input
              id="confirmSenha"
              type="password"
              className="tropi-input"
              placeholder="Repita a senha"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
        </div>

        {erro && (
          <p
            className="text-sm text-center"
            style={{ color: "#C00000" }}
          >
            {erro}
          </p>
        )}

        {/* Botão Cadastrar */}
        <Button
          type="submit"
          variant="tropi"
          size="tropi"
          disabled={enviando}
        >
          {enviando ? "Cadastrando..." : "Cadastrar"}
        </Button>
      </form>
    </AppShell>
  );
}
