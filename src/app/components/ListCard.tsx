"use client";

import React from "react";

interface ListCardProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export default function ListCard({ onClick, children }: ListCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex items-center gap-4 bg-white rounded-[16px] px-5 py-5 text-left transition active:scale-[0.98] w-full"
      style={{
        boxShadow: "var(--tropi-list-shadow)",
      }}
    >
      {children}
    </button>
  );
}
