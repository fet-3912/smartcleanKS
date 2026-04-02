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
    <div className="flex items-center justify-between border border-blue3 rounded-lg px-4 md:px-5 py-2.5 md:py-3">
      <span className={`text-lg md:text-xl font-bold ${config.color}`}>{config.label}</span>
      <span className="text-sm md:text-base text-text-dark">通報編號 : {reportId}</span>
    </div>
  );
}
