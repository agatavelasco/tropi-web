"use client";

import { Trash2 } from "lucide-react";

interface ConfirmDeleteModalProps {
  open: boolean;
  title: string;
  confirmLabel: string;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDeleteModal({
  open,
  title,
  confirmLabel,
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmDeleteModalProps) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      onClick={onCancel}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Modal */}
      <div
        className="relative w-full max-w-[340px] flex flex-col gap-6 p-6"
        style={{
          background: "white",
          borderRadius: 24,
          boxShadow: "0px 8px 40px rgba(0, 0, 0, 0.15)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Ícone */}
        <div
          className="flex items-center justify-center"
          style={{
            width: 56,
            height: 56,
            backgroundColor: "var(--tropi-destructive-bg)",
            borderRadius: 14,
          }}
        >
          <Trash2 size={24} style={{ color: "var(--tropi-destructive)" }} />
        </div>

        {/* Texto */}
        <h3
          className="font-bold"
          style={{
            fontSize: 20,
            lineHeight: "28px",
            color: "var(--tropi-dark-gray)",
            letterSpacing: "-0.45px",
          }}
        >
          {title}
        </h3>

        {/* Botão Excluir */}
        <button
          type="button"
          onClick={onConfirm}
          disabled={loading}
          className="w-full h-14 rounded-[16px] text-base font-semibold text-white transition hover:opacity-90 disabled:opacity-50"
          style={{ background: "var(--tropi-destructive)" }}
        >
          {loading ? "Excluindo..." : confirmLabel}
        </button>

        {/* Link Voltar */}
        <button
          type="button"
          onClick={onCancel}
          className="w-full text-base font-semibold transition hover:opacity-70"
          style={{ color: "var(--tropi-destructive)" }}
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
