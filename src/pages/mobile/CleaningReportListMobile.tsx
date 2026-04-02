import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Pencil, Eye, Plus } from 'lucide-react';
import MobileHeader from '../../components/mobile/MobileHeader';
import StationBadge from '../../components/mobile/StationBadge';

type TabKey = 'pending' | 'cleaning' | 'completed';

const tabs: { key: TabKey; label: string }[] = [
  { key: 'pending', label: '待清潔' },
  { key: 'cleaning', label: '清潔中' },
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
  { id: 'AA1234567', location: 'U-1 西非付費區廁所', type: '垃圾滿桶', time: '10:10', tab: 'cleaning' },
  { id: 'AA1234568', location: 'U-1 東付費區廁所', type: '地板濕滑', time: '12:12', tab: 'cleaning' },
  { id: 'AA1234569', location: 'U-1 南非付費區廁所', type: '馬桶故障', time: '14:33', tab: 'cleaning' },
  { id: 'AA1234570', location: 'U-1 西付費區廁所', type: '洗手台故障', time: '19:29', tab: 'cleaning' },
  { id: 'AA1234571', location: 'U-1 西非付費區廁所', type: '馬桶故障', time: '10:10', tab: 'pending' },
  { id: 'AA1234572', location: 'U-1 東付費區廁所', type: '地板濕滑', time: '12:12', tab: 'pending' },
  { id: 'AA1234573', location: 'U-1 西非付費區廁所', type: '地面濕滑', time: '07:00', tab: 'completed' },
];

export default function CleaningReportListMobile({ showCompleteModal = false }: { showCompleteModal?: boolean }) {
  const [activeTab, setActiveTab] = useState<TabKey>('cleaning');
  const navigate = useNavigate();

  const filteredReports = mockReports.filter((r) => r.tab === activeTab);

  const handleView = (item: ReportItem) => {
    if (item.tab === 'pending') navigate('/mobile/cleaning-list/pending');
    else if (item.tab === 'cleaning') navigate('/mobile/cleaning-list/in-progress');
  };

  return (
    <div className="w-full min-h-screen bg-primary relative">
      <MobileHeader variant="staff" title="清潔通報列表" onMenuClick={() => {}} />
      <StationBadge stationName="高雄站" />

      {/* Content area with white/rounded background */}
      <div className="mt-4 bg-white rounded-t-2xl min-h-[calc(100vh-200px)]">
        {/* Tabs */}
        <div className="w-full max-w-lg md:max-w-2xl mx-auto px-4 md:px-6 pt-5 md:pt-6">
          <div className="flex gap-2 md:gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`flex-1 py-2.5 md:py-3 rounded-full text-base md:text-lg font-medium transition-colors cursor-pointer ${
                  activeTab === tab.key
                    ? 'bg-blue3 text-white'
                    : 'bg-white border-2 border-blue3 text-gray-text'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Report List */}
        <div className="w-full max-w-lg md:max-w-2xl mx-auto px-0 mt-4 flex flex-col gap-4 pb-28">
          {filteredReports.map((item) => (
            <div
              key={item.id}
              className="bg-white px-4 md:px-6 py-4 md:py-5 flex items-center gap-3 md:gap-4 shadow-[0px_5px_20px_rgba(30,30,30,0.03),0px_-5px_20px_rgba(30,30,30,0.03)]"
            >
              <MapPin size={22} className="text-blue shrink-0 md:w-6 md:h-6" />
              <div className="flex-1 min-w-0">
                <p className="text-base md:text-lg font-bold text-text-dark truncate">{item.location}</p>
                <div className="flex items-center justify-between mt-1 pl-1">
                  <span className="text-sm md:text-base text-text-dark">{item.type}</span>
                  <span className="text-xs md:text-sm text-text-dark whitespace-nowrap">通報時間  {item.time}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 md:gap-4 shrink-0">
                <button
                  onClick={() => handleView(item)}
                  className="p-1.5 md:p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  <Pencil size={20} className="text-text-dark md:w-6 md:h-6" />
                </button>
                <button
                  onClick={() => handleView(item)}
                  className="p-1.5 md:p-2 rounded-md hover:bg-gray-100 cursor-pointer"
                >
                  <Eye size={20} className="text-text-dark md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => navigate('/mobile/cleaning-list/add')}
        className="fixed bottom-6 md:bottom-8 right-6 md:right-8 bg-blue3 text-white rounded-full px-5 md:px-6 py-3 md:py-3.5 flex items-center gap-2 shadow-lg active:opacity-90 hover:opacity-90 z-40 cursor-pointer"
      >
        <Plus size={18} className="md:w-5 md:h-5" />
        <span className="text-base md:text-lg font-medium">新增通報</span>
      </button>

      {/* Complete Modal Overlay */}
      {showCompleteModal && <CompleteModal onClose={() => navigate('/mobile/cleaning-list')} />}
    </div>
  );
}

function CompleteModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 md:px-8">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      {/* Modal */}
      <div className="relative bg-white rounded-xl w-full max-w-sm md:max-w-md overflow-hidden flex flex-col items-center">
        <div className="pt-6 md:pt-8 pb-4 md:pb-5 px-6 flex flex-col items-center gap-4">
          <div className="w-20 h-24 md:w-24 md:h-28 flex items-center justify-center">
            <svg viewBox="0 0 95 118" fill="none" className="w-full h-full">
              <path d="M47.5 0L95 23.6V70.8C95 97 47.5 118 47.5 118S0 97 0 70.8V23.6L47.5 0Z" fill="#E7F7FF"/>
              <path d="M47.5 10L85 30V68C85 90 47.5 108 47.5 108S10 90 10 68V30L47.5 10Z" fill="#007FD3" fillOpacity="0.15"/>
              <path d="M40 58L46 64L58 52" stroke="#007FD3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          <div className="text-center">
            <div className="flex items-center gap-1.5 justify-center">
              <MapPin size={20} className="text-blue" />
              <p className="text-base md:text-lg font-bold text-text-dark">U-1 西非付費區廁所</p>
            </div>
            <div className="flex items-center justify-between mt-2 gap-6 pl-7">
              <span className="text-sm md:text-base text-text-dark">垃圾滿桶</span>
              <span className="text-xs md:text-sm text-text-dark">通報時間  10:10</span>
            </div>
          </div>

          <div className="bg-yellow rounded-full px-5 md:px-6 py-2 md:py-2.5">
            <span className="text-base md:text-lg font-medium text-yellow-text">是否完成該項清潔了呢？</span>
          </div>
        </div>

        <div className="w-full flex gap-2 p-3 md:p-4 shadow-[0_-4px_12px_rgba(0,0,0,0.1)]">
          <button
            onClick={onClose}
            className="flex-1 py-3 md:py-4 rounded-lg border-2 border-primary text-primary text-base md:text-lg font-semibold cursor-pointer hover:bg-gray-100"
          >
            取消
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-3 md:py-4 rounded-lg bg-primary text-white text-base md:text-lg font-semibold cursor-pointer hover:bg-primary-dark"
          >
            完成清潔
          </button>
        </div>
      </div>
    </div>
  );
}
