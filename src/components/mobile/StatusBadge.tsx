interface StatusBadgeProps {
  status: 'pending' | 'cleaning' | 'completed' | 'new';
  reportId: string;
}

const statusConfig: Record<string, { label: string; color: string }> = {
  pending: { label: '待清潔', color: 'text-status-red' },
  cleaning: { label: '清潔中', color: 'text-status-green' },
  completed: { label: '已清潔', color: 'text-blue' },
  new: { label: '新增通報', color: 'text-blue' },
};

export default function StatusBadge({ status, reportId }: StatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 rounded-[24px] border border-blue3/40 bg-white px-6 py-5 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
      <div className="flex items-center gap-3">
        <span className={`text-2xl font-bold ${config.color}`}>{config.label}</span>
        <span className="rounded-full bg-[#eef7ff] px-3 py-1 text-sm font-medium text-primary">案件狀態</span>
      </div>
      <span className="text-base text-text-dark">通報編號 : {reportId}</span>
    </div>
  );
}
