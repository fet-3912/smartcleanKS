import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import MobileHeader from '../../components/mobile/MobileHeader';
import StationBadge from '../../components/mobile/StationBadge';
import StatusBadge from '../../components/mobile/StatusBadge';
import BottomButtonBar from '../../components/mobile/BottomButtonBar';
import { useNavigate } from 'react-router-dom';

export default function PendingCleaningDetail() {
  const navigate = useNavigate();
  const [serviceType, setServiceType] = useState('補充衛生紙');
  const [cleaner, setCleaner] = useState('請選擇');
  const [remark, setRemark] = useState('');

  return (
    <div className="w-full flex flex-col gap-8 pb-4">
      <MobileHeader variant="staff" title="清潔通報列表" onMenuClick={() => { }} />
      <div className="w-full max-w-6xl mx-auto">
        <StationBadge stationName="高雄站" />
      </div>

      <div className="w-full max-w-6xl mx-auto grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)] flex flex-col gap-6">
          <StatusBadge status="pending" reportId="AA1234567" />

          <h2 className="text-2xl font-bold text-text-dark">案件通報處理</h2>

          <div className="rounded-[24px] border border-[#e7edf3] bg-[#fbfdff] px-6 py-3">
            <InfoRow label="通報時間" value="2025/01/23 10:45:38" />
            <InfoRow label="通報地點" value="U-1 西非付費區廁所" bold />
            <InfoRow label="廁間編號" value="西內 - 西一" last />
          </div>

          <FieldBlock label="清潔類型">
            <div className="relative">
              <select
                value={serviceType}
                onChange={(e) => setServiceType(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-primary/30 bg-white px-5 py-4 text-base text-primary pr-11 focus:outline-none focus:ring-2 focus:ring-blue/30"
              >
                <option value="請選擇">請選擇服務</option>
                <option value="設備故障">設備故障</option>
                <option value="廁間再清潔">廁間再清潔</option>
                <option value="補充衛生紙">補充衛生紙</option>
                <option value="其他">其他</option>
              </select>
              <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
            </div>
          </FieldBlock>

          <div className="rounded-[24px] bg-[#f7fbfe] px-6 py-5 text-base text-text-dark">
            <span className="font-semibold text-primary">簡述說明</span>
            <p className="mt-2 text-gray-text">未填寫</p>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#dbeaf5] bg-[#f7fbfe] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.04)]">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary/70">ASSIGNMENT</p>
            <h3 className="mt-2 text-2xl font-bold text-text-dark">派工與備註</h3>
          </div>

          <div className="mt-6 flex flex-col gap-5">
            <FieldBlock label="清潔人員">
              <div className="relative">
                <select
                  value={cleaner}
                  onChange={(e) => setCleaner(e.target.value)}
                  className="w-full appearance-none rounded-2xl border border-primary/30 bg-white px-5 py-4 text-base text-primary pr-11 focus:outline-none focus:ring-2 focus:ring-blue/30"
                >
                  <option value="請選擇">請選擇清潔人員</option>
                  <option value="王小明">王小明</option>
                  <option value="李美玲">李美玲</option>
                  <option value="陳志偉">陳志偉</option>
                  <option value="林淑芬">林淑芬</option>
                  <option value="張建國">張建國</option>
                </select>
                <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-primary pointer-events-none" />
              </div>
            </FieldBlock>

            <FieldBlock label="備註說明">
              <textarea
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                className="h-48 w-full resize-none rounded-2xl border border-gray-300 bg-white px-4 py-4 text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-blue/30"
              />
            </FieldBlock>

            <div className="rounded-[24px] bg-white px-6 py-5 shadow-sm">
              <div className="flex items-start justify-between text-base text-text-dark">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">派工時間</span>
                  <span>2026/03/16 18:25</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="font-semibold">結案時間</span>
                  <span>--</span>
                </div>
              </div>
            </div>

            <BottomButtonBar
              buttons={[
                { label: '取消', variant: 'outline', onClick: () => navigate('/mobile/cleaning-list?tab=pending') },
                { label: '送出', variant: 'filled', onClick: () => navigate('/mobile/cleaning-list?tab=cleaning') },
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}

function FieldBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-base font-semibold text-text-dark">{label}</span>
      {children}
    </div>
  );
}

function InfoRow({ label, value, bold, last }: { label: string; value: string; bold?: boolean; last?: boolean }) {
  return (
    <div className={`grid grid-cols-[140px,1fr] items-start gap-4 py-4 ${last ? '' : 'border-b border-slate-200'}`}>
      <span className="text-base font-semibold text-text-dark">{label}</span>
      <span className={`text-base text-text-dark ${bold ? 'font-bold' : ''}`}>{value}</span>
    </div>
  );
}
