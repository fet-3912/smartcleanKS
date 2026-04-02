import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileHeader from '../../components/mobile/MobileHeader';
import StationBadge from '../../components/mobile/StationBadge';
import StatusBadge from '../../components/mobile/StatusBadge';
import SectionHeader from '../../components/mobile/SectionHeader';
import MobileDropdown from '../../components/mobile/MobileDropdown';
import BottomButtonBar from '../../components/mobile/BottomButtonBar';
import { ChevronDown } from 'lucide-react';

export default function AddCleaningReport() {
  const navigate = useNavigate();
  const [location, setLocation] = useState('U-1 西非付費區廁所');
  const [toiletNo, setToiletNo] = useState('西內 - 西一');
  const [cleaningType, setCleaningType] = useState('');
  const [description, setDescription] = useState('');

  const now = new Date();
  const timeStr = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}/${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

  return (
    <div className="w-full min-h-screen bg-primary relative pb-24 md:pb-28">
      <MobileHeader variant="staff" title="清潔通報列表" onMenuClick={() => { }} />
      <StationBadge stationName="高雄站" />

      <div className="mt-4 bg-white rounded-t-2xl min-h-[calc(100vh-200px)]">
        <div className="w-full max-w-lg md:max-w-2xl mx-auto px-4 md:px-6 pt-5 md:pt-6 flex flex-col gap-4 md:gap-5">
          <StatusBadge status="new" reportId="AA1234567" />

          {/* Report Time */}
          <div className="flex items-center gap-2">
            <span className="text-base md:text-lg text-text-dark">通報時間 : {timeStr}</span>
          </div>

          {/* Location (Dropdown) */}
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

          {/* Toilet Number */}
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

          {/* Cleaning Type */}
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

          {/* Description */}
          <div className="bg-white rounded-lg p-4 md:p-5 flex flex-col gap-2">
            <div className="flex items-end gap-3">
              <span className="text-base md:text-lg font-medium text-text-dark">簡述說明</span>
              <span className="text-sm text-[#ff8e8e]">(非必填)</span>
            </div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="請輸入說明..."
              className="w-full border border-gray-border rounded-lg px-4 py-3 text-sm md:text-base text-text-dark resize-none h-28 md:h-32 focus:outline-none focus:ring-2 focus:ring-blue/30"
            />
          </div>
        </div>
      </div>

      {/* <BottomButtonBar
        buttons={[
          { label: '取消', variant: 'outline', onClick: () => navigate('/mobile/cleaning-list') },
          { label: '通報', variant: 'filled', onClick: () => navigate('/mobile/cleaning-list') },
        ]}
      /> */}
    </div>
  );
}
