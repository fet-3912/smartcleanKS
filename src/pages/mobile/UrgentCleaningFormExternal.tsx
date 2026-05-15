import { useState } from 'react';
import MobileHeader from '../../components/mobile/MobileHeader';
import SectionHeader from '../../components/mobile/SectionHeader';
import MobileDropdown from '../../components/mobile/MobileDropdown';
import BottomButtonBar from '../../components/mobile/BottomButtonBar';
import { useNavigate } from 'react-router-dom';
import UrgentCleaningSuccess from './UrgentCleaningSuccess';

export default function UrgentCleaningFormExternal() {
  const navigate = useNavigate();
  const [toiletNo, setToiletNo] = useState('西內 - 西一');
  const [cleaningType, setCleaningType] = useState('');
  const [description, setDescription] = useState('');
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  return (
    <div className="w-full min-h-screen bg-light-blue-bg relative pb-24 md:pb-28">
      <MobileHeader
        variant="public"
        title="緊急清潔服務"
        subtitle="URGENT CLEANING SERVICE"
      />

      <div className="w-full max-w-lg md:max-w-2xl mx-auto px-4 md:px-6 mt-6 md:mt-8 flex flex-col gap-5 md:gap-6">
        {/* Toilet Location */}
        <div className="flex flex-col gap-2">
          <SectionHeader variant="yellow" label="廁所位置" sublabel="Toilet location" />
          <div className="border border-yellow rounded-lg px-4 py-3 md:py-4 bg-white">
            <span className="text-base md:text-lg text-text-dark font-medium">U-1 西非付費區廁所</span>
          </div>
        </div>

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
            <div className="flex items-end gap-1">
              <span className="text-base md:text-lg font-medium text-text-dark">簡述說明</span>
              <span className="text-sm text-gray-text">Description</span>
            </div>
            <span className="text-sm text-[#ff8e8e]">(非必填 Optional)</span>
          </div>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="請輸入說明..."
            className="w-full border border-gray-border rounded-lg px-4 py-3 text-sm md:text-base text-text-dark resize-none h-28 md:h-32 focus:outline-none focus:ring-2 focus:ring-blue/30"
          />
        </div>
        <BottomButtonBar
          buttons={[
            { label: '取消', variant: 'outline', onClick: () => navigate(-1) },
            { label: '通報', variant: 'filled', onClick: () => setIsSuccessOpen(true) },
          ]}
        />
      </div>

      <UrgentCleaningSuccess
        open={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        message="感謝您的通知，我們將儘速派員處理。"
        highlightMessage="因為有您，清新每一天。"
      />
    </div>
  );
}
