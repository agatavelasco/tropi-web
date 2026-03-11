"use client";

import { useEffect, useState } from "react";
import { subscribe, Toast } from "@/lib/toast";

export default function Toaster() {
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    return subscribe(setToasts);
  }, []);

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-24 left-0 right-0 z-50 flex flex-col gap-2 px-4 pointer-events-none">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="w-full max-w-[384px] mx-auto rounded-[16px] px-4 py-3 text-sm font-medium text-white"
          style={{
            background:
              t.type === "error"
                ? "var(--tropi-destructive)"
                : t.type === "success"
                ? "var(--tropi-moss-green)"
                : "var(--tropi-navy-blue)",
            boxShadow: "0px 4px 16px rgba(0,0,0,0.2)",
          }}
        >
          {t.message}
        </div>
      ))}
    </div>
  );
}
