interface StationBadgeProps {
  stationName: string;
}

export default function StationBadge({ stationName }: StationBadgeProps) {
  return (
    <div className="w-full rounded-[24px] border border-[#f2d77d] bg-[#fffdf4] px-6 py-5 shadow-[0_18px_40px_rgba(245,198,24,0.12)]">
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold tracking-[0.18em] text-yellow-text/80">目前站點</span>
          <span className="text-2xl font-bold tracking-[0.08em] text-primary">{stationName}</span>
        </div>
        <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm">
          Station
        </div>
      </div>
    </div>
  );
}
