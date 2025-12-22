import type { Metadata } from "next";
import "./globals.css";
import AppShell from "./components/AppShell";


export const metadata: Metadata = {
  title: "Tropi",
  description: "Sistema de clientes e atendimentos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}