interface Tab {
  key: string;
  label: string;
}

interface TabBarProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (key: string) => void;
}

export default function TabBar({ tabs, activeTab, onTabChange }: TabBarProps) {
  return (
    <div className="flex items-center border-b border-gray-300 pr-5">
      {tabs.map(tab => (
        <button
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          className={`flex-1 h-[60px] flex items-center justify-center px-5 py-2 text-xl cursor-pointer transition-colors ${
            activeTab === tab.key
              ? 'border-b-[7px] border-[#018DEA] rounded-[5px] text-[#018DEA] font-medium'
              : 'text-[#202020]'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
