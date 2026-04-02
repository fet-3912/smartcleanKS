import { Menu } from 'lucide-react';

interface MobileHeaderProps {
  variant: 'public' | 'staff';
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export default function MobileHeader({ variant, title, subtitle, onMenuClick }: MobileHeaderProps) {
  if (variant === 'public') {
    return (
      <div
        className="relative w-full bg-blue text-white flex flex-col items-center justify-center overflow-hidden"
        style={{
          minHeight: 160,
          paddingTop: 24,
          paddingBottom: 32,
          borderBottomRightRadius: '40%',
          borderBottomLeftRadius: 20,
        }}
      >
        {/* <div className="w-14 h-14 md:w-18 md:h-18 rounded-full bg-white/20 flex items-center justify-center mb-3">
          <div className="w-10 h-10 md:w-14 md:h-14 rounded-full bg-white/30 flex items-center justify-center text-xs md:text-sm font-bold text-white">
            TRA
          </div>
        </div> */}
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold tracking-wide">{title}</h1>
        {subtitle && (
          <p className="text-sm md:text-base font-light mt-1 opacity-90">{subtitle}</p>
        )}
      </div>
    );
  }

  return (
    <div
      className="relative w-full bg-primary text-white flex items-center px-4 md:px-8 py-3 md:py-4"
      style={{
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
      }}
    >
      {/* <div className="w-9 h-9 md:w-11 md:h-11 rounded-full bg-white/20 flex items-center justify-center">
        <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/30 flex items-center justify-center text-[8px] md:text-[10px] font-bold text-white">
          TRA
        </div>
      </div> */}
      <h1 className="flex-1 text-center text-base md:text-xl lg:text-2xl font-bold">{title}</h1>
      {/* <button onClick={onMenuClick} className="p-1 cursor-pointer">
        <Menu size={24} className="md:w-7 md:h-7" />
      </button> */}
    </div>
  );
}
