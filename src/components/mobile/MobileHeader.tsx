interface MobileHeaderProps {
  variant: 'public' | 'staff';
  title: string;
  subtitle?: string;
  onMenuClick?: () => void;
}

export default function MobileHeader({ variant, title, subtitle, onMenuClick: _onMenuClick }: MobileHeaderProps) {
  if (variant === 'public') {
    return (
      <div
        className="relative w-full overflow-hidden rounded-[32px] bg-[linear-gradient(135deg,#007FD3_0%,#1396e6_58%,#7ed0ff_100%)] px-8 py-6 text-white shadow-[0_24px_60px_rgba(0,127,211,0.18)]"
      >
        <div className="absolute inset-y-0 right-0 w-1/3 bg-white/10 blur-3xl" />
        <div className="relative flex h-full flex-col justify-between gap-6 md:max-w-3xl">
          {/* <div className="inline-flex w-fit rounded-full border border-white/25 bg-white/12 px-4 py-1 text-sm font-medium tracking-[0.18em] text-white/90">
            SMART CLEAN
          </div> */}
          <div>
            {subtitle && (
              <p className="text-sm font-semibold tracking-[0.2em] text-white/85">{subtitle}</p>
            )}
            <h1 className="mt-2 text-3xl font-bold">{title}</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="relative w-full rounded-[28px] border border-[#d8ebf8] bg-white px-8 py-6 text-text-dark shadow-[0_20px_50px_rgba(15,23,42,0.06)]"
      style={{
        minHeight: 120,
      }}
    >
      <div className="absolute right-8 top-6 h-16 w-16 rounded-full bg-[radial-gradient(circle,#dff4ff_0%,rgba(223,244,255,0)_72%)]" />
      <div className="relative flex flex-col gap-2">
        <span className="text-sm font-semibold tracking-[0.2em] text-primary/70">CLEANING MANAGEMENT</span>
        <h1 className="text-3xl font-bold tracking-[0.06em]">{title}</h1>
      </div>
    </div>
  );
}
