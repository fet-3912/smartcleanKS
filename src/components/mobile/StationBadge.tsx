interface StationBadgeProps {
  stationName: string;
}

export default function StationBadge({ stationName }: StationBadgeProps) {
  return (
    <div className="mx-4 md:mx-6 mt-4">
      <div className="bg-yellow rounded-t-lg px-4 py-1.5 md:py-2">
        <span className="text-sm md:text-base font-semibold text-yellow-text">目前站點</span>
      </div>
      <div className="border border-yellow rounded-b-lg px-4 py-3 md:py-4 bg-white">
        <span className="text-base md:text-lg font-bold text-primary text-center block">{stationName}</span>
      </div>
    </div>
  );
}
