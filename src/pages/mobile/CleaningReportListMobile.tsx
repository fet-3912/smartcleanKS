import { useNavigate, useSearchParams } from 'react-router-dom';
import { MapPin, Pencil, Eye, Plus } from 'lucide-react';
import MobileHeader from '../../components/mobile/MobileHeader';
import StationBadge from '../../components/mobile/StationBadge';

type TabKey = 'pending' | 'cleaning' | 'completed';

const tabs: { key: TabKey; label: string; showCount?: boolean }[] = [
  { key: 'pending', label: '待清潔', showCount: true },
  { key: 'cleaning', label: '清潔中', showCount: true },
  { key: 'completed', label: '已清潔' },
];

interface ReportItem {
  id: string;
  location: string;
  type: string;
  time: string;
  tab: TabKey;
}

const mockReports: ReportItem[] = [
  { id: 'AA1234567', location: 'U-1 西非付費區廁所', type: '設備故障', time: '10:10', tab: 'cleaning' },
  { id: 'AA1234568', location: 'U-1 東付費區廁所', type: '廁間再清潔', time: '12:12', tab: 'cleaning' },
  { id: 'AA1234569', location: 'U-1 南非付費區廁所', type: '補充衛生紙', time: '14:33', tab: 'cleaning' },
  { id: 'AA1234570', location: 'U-1 西付費區廁所', type: '設備故障', time: '19:29', tab: 'cleaning' },
  { id: 'AA1234571', location: 'U-1 西非付費區廁所', type: '設備故障', time: '10:10', tab: 'pending' },
  { id: 'AA1234572', location: 'U-1 東付費區廁所', type: '廁間再清潔', time: '12:12', tab: 'pending' },
  { id: 'AA1234573', location: 'U-1 西非付費區廁所', type: '補充衛生紙', time: '07:00', tab: 'completed' },
];

function isTabKey(value: string | null): value is TabKey {
  return value === 'pending' || value === 'cleaning' || value === 'completed';
}

