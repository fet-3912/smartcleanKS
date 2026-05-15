import MobileHeader from '../../components/mobile/MobileHeader';
import StationBadge from '../../components/mobile/StationBadge';
import StatusBadge from '../../components/mobile/StatusBadge';
import BottomButtonBar from '../../components/mobile/BottomButtonBar';
import { useNavigate } from 'react-router-dom';

export default function CompletedCleaningDetail() {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col gap-8 pb-4">
      <MobileHeader variant="staff" title="清潔通報列表" onMenuClick={() => { }} />
      <div className="w-full max-w-6xl mx-auto">
        <StationBadge stationName="高雄站" />
      </div>

      <div className="w-full max-w-6xl mx-auto grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)] flex flex-col gap-6">
          <StatusBadge status="completed" reportId="AA1234573" />

          <h2 className="text-2xl font-bold text-text-dark">案件通報處理</h2>

          <div className="rounded-[24px] border border-[#e7edf3] bg-[#fbfdff] px-6 py-3">
            <InfoRow label="通報時間" value="2025/01/23 07:00:00" />
            <InfoRow label="通報地點" value="U-1 西非付費區廁所" bold />
            <InfoRow label="廁間編號" value="西內 - 西一" last />
          </div>

          <FieldBlock label="清潔類型">
            <div className="rounded-2xl border border-slate-200 bg-[#f7fbfe] px-5 py-4 text-base text-text-dark">
              補充衛生紙
            </div>
          </FieldBlock>

          <div className="rounded-[24px] bg-[#f7fbfe] px-6 py-5 text-base text-text-dark">
            <span className="font-semibold text-primary">簡述說明</span>
            <p className="mt-2 text-gray-text">未填寫</p>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#dbeaf5] bg-[#f7fbfe] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.04)]">
          <div>
            <p className="text-sm font-semibold tracking-[0.2em] text-primary/70">EXECUTION</p>
            <h3 className="mt-2 text-2xl font-bold text-text-dark">清潔執行紀錄</h3>
          </div>

          <div className="mt-6 flex flex-col gap-5">
            <FieldBlock label="清潔人員">
              <div className="rounded-2xl border border-slate-200 bg-white px-5 py-4 text-base text-text-dark">
                王小明
              </div>
            </FieldBlock>

            <FieldBlock label="備註說明">
              <div className="h-48 w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-base text-gray-text">
                未填寫
              </div>
            </FieldBlock>

            <div className="rounded-[24px] bg-white px-6 py-5 shadow-sm">
              <div className="flex items-start justify-between text-base text-text-dark">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold">派工時間</span>
                  <span>2026/03/16 07:05</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="font-semibold">結案時間</span>
                  <span>2026/03/16 07:30</span>
                </div>
              </div>
            </div>

            <BottomButtonBar
              buttons={[
                { label: '返回', variant: 'outline', onClick: () => navigate('/mobile/cleaning-list?tab=completed') },
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
