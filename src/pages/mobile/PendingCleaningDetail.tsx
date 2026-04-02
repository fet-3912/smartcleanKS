import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import MobileHeader from '../../components/mobile/MobileHeader';
import StationBadge from '../../components/mobile/StationBadge';
import StatusBadge from '../../components/mobile/StatusBadge';
import BottomButtonBar from '../../components/mobile/BottomButtonBar';

export default function PendingCleaningDetail() {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState('請選擇');
  const [notified, setNotified] = useState<'yes' | 'no'>('no');
  const [remark, setRemark] = useState('好多好多');

  return (
    <div className="w-full min-h-screen bg-primary relative pb-24 md:pb-28">
      <MobileHeader variant="staff" title="清潔通報列表" onMenuClick={() => { }} />
      <StationBadge stationName="高雄站" />

      <div className="mt-4 bg-white rounded-t-2xl min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-lg md:max-w-2xl mx-auto px-4 md:px-6 pt-5 md:pt-6 flex flex-col gap-4 md:gap-5">
          <StatusBadge status="pending" reportId="AA1234567" />

          <h2 className="text-xl md:text-2xl font-medium text-text-dark text-center">案件通報處理</h2>

          {/* Read-only fields */}
          <InfoRow label="通報時間" value="2025/01/23 10:45:38" />
          <InfoRow label="通報地點" value="U-1 西非付費區廁所" bold />
          <InfoRow label="廁間編號" value="西內 - 西一" />

          {/* Service type dropdown */}
          <div className="flex items-center gap-3">
            <span className="text-base md:text-lg text-text-dark shrink-0">服務類型 :</span>
            <div className="relative flex-1">
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full appearance-none border border-primary rounded-md px-4 py-3 md:py-3.5 text-base md:text-lg text-primary bg-white pr-10 focus:outline-none focus:ring-2 focus:ring-blue/30"
              >
                <option value="請選擇">請選擇服務</option>
                <option value="設備故障">設備故障</option>
                <option value="廁間再清潔">廁間再清潔</option>
                <option value="補充衛生紙">補充衛生紙</option>
                <option value="其他">其他</option>
              </select>
              <ChevronDown size={18} className="absolute right-3 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
            </div>
          </div>

          {/* Description read-only */}
          <InfoRow label="簡述說明" value="太滿了，要掉出來了。" />

          {/* Radio: notified cleaner */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-base md:text-lg text-text-dark shrink-0">是否已通報清潔人員 :</span>
            <div className="flex gap-8 md:gap-10">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="notified"
                  checked={notified === 'yes'}
                  onChange={() => setNotified('yes')}
                  className="w-5 h-5 md:w-6 md:h-6 accent-primary"
                />
                <span className="text-sm md:text-base text-gray-text">是</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="notified"
                  checked={notified === 'no'}
                  onChange={() => setNotified('no')}
                  className="w-5 h-5 md:w-6 md:h-6 accent-primary"
                />
                <span className="text-sm md:text-base text-gray-text">否</span>
              </label>
            </div>
          </div>

          {/* Remark */}
          <div className="flex flex-col gap-2">
            <span className="text-base md:text-lg text-text-dark">備註說明 :</span>
            <textarea
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-base md:text-lg text-text-dark resize-none h-20 md:h-24 focus:outline-none focus:ring-2 focus:ring-blue/30"
            />
          </div>

          {/* Timestamps */}
          <div className="flex items-start justify-between text-sm md:text-base text-text-dark">
            <div className="flex flex-col gap-0.5">
              <span>派工時間</span>
              <span>2026/03/16 18:25</span>
            </div>
            <div className="flex flex-col gap-0.5 text-right">
              <span>結案時間</span>
              <span>--</span>
            </div>
          </div>
        </div>
      </div>

      {/* <BottomButtonBar
        buttons={[
          { label: '取消', variant: 'outline', onClick: () => navigate('/mobile/cleaning-list') },
          { label: '送出', variant: 'filled', onClick: () => navigate('/mobile/cleaning-list') },
        ]}
      /> */}
    </div>
  );
}

function InfoRow({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="text-base md:text-lg text-text-dark shrink-0">{label} :</span>
      <span className={`text-base md:text-lg text-text-dark ${bold ? 'font-bold' : ''}`}>{value}</span>
    </div>
  );
}
