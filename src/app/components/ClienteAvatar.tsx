interface ClienteAvatarProps {
  nome: string;
}

export default function ClienteAvatar({ nome }: ClienteAvatarProps) {
  return (
    <div className="flex-shrink-0 flex items-center justify-center size-14 rounded-[16px] bg-[var(--tropi-navy-blue)]">
      <span className="text-lg font-bold text-white">
        {nome.charAt(0).toUpperCase()}
      </span>
    </div>
  );
}
