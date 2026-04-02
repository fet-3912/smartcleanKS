import { useState } from 'react';
import { SelectField, TextField, FilterButtons } from '../components/shared/FormFields';
import TableCard from '../components/shared/TableCard';
import type { Column, TableAction } from '../components/shared/TableCard';
import Modal from '../components/shared/Modal';

const columns: Column[] = [
  { key: 'account', label: '帳號' },
  { key: 'name', label: '姓名' },
  { key: 'employeeId', label: '員工編號' },
  { key: 'role', label: '角色' },
  { key: 'lastLogin', label: '最後登入時間' },
  { key: 'createdDate', label: '建立日期' },
  { key: 'lastUpdated', label: '最後更新時間' },
  { key: 'status', label: '狀態' },
];

const actions: TableAction[] = [
  { type: 'edit' },
  { type: 'view' },
  { type: 'delete' },
];

const sampleData = [
  {
    account: 'cat',
    name: 'cat',
    employeeId: 'A123',
    role: '測試角色',
    lastLogin: '2025-01-01 12:00:00',
    createdDate: '2025-01-01',
    lastUpdated: '2025-01-01 12:00:00',
    status: '啟用',
  },
];

const ROLES = ['系統管理員', '值勤人員'];

type ModalMode = 'add' | 'edit' | 'view' | 'delete' | null;

interface AccountForm {
  account: string;
  name: string;
  email: string;
  status: '啟用' | '停用';
  roles: string[];
}

const emptyForm: AccountForm = { account: '', name: '', email: '', status: '啟用', roles: [] };

