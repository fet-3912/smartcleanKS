import { useState } from 'react';
import TabBar from '../components/shared/TabBar';
import TableCard from '../components/shared/TableCard';
import type { Column, TableAction } from '../components/shared/TableCard';
import Modal from '../components/shared/Modal';
import { SelectField, TextField, FilterButtons } from '../components/shared/FormFields';

// --- Tab definitions ---
const tabs = [
  { key: 'station', label: '車站管理' },
  { key: 'qrcode', label: 'QR Code管理' },
  { key: 'cleanType', label: '清潔類型' },
  { key: 'cleaner', label: '清潔人員名單' },
];

// --- Station Management ---
const stationColumns: Column[] = [
  { key: 'id', label: '車站編號' },
  { key: 'name', label: '車站名稱' },
  { key: 'status', label: '車站狀態' },
  { key: 'createdAt', label: '建立時間' },
];

const stationData = [
  { id: 'S01', name: '高雄', status: '啟用', createdAt: '2026/2/3 17:00:00' },
  { id: 'S02', name: '左營', status: '停用', createdAt: '2026/2/3 17:00:00' },
  { id: 'S03', name: '鳳山', status: '停用', createdAt: '2026/2/3 17:00:00' },
];

// --- QR Code Management ---
const qrcodeColumns: Column[] = [
  { key: 'id', label: 'QR Code編號' },
  { key: 'stationName', label: '車站名稱' },
  { key: 'location', label: '廁所位置' },
  { key: 'createdAt', label: '建立時間' },
  { key: 'actions2', label: '匯出/列印' },
];

const qrcodeData = [
  { id: 'QR001', stationName: '高雄', location: '1F 男廁', createdAt: '2026/2/3 17:00:00', actions: '' },
  { id: 'QR002', stationName: '高雄', location: '1F 女廁', createdAt: '2026/2/3 17:00:00', actions: '' },
  { id: 'QR003', stationName: '左營', location: '2F 男廁', createdAt: '2026/2/3 17:00:00', actions: '' },
];

// --- Clean Type Management ---
const cleanTypeColumns: Column[] = [
  { key: 'id', label: '清潔類型編號' },
  { key: 'name', label: '清潔類型名稱' },
  { key: 'status', label: '啟用狀態' },
  { key: 'createdAt', label: '建立時間' },
];

const cleanTypeData = [
  { id: 'C_01', name: '設備故障', status: '啟', createdAt: '2026/2/3 17:00:00' },
  { id: 'C_02', name: '廁間再清潔', status: '啟', createdAt: '2026/2/3 17:00:00' },
  { id: 'C_03', name: '環境髒亂', status: '啟', createdAt: '2026/2/3 17:00:00' },
  { id: 'C_04', name: '備品補充', status: '停', createdAt: '2026/2/3 17:00:00' },
];

// --- Shared table actions ---
const tableActions: TableAction[] = [
  { type: 'edit' },
  { type: 'delete' },
];

const addToolbar = [{ type: 'add' as const, label: '新增', color: 'blue' as const }];


