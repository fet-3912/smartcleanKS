import { ChevronDown } from 'lucide-react';
import SectionHeader from './SectionHeader';

interface MobileDropdownProps {
  headerVariant: 'yellow' | 'blue';
  label: string;
  sublabel?: string;
  value: string;
  onChange?: (value: string) => void;
  options?: { label: string; value: string }[];
  placeholder?: string;
}

export default function MobileDropdown({
  headerVariant,
  label,
  sublabel,
  value,
  onChange,
  options = [],
  placeholder,
}: MobileDropdownProps) {
  return (
    <div className="flex flex-col gap-2">
      <SectionHeader variant={headerVariant} label={label} sublabel={sublabel} />
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full appearance-none rounded-2xl border border-[#bfdaf0] bg-white px-5 py-4 text-base text-text-dark shadow-sm pr-11 focus:outline-none focus:ring-2 focus:ring-blue/30"
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          size={18}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-blue pointer-events-none"
        />
      </div>
    </div>
  );
}
