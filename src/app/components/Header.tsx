"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/app/components/utils";

interface HeaderProps {
  title: string;
  className?: string;
}

export function Header({ title, className }: HeaderProps) {
  const router = useRouter();

  return (
    <header
    className={cn(
        "w-full flex items-center gap-4 px-6 py-4",
        className
    )}
    style={{
        backgroundColor: "var(--tropi-navy-blue)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
    }}
    >

      {/* Breadcrumb / Voltar */}
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center h-9 w-9 rounded-lg transition hover:bg-white/10 active:scale-95"
        aria-label="Voltar"
      >
        <ArrowLeft size={20} className="text-white" />
      </button>

      {/* Título */}
      <h1 className="text-lg font-medium text-white truncate">
        {title}
      </h1>
    </header>
  );
}
