import { Wrench, TreePine } from "lucide-react";

interface ServicoIconProps {
  tipo: string;
}

function getServiceIcon(tipo: string) {
  const lower = tipo.toLowerCase();
  if (lower.includes("consultoria") || lower.includes("paisag")) {
    return { icon: TreePine, bg: "var(--tropi-moss-green)" };
  }
  return { icon: Wrench, bg: "var(--tropi-warm-green)" };
}

export default function ServicoIcon({ tipo }: ServicoIconProps) {
  const { icon: Icon, bg } = getServiceIcon(tipo);
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center rounded-[16px]"
      style={{ width: 48, height: 48, backgroundColor: bg }}
    >
      <Icon size={24} className="text-white" />
    </div>
  );
}
