import { useNavigate } from 'react-router-dom';
import MobileHeader from '../../components/mobile/MobileHeader';
import SectionHeader from '../../components/mobile/SectionHeader';
import BottomButtonBar from '../../components/mobile/BottomButtonBar';

export default function UrgentCleaningSuccess() {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-light-blue-bg relative pb-24 md:pb-28">
      <MobileHeader
        variant="public"
        title="緊急清潔服務"
        subtitle="Urgent Cleaning Service"
      />

      <div className="w-full max-w-lg md:max-w-2xl mx-auto px-4 md:px-6 mt-6 md:mt-8 flex flex-col items-center gap-5 md:gap-6">
        <div className="w-full">
          <SectionHeader variant="yellow" label="通報完成" sublabel="Notification completed" />
        </div>

        <div className="border border-yellow rounded-lg bg-white w-full py-10 md:py-14 flex flex-col items-center gap-4">
          <p className="text-lg md:text-xl font-medium text-text-dark text-center">
            感謝您的通知
          </p>
          <p className="text-lg md:text-xl font-medium text-text-dark text-center">
            我們將儘速派員處理
          </p>
        </div>

        <div className="flex flex-col items-center gap-1 mt-2">
          <p className="text-xl md:text-2xl text-primary text-center font-medium">
            因為有您 &middot; 清新每一天
          </p>
          <p className="text-xl md:text-2xl text-primary text-center font-medium">
            高雄車站感謝您
          </p>
        </div>

        <div className="mt-2 bg-yellow rounded-full px-8 py-2.5 md:px-10 md:py-3 flex items-center gap-4">
          <div className="w-2.5 h-2.5 bg-white rounded-sm" />
          <span className="text-xl md:text-2xl font-medium text-white">Thank you</span>
          <div className="w-2.5 h-2.5 bg-white rounded-sm" />
        </div>
      </div>

      {/* <BottomButtonBar
        buttons={[
          { label: '關閉', variant: 'filled', onClick: () => navigate('/mobile/urgent-cleaning') },
        ]}
      /> */}
    </div>
  );
}
