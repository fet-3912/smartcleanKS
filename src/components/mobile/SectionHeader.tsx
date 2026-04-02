interface SectionHeaderProps {
  variant: 'yellow' | 'blue';
  label: string;
  sublabel?: string;
}

export default function SectionHeader({ variant, label, sublabel }: SectionHeaderProps) {
  const bg = variant === 'yellow' ? 'bg-yellow' : 'bg-blue';
  const textColor = variant === 'yellow' ? 'text-yellow-text' : 'text-white';

  return (
    <div className={`${bg} rounded-lg px-4 md:px-5 py-2 md:py-2.5 flex items-center gap-2`}>
      <span className={`text-sm md:text-base font-semibold ${textColor}`}>{label}</span>
      {sublabel && (
        <span className={`text-xs md:text-sm ${textColor} opacity-80`}>{sublabel}</span>
      )}
    </div>
  );
}
