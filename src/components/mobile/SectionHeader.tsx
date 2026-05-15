interface SectionHeaderProps {
  variant: 'yellow' | 'blue';
  label: string;
  sublabel?: string;
}

export default function SectionHeader({ variant, label, sublabel }: SectionHeaderProps) {
  const bg = variant === 'yellow' ? 'bg-yellow' : 'bg-blue';
  const textColor = variant === 'yellow' ? 'text-yellow-text' : 'text-white';

  return (
    <div className={`${bg} rounded-2xl px-5 py-3 flex items-center gap-3 shadow-sm`}>
      <span className={`text-base font-semibold tracking-[0.06em] ${textColor}`}>{label}</span>
      {sublabel && (
        <span className={`text-sm ${textColor} opacity-80`}>{sublabel}</span>
      )}
    </div>
  );
}
