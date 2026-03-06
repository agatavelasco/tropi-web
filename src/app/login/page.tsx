"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { Button } from "@/app/components/Buttom";
import { useAuth } from "@/app/contexts/AuthContext";

export default function LoginPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    if (!loading && user) {
      router.replace("/home");
    }
  }, [loading, user, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    setEnviando(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password: senha,
    });

    if (error) {
      setErro("Email ou senha inválidos");
      setEnviando(false);
      return;
    }

    router.replace("/home");
  };

  if (loading) {
    return (
      <div
        className="min-h-screen flex items-center justify-center"
        style={{ background: "#1a2e1a" }}
      >
        <p className="text-sm" style={{ color: "rgba(255,255,255,0.6)" }}>
          Carregando...
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 relative"
      style={{
        backgroundImage: "url('/login-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay escuro para contraste */}
      <div
        className="absolute inset-0"
        style={{
          background: "rgba(0, 0, 0, 0.45)",
        }}
      />

      <div className="relative z-10 w-full max-w-[340px] flex flex-col items-center">
        {/* Logo */}
        <h1
          style={{
            fontFamily: "'Georgia', 'Times New Roman', serif",
            fontSize: 48,
            fontWeight: 400,
            color: "#ffffff",
            letterSpacing: "1px",
            marginBottom: 16,
          }}
        >
          tropi
        </h1>

        {/* Formulário */}
        <form onSubmit={onSubmit} className="flex flex-col gap-5 w-full">
          <div className="flex flex-col gap-3">
            <label
              className="text-sm font-medium"
              htmlFor="email"
              style={{ color: "#ffffff" }}
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full h-12 rounded-full px-5 text-sm outline-none"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                color: "#2d2a26",
                border: "none",
              }}
              placeholder="seu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>

          <div className="flex flex-col gap-3">
            <label
              className="text-sm font-medium"
              htmlFor="senha"
              style={{ color: "#ffffff" }}
            >
              Senha
            </label>
            <input
              id="senha"
              type="password"
              className="w-full h-12 rounded-full px-5 text-sm outline-none"
              style={{
                background: "rgba(255, 255, 255, 0.95)",
                color: "#2d2a26",
                border: "none",
              }}
              placeholder="Sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              autoComplete="current-password"
            />
          </div>

          {erro && (
            <p
              className="text-sm text-center"
              style={{ color: "#ff6b6b" }}
            >
              {erro}
            </p>
          )}

          <div style={{ marginTop: 16 }}>
            <Button
              type="submit"
              variant="tropi"
              size="tropi"
              disabled={enviando}
              style={{
                borderRadius: 9999,
              }}
            >
              {enviando ? "Entrando..." : "Entrar"}
            </Button>
          </div>
        </form>

        {/* Links */}
        <div className="flex flex-col items-center gap-3" style={{ marginTop: 32 }}>
          <Link
            href="/cadastro"
            className="text-sm font-semibold"
            style={{ color: "#ffffff" }}
          >
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
}
