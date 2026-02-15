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
        "w-full h-[72px] flex items-center gap-4 px-6",
        "shadow-[0px_1px_3px_rgba(0,0,0,0.1),0px_1px_2px_rgba(0,0,0,0.1)]",
        className
      )}
      style={{
        background: "linear-gradient(169deg, #0D332B 0%, #1A4D42 100%)",
      }}
    >
      <button
        onClick={() => router.back()}
        className="flex items-center justify-center size-10 rounded-[10px] transition hover:bg-white/10 active:scale-95"
        aria-label="Voltar"
      >
        <ArrowLeft size={24} className="text-white" />
      </button>

      <h1 className="text-2xl font-bold text-white tracking-[0.07px]">
        {title}
      </h1>
    </header>
  );
}
