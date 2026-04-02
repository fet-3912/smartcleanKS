import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronUp, ScrollText } from 'lucide-react';

interface NavItem {
  label: string;
  path?: string;
  children?: { label: string; path: string }[];
}

const navItems: NavItem[] = [
  // { label: '智慧清潔', children: [{ label: '清潔列表', path: '/cleaning-list' }] },
  {
    label: '智慧清潔', children: [
      { label: '清潔通報列表', path: '/mobile/urgent-cleaning' },
      { label: '清潔通報成功', path: '/mobile/urgent-cleaning/success' },
      { label: '清潔報表列表', path: '/mobile/cleaning-list' },
      { label: '新增清潔報表', path: '/mobile/cleaning-list/add' },
      { label: '待清潔案件', path: '/mobile/cleaning-list/pending' },
      { label: '清潔中案件', path: '/mobile/cleaning-list/in-progress' },
      { label: '已完成案件', path: '/mobile/cleaning-list/complete' }
    ]
  },
  { label: '清潔列表', path: '/cleaning-list' },
  { label: '報表中心', path: '/reports' },
  { label: '參數設定', path: '/settings' },
  { label: '帳號權限', path: '/accounts' },
  { label: '連線狀態查詢', path: '/connection-status' },
];

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ '智慧清潔': true });

  const isActive = (path: string) => location.pathname === path;

  const handleClick = (item: NavItem) => {
    if (item.children) {
      setExpanded(prev => ({ ...prev, [item.label]: !prev[item.label] }));
    } else if (item.path) {
      navigate(item.path);
    }
  };

  return (
    <aside className="w-[250px] min-h-screen bg-gray-50/40 flex flex-col items-center pt-4 pb-12 shrink-0">
      <div className="mb-4 px-4">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            <span className="text-white font-bold text-sm">TR</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-text-dark leading-tight">臺鐵公司</p>
            <p className="text-xs text-gray-500 leading-tight">Taiwan Railway</p>
          </div>
        </div>
      </div>

      <div className="w-full h-px bg-gray-300 opacity-30 mb-4" />

      <nav className="w-full flex flex-col gap-5 px-0">
        {navItems.map(item => {
          const itemActive = item.path ? isActive(item.path) : item.children?.some(c => isActive(c.path));
          return (
            <div key={item.label}>
              <button
                onClick={() => handleClick(item)}
                className={`w-[225px] mx-auto flex items-center gap-3 px-4 py-3 rounded hover:bg-gray-100 transition-colors cursor-pointer ${itemActive && !item.children ? 'text-primary' : ''
                  }`}
              >
                <ScrollText size={16} className={itemActive ? 'text-primary' : 'text-text-dark'} />
                <span className={`text-xl font-semibold tracking-tight flex-1 text-left ${itemActive ? 'text-primary' : 'text-text-dark'}`}>
                  {item.label}
                </span>
                {/* {item.children ? (
                  expanded[item.label] ? <ChevronUp size={15} /> : <ChevronDown size={20} />
                ) : (
                  <ChevronDown size={20} />
                )} */}
                {item.children ? (
                  expanded[item.label] ? <ChevronUp size={15} /> : <ChevronDown size={20} />
                ) : (
                  <ChevronDown size={20} />
                )}
              </button>

              {item.children && expanded[item.label] && (
                <div className="mt-1">
                  {item.children.map(child => (
                    <button
                      key={child.label}
                      onClick={() => navigate(child.path)}
                      className={`w-[225px] mx-auto flex items-center gap-3 px-6 py-2 rounded cursor-pointer transition-colors ${isActive(child.path) ? 'text-primary' : 'text-text-dark hover:bg-gray-100'
                        }`}
                    >
                      <ScrollText size={5} className={isActive(child.path) ? 'text-primary' : 'text-text-dark'} />
                      <span className="text-xl font-semibold tracking-tight" style={{ fontSize: '1rem' }}>{child.label}</span>
                      {/* <ChevronDown size={20} className="ml-auto" /> */}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