// --- Form content (reused in add / edit / view) ---
function AccountFormFields({
  form,
  onChange,
  readOnly = false,
}: {
  form: AccountForm;
  onChange?: (f: AccountForm) => void;
  readOnly?: boolean;
}) {
  const inputClass =
    'bg-white border border-primary rounded-[5px] h-[50px] px-4 text-primary text-lg placeholder:text-primary/60 outline-none w-full' +
    (readOnly ? ' opacity-70 cursor-not-allowed' : '');

  return (
    <div className="flex flex-col gap-5">
      {/* 帳號 */}
      <div className="flex flex-col gap-[5px]">
        <label className="text-lg text-black">帳號</label>
        <input
          type="text"
          value={form.account}
          readOnly={readOnly}
          onChange={e => onChange?.({ ...form, account: e.target.value })}
          placeholder="請輸入"
          className={inputClass}
        />
      </div>

      {/* 姓名 */}
      <div className="flex flex-col gap-[5px]">
        <label className="text-lg text-black">姓名</label>
        <input
          type="text"
          value={form.name}
          readOnly={readOnly}
          onChange={e => onChange?.({ ...form, name: e.target.value })}
          placeholder="請輸入"
          className={inputClass}
        />
      </div>

      {/* Email */}
      <div className="flex flex-col gap-[5px]">
        <label className="text-lg text-black">Email</label>
        <input
          type="email"
          value={form.email}
          readOnly={readOnly}
          onChange={e => onChange?.({ ...form, email: e.target.value })}
          placeholder="請輸入"
          className={inputClass}
        />
      </div>

      {/* 狀態 */}
      <div className="flex flex-col gap-[5px]">
        <label className="text-lg text-black">狀態</label>
        <div className="flex items-center gap-6">
          {(['啟用', '停用'] as const).map(opt => (
            <label key={opt} className={'flex items-center gap-2 ' + (readOnly ? 'cursor-not-allowed' : 'cursor-pointer')}>
              <input
                type="radio"
                name="accountStatus"
                disabled={readOnly}
                checked={form.status === opt}
                onChange={() => onChange?.({ ...form, status: opt })}
                className="w-5 h-5 accent-primary"
              />
              <span className="text-lg text-text-dark">{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 角色 */}
      <div className="flex flex-col gap-[5px]">
        <label className="text-lg text-black">角色</label>
        <div className="flex items-center gap-6">
          {ROLES.map(role => (
            <label key={role} className={'flex items-center gap-2 ' + (readOnly ? 'cursor-not-allowed' : 'cursor-pointer')}>
              <input
                type="checkbox"
                disabled={readOnly}
                checked={form.roles.includes(role)}
                onChange={e => {
                  const next = e.target.checked
                    ? [...form.roles, role]
                    : form.roles.filter(r => r !== role);
                  onChange?.({ ...form, roles: next });
                }}
                className="w-5 h-5 accent-primary"
              />
              <span className="text-lg text-text-dark">{role}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AccountPermissions() {
  const [modalMode, setModalMode] = useState<ModalMode>(null);
  const [form, setForm] = useState<AccountForm>(emptyForm);
  const [targetRow, setTargetRow] = useState<Record<string, string | number> | null>(null);

  const openAdd = () => {
    setForm(emptyForm);
    setModalMode('add');
  };

  const openEdit = (row: Record<string, string | number>) => {
    setTargetRow(row);
    setForm({
      account: String(row.account ?? ''),
      name: String(row.name ?? ''),
      email: '',
      status: row.status === '停用' ? '停用' : '啟用',
      roles: [],
    });
    setModalMode('edit');
  };

  const openView = (row: Record<string, string | number>) => {
    setTargetRow(row);
    setForm({
      account: String(row.account ?? ''),
      name: String(row.name ?? ''),
      email: '',
      status: row.status === '停用' ? '停用' : '啟用',
      roles: [],
    });
    setModalMode('view');
  };

  const openDelete = (row: Record<string, string | number>) => {
    setTargetRow(row);
    setModalMode('delete');
  };

  const handleAction = (action: string, row: Record<string, string | number>) => {
    if (action === 'edit') openEdit(row);
    else if (action === 'view') openView(row);
    else if (action === 'delete') openDelete(row);
  };

  const closeModal = () => setModalMode(null);

  const handleConfirm = () => {
    // TODO: call API
    closeModal();
  };

  return (
    <div className="flex-1 px-8 py-8 flex flex-col gap-8">
      {/* Separator */}
      <div className="w-full h-px bg-gray-300" />

      {/* Filter Bar */}
      <div className="flex items-end gap-[10px] flex-wrap">
        <TextField label="帳號" placeholder="請輸入" />
        <TextField label="姓名" placeholder="請輸入" />
        <TextField label="員工編號" placeholder="請輸入" />
        <SelectField label="角色" placeholder="請選擇" options={ROLES} />
        <SelectField label="狀態" placeholder="請選擇" options={['啟用', '停用']} />
        <FilterButtons />
      </div>

      {/* Table */}
      <TableCard
        columns={columns}
        data={sampleData}
        actions={actions}
        toolbar={[{ type: 'add', label: '新增', color: 'blue' }]}
        onToolbarAction={openAdd}
        onAction={handleAction}
      />

      {/* 新增 Modal */}
      <Modal title="新增帳號" open={modalMode === 'add'} onClose={closeModal} onConfirm={handleConfirm}>
        <AccountFormFields form={form} onChange={setForm} />
      </Modal>

      {/* 編輯 Modal */}
      <Modal title="編輯帳號" open={modalMode === 'edit'} onClose={closeModal} onConfirm={handleConfirm}>
        <AccountFormFields form={form} onChange={setForm} />
      </Modal>

      {/* 檢視 Modal */}
      <Modal title="檢視帳號" open={modalMode === 'view'} onClose={closeModal} onConfirm={closeModal}>
        <AccountFormFields form={form} readOnly />
      </Modal>

      {/* 刪除確認 Modal */}
      <Modal title="刪除確認" open={modalMode === 'delete'} onClose={closeModal} onConfirm={handleConfirm}>
        <p className="text-lg text-text-dark">
          確定要刪除帳號「<span className="font-semibold text-primary">{targetRow?.account}</span>」嗎？此操作無法復原。
        </p>
      </Modal>
    </div>
  );
}
