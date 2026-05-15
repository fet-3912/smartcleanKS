import { useState } from 'react';
import { Pencil, Eye, Trash2, Plus, Download, Upload, ChevronsLeft, ChevronLeft, ChevronRight, ChevronsRight, Printer } from 'lucide-react';

export interface Column {
  key: string;
  label: string;
}

export interface TableAction {
  type: 'edit' | 'view' | 'delete';
}

interface ToolbarAction {
  type: 'add' | 'import' | 'export';
  label: string;
  color?: 'blue' | 'green';
}

interface TableCardProps {
  columns: Column[];
  data: Record<string, string | number>[];
  actions?: TableAction[];
  toolbar?: ToolbarAction[];
  onAction?: (action: string, row: Record<string, string | number>) => void;
  onToolbarAction?: (action: string) => void;
}

function Pagination({ totalPages = 6 }: { totalPages?: number }) {
  const [currentPage, setCurrentPage] = useState(1);
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="bg-primary-dark flex items-center justify-end p-[9px] w-full">
      <div className="flex">
        <button onClick={() => setCurrentPage(1)} className="w-[38px] h-[38px] bg-white border border-gray-200 flex items-center justify-center rounded-l cursor-pointer hover:bg-gray-50">
          <ChevronsLeft size={16} className="text-gray-600" />
        </button>
        <button onClick={() => setCurrentPage(p => Math.max(1, p - 1))} className="w-[38px] h-[38px] bg-white border border-gray-200 border-l-0 flex items-center justify-center cursor-pointer hover:bg-gray-50">
          <ChevronLeft size={16} className="text-gray-600" />
        </button>
      </div>
      <div className="flex">
        {pages.map(page => (
          <button key={page} onClick={() => setCurrentPage(page)} className={`w-[38px] h-[38px] border border-gray-200 border-l-0 flex items-center justify-center text-base cursor-pointer ${page === currentPage ? 'bg-gray-100 text-primary font-medium' : 'bg-white text-primary hover:bg-gray-50'}`}>
            {page}
          </button>
        ))}
      </div>
      <div className="flex">
        <button onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} className="w-[38px] h-[38px] bg-white border border-gray-200 border-l-0 flex items-center justify-center cursor-pointer hover:bg-gray-50">
          <ChevronRight size={16} className="text-gray-600" />
        </button>
        <button onClick={() => setCurrentPage(totalPages)} className="w-[38px] h-[38px] bg-white border border-gray-200 border-l-0 flex items-center justify-center rounded-r cursor-pointer hover:bg-gray-50">
          <ChevronsRight size={16} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}

const actionIcons = {
  edit: Pencil,
  view: Eye,
  delete: Trash2,
};

const toolbarIcons = {
  add: Plus,
  import: Download,
  export: Upload,
};

export default function TableCard({ columns, data, actions = [], toolbar = [], onAction, onToolbarAction }: TableCardProps) {
  return (
    <div className="bg-white rounded-[10px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.15)] p-[10px]">
      {toolbar.length > 0 && (
        <div className="flex justify-end px-1.5 py-1.5 mb-1">
          <div className="flex gap-2">
            {toolbar.map(item => {
              const Icon = toolbarIcons[item.type];
              const colorClass = item.color === 'green'
                ? 'border-green text-green bg-green/10'
                : 'border-[#146D99] text-[#146D99] bg-[rgba(67,137,134,0.1)]';
              return (
                <button
                  key={item.type}
                  onClick={() => onToolbarAction?.(item.type)}
                  className={`flex items-center gap-0.5 px-2.5 py-2 rounded border ${colorClass} cursor-pointer text-base`}
                >
                  <Icon size={24} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Table Header */}
      <div className="flex w-full">
        {columns.map(col => (
          <div key={col.key} className="flex-1 h-12 flex items-center px-3 bg-primary border-b border-l border-gray-900 text-text-light font-semibold text-base tracking-wide first:border-l">
            {col.label}
          </div>
        ))}
        {actions.length > 0 && (
          <div className="flex-1 h-12 flex items-center px-3 bg-primary border-b border-l border-gray-900 text-text-light font-semibold text-base">
            操作
          </div>
        )}
      </div>

      {/* Table Body */}
      {data.map((row, rowIndex) => (
        <div key={rowIndex} className={`flex w-full ${rowIndex % 2 === 1 ? 'bg-gray-400' : 'bg-white'}`}>
          {columns.map(col => (
            <div key={col.key} className="flex-1 h-12 flex items-center px-3 border-b border-l border-gray-300 text-base text-text-dark">
              {col.key === 'actions2' ? (
                <div className="flex gap-2">
                  <button title="匯出" className="text-primary hover:text-blue-700" onClick={() => alert('匯出功能')}> <Download size={20} /> </button>
                  <button title="列印" className="text-primary hover:text-blue-700" onClick={() => alert('列印功能')}> <Printer size={20} /> </button>
                </div>
              ) : (
                row[col.key]
              )}
            </div>
          ))}
          {actions.length > 0 && (
            <div className="flex-1 h-12 flex items-center px-3 gap-4 border-b border-l border-r border-gray-300">
              {actions.map(action => {
                const Icon = actionIcons[action.type];
                const colorClass = action.type === 'delete' ? 'text-red-500 hover:text-red-700' : 'text-primary hover:text-primary-dark';
                return (
                  <button key={action.type} onClick={() => onAction?.(action.type, row)} className={`${colorClass} cursor-pointer`}>
                    <Icon size={20} />
                  </button>
                );
              })}
            </div>
          )}
        </div>
      ))}

      <Pagination />
    </div>
  );
}