export default function Settings() {
  const [activeTab, setActiveTab] = useState('station');

  // Modal state
  const [stationModalOpen, setStationModalOpen] = useState(false);
  const [qrcodeModalOpen, setQrcodeModalOpen] = useState(false);
  const [cleanTypeModalOpen, setCleanTypeModalOpen] = useState(false);
  const [cleanerModalOpen, setCleanerModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editFormData, setEditFormData] = useState<Record<string, string | number> | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Record<string, string | number> | null>(null);

  // Add Station modal form state
  const [newStationName, setNewStationName] = useState('');
  const [newStationStatus, setNewStationStatus] = useState<'啟用' | '停用'>('啟用');
  // Add Cleaner modal form state
  const [newCleanerName, setNewCleanerName] = useState('');
  const [newCleanerId, setNewCleanerId] = useState('');

  const handleToolbarAction = (action: string) => {
    if (action === 'add') {
      if (activeTab === 'station') {
        setNewStationName('');
        setNewStationStatus('啟用');
        setStationModalOpen(true);
      } else if (activeTab === 'qrcode') {
        setQrcodeModalOpen(true);
      } else if (activeTab === 'cleanType') {
        setCleanTypeModalOpen(true);
      } else if (activeTab === 'cleaner') {
        setNewCleanerName('');
        setNewCleanerId('');
        setCleanerModalOpen(true);
      }
    }
  };

  const handleTableAction = (action: string, row: Record<string, string | number>) => {
    if (action === 'edit') {
      setEditFormData({
        ...row,
        name: String(row.name || ''),
        stationName: String(row.stationName || ''),
        location: String(row.location || ''),
        status: String(row.status || ''),
      });
      setEditModalOpen(true);
    } else if (action === 'delete') {
      setDeleteTarget(row);
      setDeleteModalOpen(true);
    }
  };

  const handleAddStation = () => {
    // Submit new station logic
    setStationModalOpen(false);
  };

  const handleAddQrcode = () => {
    setQrcodeModalOpen(false);
  };


  const handleAddCleanType = () => {
    setCleanTypeModalOpen(false);
  };

  const handleAddCleaner = () => {
    // TODO: 新增清潔人員邏輯
    setCleanerModalOpen(false);
  };

  const handleEditConfirm = () => {
    // TODO: 提交編輯邏輯
    setEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    // TODO: 提交刪除邏輯
    setDeleteModalOpen(false);
  };

  const handleEditChange = (field: string, value: string) => {
    setEditFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex flex-col gap-5 p-5">
      {/* Page title */}
      {/* <h1 className="text-2xl font-semibold text-text-dark">參數設定</h1> */}

      {/* Tab bar */}
      <TabBar tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Tab 1: Station Management */}
      {activeTab === 'station' && (
        <TableCard
          columns={stationColumns}
          data={stationData}
          actions={tableActions}
          toolbar={addToolbar}
          onToolbarAction={handleToolbarAction}
          onAction={handleTableAction}
        />
      )}

      {/* Tab 2: QR Code Management */}
      {activeTab === 'qrcode' && (
        <>
          {/* Filter bar */}
          <div className="bg-white rounded-[10px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.15)] p-5">
            <div className="flex items-end gap-4">
              <SelectField label="車站名稱" placeholder="請選擇" options={['高雄', '左營']} />
              <TextField label="關鍵字" placeholder="請輸入" />
              <FilterButtons />
            </div>
          </div>
          <TableCard
            columns={qrcodeColumns}
            data={qrcodeData}
            actions={tableActions}
            toolbar={addToolbar}
            onToolbarAction={handleToolbarAction}
            onAction={handleTableAction}
          />
        </>
      )}

      {/* Tab 3: Clean Type Management */}
      {activeTab === 'cleanType' && (
        <>
          {/* Filter bar */}
          <div className="bg-white rounded-[10px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.15)] p-5">
            <div className="flex items-end gap-4">
              <SelectField label="啟用狀態" placeholder="請選擇" options={['啟用', '停用']} />
              <TextField label="關鍵字" placeholder="請輸入" />
              <FilterButtons />
            </div>
          </div>

          <TableCard
            columns={cleanTypeColumns}
            data={cleanTypeData}
            actions={tableActions}
            toolbar={addToolbar}
            onToolbarAction={handleToolbarAction}
            onAction={handleTableAction}
          />
        </>
      )}
      {/* tab 4 */}
      {activeTab === 'cleaner' && (
        <>
          <div className="bg-white rounded-[10px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.15)] p-5">
            <div className="flex items-end gap-4">
              <TextField label="關鍵字" placeholder="請輸入" />
              <FilterButtons />
            </div>
          </div>
          <TableCard
            columns={[
              { key: 'name', label: '姓名' },
              { key: 'id', label: '編號' },
              { key: 'createdAt', label: '啟用日期' },
            ]}
            data={[
              { id: 'CL001', name: '王小明', createdAt: '2026/2/3 17:00:00' },
              { id: 'CL002', name: '李美玲', createdAt: '2026/2/3 17:00:00' },
              { id: 'CL003', name: '陳志偉', createdAt: '2026/2/3 17:00:00' },
              { id: 'CL004', name: '林淑芬', createdAt: '2026/2/3 17:00:00' },
              { id: 'CL005', name: '張建國', createdAt: '2026/2/3 17:00:00' },
            ]}
            actions={tableActions}
            toolbar={addToolbar}
            onToolbarAction={handleToolbarAction}
            onAction={handleTableAction}
          />
        </>
      )}

      {/* Add Station Modal */}
      <Modal
        title="新增車站"
        open={stationModalOpen}
        onClose={() => setStationModalOpen(false)}
        onConfirm={handleAddStation}
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-[5px]">
            <label className="text-lg text-black">車站名稱</label>
            <input
              type="text"
              value={newStationName}
              onChange={(e) => setNewStationName(e.target.value)}
              placeholder="請輸入車站名稱"
              className="bg-white border border-primary rounded-[5px] h-[50px] px-4 text-primary text-lg placeholder:text-primary outline-none"
            />
          </div>
          <div className="flex flex-col gap-[5px]">
            <label className="text-lg text-black">車站狀態</label>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="stationStatus"
                  checked={newStationStatus === '啟用'}
                  onChange={() => setNewStationStatus('啟用')}
                  className="w-5 h-5 accent-primary"
                />
                <span className="text-lg text-text-dark">啟用</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="stationStatus"
                  checked={newStationStatus === '停用'}
                  onChange={() => setNewStationStatus('停用')}
                  className="w-5 h-5 accent-primary"
                />
                <span className="text-lg text-text-dark">停用</span>
              </label>
            </div>
          </div>
        </div>
      </Modal>

      {/* Add QR Code Modal */}
      <Modal
        title="新增 QR Code"
        open={qrcodeModalOpen}
        onClose={() => setQrcodeModalOpen(false)}
        onConfirm={handleAddQrcode}
      >
        <div className="flex gap-8">
          {/* Left: form */}
          <div className="flex flex-col gap-5 flex-1">
            <SelectField label="車站名稱" placeholder="請選擇車站" options={['高雄', '左營', '鳳山']} />
            <TextField label="廁所位置" placeholder="請輸入廁所位置" />
            <div>
              <button
                type="button"
                className="h-[50px] px-6 rounded-[5px] bg-primary text-white text-lg font-semibold cursor-pointer hover:opacity-90 transition-opacity"
              >
                產生 QR Code
              </button>
            </div>
          </div>
          {/* Right: QR Code preview */}
          <div className="flex flex-col items-center justify-center shrink-0">
            <img src="/ex-QRCode.png" alt="QR Code 示意圖" className="w-40 h-40 object-contain border border-gray-200 rounded" />
            <span className="text-sm text-gray-500 mt-2">QR Code 示意圖</span>
          </div>
        </div>
      </Modal>

      {/* Add Clean Type Modal */}
      <Modal
        title="新增清潔類型"
        open={cleanTypeModalOpen}
        onClose={() => setCleanTypeModalOpen(false)}
        onConfirm={handleAddCleanType}
      >
        <div className="flex flex-col gap-5">
          <TextField label="清潔類型名稱" placeholder="請輸入清潔類型名稱" />
          <div className="flex flex-col gap-[5px]">
            <label className="text-lg text-black">啟用狀態</label>
            <div className="flex items-center gap-6">
              {(['啟用', '停用'] as const).map(opt => (
                <label key={opt} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="cleanTypeStatus"
                    defaultChecked={opt === '啟用'}
                    className="w-5 h-5 accent-primary"
                  />
                  <span className="text-lg text-text-dark">{opt}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </Modal>

      {/* Add Cleaner Modal */}
      <Modal
        title="新增清潔人員"
        open={cleanerModalOpen}
        onClose={() => setCleanerModalOpen(false)}
        onConfirm={handleAddCleaner}
      >
        <div className="flex flex-col gap-5">
          <TextField
            label="姓名"
            placeholder="請輸入清潔人員姓名"
            value={newCleanerName}
            onChange={setNewCleanerName}
          />
          <TextField
            label="編號"
            placeholder="請輸入編號"
            value={newCleanerId}
            onChange={setNewCleanerId}
          />
        </div>
      </Modal>

      {/* 編輯 Modal */}
      <Modal
        title="編輯資料"
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onConfirm={handleEditConfirm}
      >
        <div className="flex flex-col gap-5">
          {activeTab === 'station' && (
            <>
              <TextField
                label="車站名稱"
                placeholder="請輸入車站名稱"
                value={String(editFormData?.name || '')}
                onChange={(value) => handleEditChange('name', value)}
              />
              <div className="flex flex-col gap-[5px]">
                <label className="text-lg text-black">車站狀態</label>
                <div className="flex items-center gap-6">
                  {(['啟用', '停用'] as const).map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="stationStatus"
                        checked={editFormData?.status === opt}
                        onChange={() => setEditFormData({ ...editFormData, status: opt })}
                        className="w-5 h-5 accent-primary"
                      />
                      <span className="text-lg text-text-dark">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
          {activeTab === 'qrcode' && (
            <>
              <SelectField
                label="車站名稱"
                placeholder="請選擇車站"
                options={['高雄', '左營', '鳳山']}
                value={String(editFormData?.stationName || '')}
                onChange={(value) => handleEditChange('stationName', value)}
              />
              <TextField
                label="廁所位置"
                placeholder="請輸入廁所位置"
                value={String(editFormData?.location || '')}
                onChange={(value) => handleEditChange('location', value)}
              />
            </>
          )}
          {activeTab === 'cleanType' && (
            <>
              <TextField
                label="清潔類型名稱"
                placeholder="請輸入清潔類型名稱"
                value={String(editFormData?.name || '')}
                onChange={(value) => handleEditChange('name', value)}
              />
              <div className="flex flex-col gap-[5px]">
                <label className="text-lg text-black">啟用狀態</label>
                <div className="flex items-center gap-6">
                  {(['啟用', '停用'] as const).map(opt => (
                    <label key={opt} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="cleanTypeStatus"
                        checked={editFormData?.status === opt}
                        onChange={() => setEditFormData({ ...editFormData, status: opt })}
                        className="w-5 h-5 accent-primary"
                      />
                      <span className="text-lg text-text-dark">{opt}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
          {activeTab === 'cleaner' && (
            <>
              <TextField
                label="姓名"
                placeholder="請輸入清潔人員姓名"
                value={String(editFormData?.name || '')}
                onChange={(value) => handleEditChange('name', value)}
              />
              <TextField
                label="編號"
                placeholder="請輸入編號"
                value={String(editFormData?.id || '')}
                onChange={(value) => handleEditChange('id', value)}
              />
            </>
          )}
        </div>
      </Modal>

      {/* 刪除確認 Modal */}
      <Modal
        title="刪除確認"
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDeleteConfirm}
      >
        <p className="text-lg text-text-dark">
          確定要刪除「<span className="font-semibold text-primary">{deleteTarget?.name}</span>」嗎？此操作無法復原。
        </p>
      </Modal>
    </div>
  );
}
