import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import AppShell from "./components/AppShell";
import Toaster from "./components/Toaster";

export const metadata: Metadata = {
  title: "Tropi",
  description: "Sistema de clientes e atendimentos",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-br">
      <body>
        <AuthProvider>
          <AppShell>{children}</AppShell>
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}