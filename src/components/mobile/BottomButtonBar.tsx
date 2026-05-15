interface BottomButtonBarProps {
  buttons: Array<{
    label: string;
    variant: 'outline' | 'filled';
    onClick?: () => void;
  }>;
}

export default function BottomButtonBar({ buttons }: BottomButtonBarProps) {
  return (
    <div className="w-full bg-transparent">
      <div className="w-full flex flex-wrap justify-end gap-3 pt-2">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            className={`flex-1 min-w-[160px] md:flex-none md:min-w-[180px] px-6 py-3.5 rounded-xl text-base font-semibold transition-colors cursor-pointer ${btn.variant === 'filled'
              ? 'bg-primary text-white active:bg-primary-dark hover:bg-primary-dark'
              : 'border-2 border-primary text-primary bg-white active:bg-gray-100 hover:bg-gray-100'
              }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
