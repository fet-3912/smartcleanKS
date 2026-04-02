interface BottomButtonBarProps {
  buttons: Array<{
    label: string;
    variant: 'outline' | 'filled';
    onClick?: () => void;
  }>;
}

export default function BottomButtonBar({ buttons }: BottomButtonBarProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.1)] z-50">
      <div className="w-full max-w-lg md:max-w-2xl mx-auto px-4 md:px-6 py-3 md:py-4 flex gap-3">
        {buttons.map((btn, i) => (
          <button
            key={i}
            onClick={btn.onClick}
            className={`flex-1 py-3 md:py-4 rounded-lg text-base md:text-lg font-semibold transition-colors cursor-pointer ${
              btn.variant === 'filled'
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
