import { useState } from 'react';
import MobileHeader from '../../components/mobile/MobileHeader';
import StationBadge from '../../components/mobile/StationBadge';
import StatusBadge from '../../components/mobile/StatusBadge';
import MobileDropdown from '../../components/mobile/MobileDropdown';
import BottomButtonBar from '../../components/mobile/BottomButtonBar';
import { useNavigate } from 'react-router-dom';

export default function AddCleaningReport() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('U-1 西非付費區廁所');
  const [toiletNo, setToiletNo] = useState('西內 - 西一');
  const [cleaningType, setCleaningType] = useState('');
  const [description, setDescription] = useState('');

  const now = new Date();
  const timeStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  return (
    <div className="w-full flex flex-col gap-8 pb-4">
      <MobileHeader variant="staff" title="清潔通報列表" onMenuClick={() => { }} />
      <div className="w-full max-w-6xl mx-auto">
        <StationBadge stationName="高雄站" />
      </div>

      <div className="w-full max-w-6xl mx-auto grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <section className="rounded-[28px] border border-slate-200 bg-white p-8 shadow-[0_24px_60px_rgba(15,23,42,0.06)] flex flex-col gap-6">
          <StatusBadge status="new" reportId="AA1234567" />

          <div className="rounded-[24px] bg-[#f7fbfe] px-5 py-4 text-base text-text-dark">
            <span className="font-semibold text-primary">通報時間</span>
            <span className="ml-3">{timeStr}</span>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <MobileDropdown
              headerVariant="yellow"
              label="廁所位置"
              sublabel="Toilet location"
              value={location}
              onChange={setLocation}
              options={[
                { label: 'U-1 西非付費區廁所', value: 'U-1 西非付費區廁所' },
                { label: 'U-1 西付費區廁所', value: 'U-1 西付費區廁所' },
                { label: 'U-1 東非付費區廁所', value: 'U-1 東非付費區廁所' },
                { label: 'U-1 南非付費區廁所', value: 'U-1 南非付費區廁所' },
                { label: 'U-1 東付費區廁所', value: 'U-1 東付費區廁所' },
                { label: 'U-1 東非付費區無障礙廁所', value: 'U-1 東非付費區無障礙廁所' },
              ]}
            />

            <MobileDropdown
              headerVariant="blue"
              label="廁間編號"
              sublabel="Toilet No."
              value={toiletNo}
              onChange={setToiletNo}
              options={[
                { label: '西內 - 西一', value: '西內 - 西一' },
                { label: '西內 - 西二', value: '西內 - 西二' },
                { label: '西內 - 西三', value: '西內 - 西三' },
              ]}
            />

            <div className="md:col-span-2">
              <MobileDropdown
                headerVariant="blue"
                label="清潔類型"
                sublabel="Cleaning type"
                value={cleaningType}
                onChange={setCleaningType}
                placeholder="請選擇服務"
                options={[
                  { label: '設備故障', value: '設備故障' },
                  { label: '廁間再清潔', value: '廁間再清潔' },
                  { label: '補充衛生紙', value: '補充衛生紙' },
                  { label: '其他', value: '其他' },
                ]}
              />
            </div>
          </div>
        </section>

        <section className="rounded-[28px] border border-[#dbeaf5] bg-[#f7fbfe] p-8 shadow-[0_24px_60px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold tracking-[0.2em] text-primary/70">REPORT DETAIL</p>
              <h2 className="mt-2 text-2xl font-bold text-text-dark">補充通報內容</h2>
            </div>
            <div className="rounded-full bg-white px-4 py-2 text-sm font-medium text-primary shadow-sm">Desktop</div>
          </div>

          <div className="mt-6 rounded-[24px] border border-white bg-white p-5 shadow-sm">
            <div className="flex items-end gap-3">
              <span className="text-lg font-medium text-text-dark">簡述說明</span>
              <span className="text-sm text-[#ff8e8e]">(非必填)</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="請輸入說明..."
              className="mt-4 h-56 w-full resize-none rounded-2xl border border-gray-border px-4 py-4 text-base text-text-dark focus:outline-none focus:ring-2 focus:ring-blue/30"
            />
          </div>

          <div className="mt-6 rounded-[24px] bg-white px-5 py-4 shadow-sm">
            <p className="text-sm font-semibold tracking-[0.18em] text-primary/70">提交流程</p>
            <p className="mt-2 text-base leading-7 text-text-dark">完成開單後，請至「待清潔案件」頁面進行後續處理</p>
          </div>

          <div className="mt-8">
            <BottomButtonBar
              buttons={[
                { label: '取消', variant: 'outline', onClick: () => navigate('/mobile/cleaning-list') },
                { label: '通報', variant: 'filled', onClick: () => navigate('/mobile/cleaning-list?tab=pending') },
              ]}
            />
          </div>
        </section>
      </div>
    </div>
  );
}
