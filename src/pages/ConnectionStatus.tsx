import { SelectField, TextField, DateRangeField, FilterButtons } from '../components/shared/FormFields';
import TableCard from '../components/shared/TableCard';
import type { Column } from '../components/shared/TableCard';

const columns: Column[] = [
  { key: 'apiName', label: 'API名稱' },
  { key: 'system', label: '系統' },
  { key: 'executionTime', label: '執行時間' },
  { key: 'httpStatusCode', label: 'HTTP狀態碼' },
  { key: 'status', label: '狀態' },
  { key: 'errorMessage', label: '錯誤訊息' },
];

const sampleData = [
  {
    apiName: '帳號權限',
    system: 'admin',
    executionTime: '2026/2/3 17:00:00',
    httpStatusCode: '200',
    status: '綠燈',
    errorMessage: '123456abcdef',
  },
  {
    apiName: '帳號權限',
    system: 'admin',
    executionTime: '2026/2/3 17:00:00',
    httpStatusCode: '200',
    status: '綠燈',
    errorMessage: '123456abcdef',
  },
];

export default function ConnectionStatus() {
  return (
    <>
      {/* <div className="flex-1 px-8 py-8 flex flex-col gap-8"> */}
      {/* Separator */}
      <div className="w-full h-px bg-gray-300" />

      {/* Filter Bar */}
      <div className="flex items-end gap-[10px] flex-wrap">
        <SelectField label="系統別" placeholder="請選擇" />
        <SelectField label="狀態" placeholder="請選擇" options={['紅燈', '綠燈']} />
        <DateRangeField label="日期區間" />
        <TextField label="關鍵字" placeholder="請輸入" />
        <FilterButtons />
      </div>

      {/* Table */}
      <TableCard
        columns={columns}
        data={sampleData}
        toolbar={[{ type: 'export', label: '匯出', color: 'green' }]}
        onToolbarAction={(action) => {
          console.log(action);
        }}
      />
      {/* </div> */}
    </>
  );
}
