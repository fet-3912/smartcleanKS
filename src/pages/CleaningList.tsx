import { SelectField, TextField, DateRangeField, FilterButtons } from '../components/shared/FormFields';
import TableCard from '../components/shared/TableCard';
import Modal from '../components/shared/Modal';
import { useState } from 'react';
import type { Column, TableAction } from '../components/shared/TableCard';
// 日期選擇器
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const columns: Column[] = [
  { key: 'reportDate', label: '通報日期' },
  { key: 'location', label: '廁所位置' },
  { key: 'cleanType', label: '清潔類型' },
  { key: 'status', label: '案件狀態' },
];

const actions: TableAction[] = [
  { type: 'edit' },
  { type: 'view' },
];

const data = [
  { reportDate: '2026/2/3 17:00:00', location: 'U-1 西非付費區廁所', cleanType: '設備故障', status: '待清潔' },
  { reportDate: '2026/2/3 17:00:00', location: 'U-1 西非付費區廁所', cleanType: '廁間再清潔', status: '待清潔' },
  { reportDate: '2026/2/3 17:00:00', location: 'U-1東非付費區無障礙廁所', cleanType: '廁間再清潔', status: '待清潔' },
];

export default function CleaningList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<'edit' | 'view' | null>(null);
  const [modalRow, setModalRow] = useState<Record<string, string | number> | null>(null);

  const handleAction = (action: string, row: Record<string, string | number>) => {
    if (action === 'edit' || action === 'view') {
      setModalType(action);
      setModalRow(row);
      setModalOpen(true);
    }
  };

  const handleClose = () => {
    setModalOpen(false);
    setModalType(null);
    setModalRow(null);
  };

  const handleConfirm = () => {
    // 可在此處理編輯確認
    setModalOpen(false);
    setModalType(null);
    setModalRow(null);
  };

  return (
    <>
      <div className="flex items-end gap-[10px] w-full">
        <DateRangeField label="通報日期區間 :" />
        <SelectField label="廁所位置 :" options={['U-1 西非付費區廁所', 'U-1 西付費區廁所', 'U-1 東非付費區廁所', 'U-1 南非付費區廁所', 'U-1 東付費區廁所', 'U-1 東非付費區無障礙廁所']} />
        <SelectField label="清潔類型 :" options={['設備故障', '廁間再清潔', '補充衛生紙', '其他']} />
        <SelectField label="案件狀態 :" options={['待清潔', '清潔中', '已完成', '已取消']} />
        <TextField label="關鍵字:" />
        <FilterButtons />
      </div>
      <TableCard columns={columns} data={data} actions={actions} onAction={handleAction} />

      <Modal
        title={modalType === 'edit' ? '編輯通報' : '檢視通報'}
        open={modalOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
      >
        {modalRow && (
          <div className="flex flex-col gap-4">
            {modalType === 'view' && (
              <>
                <div>
                  <span className="font-semibold">通報日期：</span>{modalRow.reportDate}
                </div>
                <div>
                  <span className="font-semibold">廁所位置：</span>{modalRow.location}
                </div>
                <div>
                  <span className="font-semibold">清潔類型：</span>{modalRow.cleanType}
                </div>
                <div>
                  <span className="font-semibold">案件狀態：</span>{modalRow.status}
                </div>
              </>
            )}
            {modalType === 'edit' && (
              <>
                <div>
                  {/* <span className="font-semibold">通報日期：</span>
                  <DateRangePicker
                    onChange={(item) => {
                      const startDate = item.selection.startDate;
                      const endDate = item.selection.endDate;
                      // 這裡可以將選擇的日期格式化後存到 modalRow 中
                      setModalRow({
                        ...modalRow,
                        reportDate: `${startDate?.toLocaleDateString()} - ${endDate?.toLocaleDateString()}`,
                      });
                    }}
                    showSelectionPreview={true}
                    moveRangeOnFirstSelection={false}
                    months={1}
                    ranges={[
                      {
                        startDate: new Date(modalRow.reportDate as string),
                        endDate: new Date(modalRow.reportDate as string),
                        key: 'selection',
                      },
                    ]}
                    direction="horizontal"
                  /> */}
                  {/* <DateRangeField label="通報日期" /> */}
                  <TextField
                    label="通報日期"
                    value={modalRow.reportDate as string}
                    onChange={(val) => setModalRow({ ...modalRow, reportDate: val })}
                  />
                </div>
                <div>
                  <span className="font-semibold">廁所位置：</span>
                  <SelectField
                    value={modalRow.location as string}
                    onChange={(val) => setModalRow({ ...modalRow, location: val })}
                    options={['U-1 西非付費區廁所', 'U-1 西付費區廁所', 'U-1 東非付費區廁所', 'U-1 南非付費區廁所', 'U-1 東付費區廁所', 'U-1 東非付費區無障礙廁所']}
                  />
                </div>
                <div>
                  <span className="font-semibold">清潔類型：</span>
                  <SelectField
                    value={modalRow.cleanType as string}
                    onChange={(val) => setModalRow({ ...modalRow, cleanType: val })}
                    options={['設備故障', '廁間再清潔', '補充衛生紙', '其他']}
                  />
                </div>
                <div>
                  <span className="font-semibold">案件狀態：</span>
                  <SelectField
                    value={modalRow.status as string}
                    onChange={(val) => setModalRow({ ...modalRow, status: val })}
                    options={['待清潔', '清潔中', '已完成', '已取消']}
                  />
                </div>
              </>
            )}
            {/* 如果需要，也可以在這裡添加更多欄位的檢視/編輯 */}
          </div>
        )}
      </Modal>
    </>
  );
}