export default function CleaningReportListMobile({
  showCompleteModal = false,
  initialTab = 'cleaning',
}: {
  showCompleteModal?: boolean;
  initialTab?: TabKey;
}) {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const tabParam = searchParams.get('tab');
  const activeTab = isTabKey(tabParam) ? tabParam : initialTab;
  const tabCounts = mockReports.reduce<Record<TabKey, number>>(
    (counts, report) => {
      counts[report.tab] += 1;
      return counts;
    },
    { pending: 0, cleaning: 0, completed: 0 },
  );

  const filteredReports = mockReports.filter((r) => r.tab === activeTab);

  const handleView = (item: ReportItem) => {
    if (item.tab === 'pending') navigate('/mobile/cleaning-list/pending');
    else if (item.tab === 'cleaning') navigate('/mobile/cleaning-list/in-progress');
    else if (item.tab === 'completed') navigate('/mobile/cleaning-list/completed-detail');
  };

  const handleTabChange = (tab: TabKey) => {
    if (tab === initialTab) {
      setSearchParams({}, { replace: true });
      return;
    }

    setSearchParams({ tab }, { replace: true });
  };

  return (
    <div className="w-full flex flex-col gap-8 relative">
      <MobileHeader variant="staff" title="清潔通報列表" onMenuClick={() => { }} />
      <div className="w-full max-w-6xl mx-auto">
        <StationBadge stationName="高雄站" />
      </div>

      <div className="w-full max-w-6xl mx-auto flex flex-col gap-6">
        {/* <div className="flex flex-wrap items-center justify-between gap-4 rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-[0_24px_60px_rgba(15,23,42,0.06)]">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary/70">REPORT OVERVIEW</p>
            <h2 className="mt-2 text-3xl font-bold text-text-dark">清潔通報列表</h2>
          </div>
          <button
            onClick={() => navigate('/mobile/cleaning-list/add')}
            className="inline-flex items-center gap-2 rounded-xl bg-blue3 px-5 py-3 text-base font-medium text-white shadow-lg transition-opacity hover:opacity-90"
          >
            <Plus size={18} />
            <span>新增通報</span>
          </button>
        </div> */}

        <div className="flex justify-between">
          <div className='flex gap-3'>
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => handleTabChange(tab.key)}
                className={`inline-flex min-w-[140px] items-center justify-center gap-2 rounded-full px-6 py-3 text-base font-medium transition-colors cursor-pointer ${activeTab === tab.key
                  ? 'bg-blue3 text-white shadow-[0_10px_24px_rgba(0,127,211,0.22)]'
                  : 'bg-white border-2 border-blue3 text-gray-text'
                  }`}
              >
                <span>{tab.label}</span>
                {tab.showCount && (
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-sm font-semibold ${activeTab === tab.key
                      ? 'bg-white/20 text-white'
                      : 'bg-blue3/10 text-blue3'
                      }`}
                  >
                    {tabCounts[tab.key]}件
                  </span>
                )}
              </button>
            ))}
          </div>
          <button
            onClick={() => navigate('/mobile/cleaning-list/add')}
            className="inline-flex items-center gap-2 rounded-xl bg-blue3 px-5 py-3 text-base font-medium text-white shadow-lg transition-opacity hover:opacity-90"
          >
            <Plus size={18} />
            <span>新增通報</span>
          </button>
        </div>

        <div className="flex flex-col gap-4 pb-6">
          {filteredReports.map((item) => (
            <div
              key={item.id}
              className="grid gap-5 rounded-[28px] border border-slate-200 bg-white px-6 py-6 shadow-[0_20px_50px_rgba(15,23,42,0.05)] lg:grid-cols-[1.5fr_0.9fr_0.7fr] lg:items-center"
            >
              <div className="flex items-start gap-4 min-w-0">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#eef7ff]">
                  <MapPin size={22} className="text-blue" />
                </div>
                <div className="min-w-0">
                  <p className="text-xl font-bold text-text-dark truncate">{item.location}</p>
                  <p className="mt-2 text-base text-text-dark">通報編號 {item.id}</p>
                </div>
              </div>

              <div className="flex flex-col gap-2 text-base text-text-dark">
                <div>
                  <span className="font-semibold text-primary">清潔類型</span>
                  <span className="ml-3">{item.type}</span>
                </div>
                <div>
                  <span className="font-semibold text-primary">通報時間</span>
                  <span className="ml-3">{item.time}</span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3">
                {item.tab === 'completed' ? (
                  <>
                    <span className="rounded-full bg-[#eef7ff] px-4 py-2 text-sm font-medium text-primary">已完成</span>
                    <button
                      onClick={() => handleView(item)}
                      className="rounded-xl border border-slate-200 p-3 text-text-dark transition-colors hover:bg-gray-100 cursor-pointer"
                    >
                      <Eye size={20} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleView(item)}
                      className="rounded-xl border border-slate-200 p-3 text-text-dark transition-colors hover:bg-gray-100 cursor-pointer"
                    >
                      <Pencil size={20} />
                    </button>
                    <button
                      onClick={() => handleView(item)}
                      className="rounded-xl border border-slate-200 p-3 text-text-dark transition-colors hover:bg-gray-100 cursor-pointer"
                    >
                      <Eye size={20} />
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}

          {filteredReports.length === 0 && (
            <div className="rounded-[28px] border border-dashed border-slate-300 bg-white px-6 py-12 text-center text-base text-gray-text">
              目前沒有符合條件的通報資料。
            </div>
          )}
        </div>
      </div>

      {showCompleteModal && (
        <CompleteModal
          onCancel={() => navigate('/mobile/cleaning-list?tab=cleaning', { replace: true })}
          onConfirm={() => navigate('/mobile/cleaning-list?tab=completed', { replace: true })}
        />
      )}
    </div>
  );
}

function CompleteModal({ onCancel, onConfirm }: { onCancel: () => void; onConfirm: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-black/50" onClick={onCancel} />
      <div className="relative flex w-full max-w-xl flex-col items-center overflow-hidden rounded-[32px] bg-white shadow-[0_30px_80px_rgba(15,23,42,0.24)]">
        <div className="px-8 pb-6 pt-10 flex flex-col items-center gap-5">
          <div className="flex h-24 w-24 items-center justify-center">
            <svg viewBox="0 0 95 118" fill="none" className="w-full h-full">
              <path d="M47.5 0L95 23.6V70.8C95 97 47.5 118 47.5 118S0 97 0 70.8V23.6L47.5 0Z" fill="#E7F7FF" />
              <path d="M47.5 10L85 30V68C85 90 47.5 108 47.5 108S10 90 10 68V30L47.5 10Z" fill="#007FD3" fillOpacity="0.15" />
              <path d="M40 58L46 64L58 52" stroke="#007FD3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="text-center">
            <div className="flex items-center gap-1.5 justify-center">
              <MapPin size={20} className="text-blue" />
              <p className="text-xl font-bold text-text-dark">U-1 西非付費區廁所</p>
            </div>
            <div className="mt-3 flex items-center justify-center gap-6 text-base text-text-dark">
              <span>垃圾滿桶</span>
              <span>通報時間 10:10</span>
            </div>
          </div>

          <div className="rounded-full bg-yellow px-6 py-2.5">
            <span className="text-lg font-medium text-yellow-text">是否完成該項清潔了呢？</span>
          </div>
        </div>

        <div className="w-full flex gap-3 border-t border-slate-200 p-5">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl border-2 border-primary py-3.5 text-base font-semibold text-primary transition-colors hover:bg-gray-100"
          >
            取消
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 rounded-xl bg-primary py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            完成清潔
          </button>
        </div>
      </div>
    </div>
  );
}
