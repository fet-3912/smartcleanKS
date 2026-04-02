import { X } from 'lucide-react';

interface ModalProps {
  title: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, open, onClose, onConfirm, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white rounded-lg border border-gray-200 w-[760px] max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-6">
          <h2 className="text-2xl font-medium text-[#202020] tracking-wide">{title}</h2>
          <button onClick={onClose} className="cursor-pointer text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>
        <div className="h-px bg-gray-200" />
        <div className="p-6 overflow-y-auto flex flex-col gap-5">{children}</div>
        <div className="h-px bg-gray-200" />
        <div className="flex items-center justify-end gap-4 px-6 py-4">
          <button onClick={onClose} className="w-[100px] h-[50px] rounded-[5px] border border-primary bg-white text-primary text-lg font-semibold cursor-pointer">
            取消
          </button>
          <button onClick={onConfirm} className="w-[100px] h-[50px] rounded-[5px] bg-primary text-white text-lg font-semibold cursor-pointer">
            確定
          </button>
        </div>
      </div>
    </div>
  );
}
