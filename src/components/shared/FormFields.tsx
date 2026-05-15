import { ChevronDown } from 'lucide-react';

interface SelectFieldProps {
  label?: string;
  placeholder?: string;
  options?: string[];
  value?: string;
  onChange?: (value: string) => void;
}

export function SelectField({ label, placeholder = '請選擇', options = [], value, onChange }: SelectFieldProps) {
  return (
    <div className="flex flex-col gap-[5px] flex-1 min-w-0">
      {label && <label className="text-lg text-black whitespace-nowrap">{label}</label>}
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          className="w-full appearance-none bg-white border border-primary rounded-[5px] h-[50px] px-4 pr-8 text-primary text-lg cursor-pointer outline-none"
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={14} className="text-primary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
      </div>
    </div>
  );
}

interface TextFieldProps {
  label: string;
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
}

export function TextField({ label, placeholder = '請輸入', value, onChange }: TextFieldProps) {
  return (
    <div className="flex flex-col gap-[5px] flex-1 min-w-0">
      <label className="text-lg text-black whitespace-nowrap">{label}</label>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="bg-white border border-primary rounded-[5px] h-[50px] px-4 text-primary text-lg placeholder:text-primary outline-none"
      />
    </div>
  );
}

interface DateRangeFieldProps {
  label: string;
}

export function DateRangeField({ label }: DateRangeFieldProps) {
  return (
    <div className="flex flex-col gap-[10px] shrink-0">
      <label className="text-lg text-black whitespace-nowrap">{label}</label>
      <div className="flex items-center gap-[3px]">
        <input
          type="date"
          className="bg-white border border-primary rounded-[5px] h-[50px] px-4 text-primary text-lg cursor-pointer outline-none min-w-[160px]"
        />
        <input
          type="date"
          className="bg-white border border-primary rounded-[5px] h-[50px] px-4 text-primary text-lg cursor-pointer outline-none min-w-[160px]"
        />
      </div>
    </div>
  );
}

export function FilterButtons() {
  return (
    <div className="flex items-center gap-[5px] shrink-0">
      <button className="w-[100px] h-[50px] rounded-[5px] border border-primary bg-gray-400 text-primary text-lg font-semibold cursor-pointer hover:bg-gray-200 transition-colors">
        清除
      </button>
      <button className="w-[100px] h-[50px] rounded-[5px] bg-primary text-white text-lg font-semibold cursor-pointer hover:bg-primary-dark transition-colors">
        查詢
      </button>
    </div>
  );
}
