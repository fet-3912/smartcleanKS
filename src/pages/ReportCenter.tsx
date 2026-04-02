import { useState } from 'react';
import { FileBarChart, Download } from 'lucide-react';
import { SelectField, DateRangeField, FilterButtons } from '../components/shared/FormFields';

// --- Sample Data ---

const tableColumns = [
  { key: 'station', label: '車站' },
  { key: 'location', label: '廁所位置' },
  { key: 'field', label: '場域' },
  { key: 'category', label: '通報類別' },
  { key: 'content', label: '通報內容' },
  { key: 'status', label: '處理狀態' },
  { key: 'date', label: '通報日期' },
];

const tableData = [
  { station: '台北車站', location: '1F 大廳', field: '男廁', category: '設備故障', content: '沖水設備損壞', status: '已完成', date: '2026-03-18' },
  { station: '台北車站', location: '1F 大廳', field: '女廁', category: '清潔問題', content: '地面積水', status: '處理中', date: '2026-03-18' },
  { station: '板橋車站', location: 'B1 月台', field: '男廁', category: '耗材不足', content: '衛生紙補充', status: '已完成', date: '2026-03-17' },
  { station: '台中車站', location: '2F 候車室', field: '無障礙', category: '設備故障', content: '門鎖損壞', status: '待處理', date: '2026-03-17' },
  { station: '高雄車站', location: '1F 大廳', field: '女廁', category: '清潔問題', content: '異味問題', status: '處理中', date: '2026-03-16' },
  { station: '台南車站', location: '1F 大廳', field: '男廁', category: '耗材不足', content: '洗手乳補充', status: '已完成', date: '2026-03-16' },
];

const pieData = [
  { label: '男廁', value: 32, color: '#0067AC' },
  { label: '女廁', value: 28, color: '#2178A1' },
  { label: '無障礙廁所', value: 15, color: '#408142' },
  { label: '親子廁所', value: 10, color: '#CB6366' },
  { label: '哺乳室', value: 8, color: '#146D99' },
  { label: '清潔室', value: 5, color: '#858585' },
  { label: '其他', value: 2, color: '#F0F0F0' },
];

// --- Pie Chart Helpers ---

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

function describeArc(cx: number, cy: number, r: number, startAngle: number, endAngle: number) {
  const start = polarToCartesian(cx, cy, r, endAngle);
  const end = polarToCartesian(cx, cy, r, startAngle);
  const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${r} ${r} 0 ${largeArcFlag} 0 ${end.x} ${end.y} Z`;
}

// --- Status Badge ---

function StatusBadge({ status }: { status: string }) {
  const style =
    status === '已完成'
      ? 'bg-green/10 text-green'
      : status === '處理中'
        ? 'bg-[#CB6366]/10 text-[#CB6366]'
        : 'bg-gray-300 text-gray-900';

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-sm font-medium ${style}`}>
      {status}
    </span>
  );
}

// --- Section Header ---

function SectionHeader({ icon: Icon, title, subtitle }: { icon: React.ElementType; title: string; subtitle: string }) {
  return (
    <div className="bg-primary rounded-[5px] flex items-center gap-2 px-4 py-2">
      <Icon size={20} className="text-white shrink-0" />
      <div className="flex items-baseline gap-2">
        <span className="text-white text-lg font-semibold">{title}</span>
        <span className="text-white/70 text-sm">{subtitle}</span>
      </div>
    </div>
  );
}

// --- Pie Chart Component ---

function PieChart({ data }: { data: typeof pieData }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  const cx = 120;
  const cy = 120;
  const r = 100;
  let cumulative = 0;

  const slices = data.map((item) => {
    const startAngle = (cumulative / total) * 360;
    cumulative += item.value;
    const endAngle = (cumulative / total) * 360;
    const path = describeArc(cx, cy, r, startAngle, endAngle);
    return { ...item, path };
  });

  return (
    <div className="flex items-center gap-8">
      <svg width={240} height={240} viewBox="0 0 240 240" className="shrink-0">
        {slices.map((slice) => (
          <path key={slice.label} d={slice.path} fill={slice.color} stroke="white" strokeWidth={1.5} />
        ))}
      </svg>
      <div className="flex flex-col gap-2">
        {data.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <span
              className="w-3 h-3 rounded-sm shrink-0"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm text-text-dark whitespace-nowrap">
              {item.label}
            </span>
            <span className="text-sm font-semibold text-text-dark">
              {item.value}
            </span>
            <span className="text-xs text-gray-500">
              ({Math.round((item.value / total) * 100)}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// --- Main Page ---

export default function ReportCenter() {
  const [, setStation] = useState('');
  const [, setLocation] = useState('');
  const [, setField] = useState('');

  void setStation;
  void setLocation;
  void setField;

  return (
    <div className="flex flex-col gap-6">
      {/* Filter Bar */}
      <div className="flex items-end gap-4 flex-wrap">
        <SelectField label="清潔類型" placeholder="請選擇" options={['設備故障', '廁間再清潔', '備品補充', '其他']} />
        <SelectField label="廁所位置" placeholder="請選擇" options={['U-1 西非付費區廁所', 'U-1 西付費區廁所', 'U-1 東非付費區廁所', 'U-1 南非付費區廁所', 'U-1 東付費區廁所', 'U-1 東非付費區無障礙廁所']} />
        <SelectField label="清潔狀態" placeholder="請選擇" options={['待清潔', '清潔中', '已完成', '已取消']} />
        <DateRangeField label="日期區間" />
        <FilterButtons />
      </div>

      {/* Two-panel layout */}
      <div className="grid grid-cols-2 gap-6">
        {/* Left: Report Status Table */}
        <div className="bg-white rounded-[10px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.15)] p-4 flex flex-col gap-4">
          <SectionHeader
            icon={FileBarChart}
            title="各場域通報狀況"
            subtitle="Report Status by Site"
          />

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr>
                  {tableColumns.map((col) => (
                    <th
                      key={col.key}
                      className="bg-primary text-text-light font-semibold text-left px-3 py-2.5 border-b border-gray-900 whitespace-nowrap first:rounded-tl last:rounded-tr"
                    >
                      {col.label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, idx) => (
                  <tr
                    key={idx}
                    className={idx % 2 === 1 ? 'bg-gray-400' : 'bg-white'}
                  >
                    {tableColumns.map((col) => (
                      <td
                        key={col.key}
                        className="px-3 py-2 border-b border-gray-300 whitespace-nowrap"
                      >
                        {col.key === 'status' ? (
                          <StatusBadge status={row[col.key as keyof typeof row] as string} />
                        ) : (
                          row[col.key as keyof typeof row]
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Notification Count Pie Chart */}
        <div className="bg-white rounded-[10px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.15)] p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <SectionHeader
                icon={FileBarChart}
                title="各場域通報數量"
                subtitle="Notification Count by Field"
              />
            </div>
            <button className="flex items-center gap-1 px-3 py-2 rounded border border-green text-green bg-green/10 cursor-pointer text-sm font-medium hover:bg-green/20 transition-colors ml-3 shrink-0">
              <Download size={18} />
              <span>匯出</span>
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center py-4">
            <PieChart data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
}
