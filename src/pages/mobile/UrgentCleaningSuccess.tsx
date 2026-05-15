interface UrgentCleaningSuccessProps {
  open: boolean;
  onClose: () => void;
  message?: string;
  highlightMessage?: string;
}

export default function UrgentCleaningSuccess({
  open,
  onClose,
  message,
  highlightMessage,
}: UrgentCleaningSuccessProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-6">
      <div className="absolute inset-0 bg-slate-900/45" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-[32px] bg-white px-5 py-6 shadow-[0_30px_80px_rgba(15,23,42,0.25)]">
        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#e7f7ff] text-primary">
          <svg viewBox="0 0 95 118" fill="none" className="h-14 w-14">
            <path d="M47.5 0L95 23.6V70.8C95 97 47.5 118 47.5 118S0 97 0 70.8V23.6L47.5 0Z" fill="#E7F7FF" />
            <path d="M47.5 10L85 30V68C85 90 47.5 108 47.5 108S10 90 10 68V30L47.5 10Z" fill="#007FD3" fillOpacity="0.15" />
            <path d="M40 58L46 64L58 52" stroke="#007FD3" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <div className="mt-5 text-center">
          <p className="text-sm font-semibold tracking-[0.24em] text-primary/70">NOTIFICATION COMPLETED</p>
          <h2 className="mt-3 text-2xl font-bold text-text-dark">通報完成</h2>
          {message ? <p className="mt-4 text-lg text-text-dark">{message}</p> : null}
          {highlightMessage ? <p className="mt-2 text-lg text-primary">{highlightMessage}</p> : null}
        </div>

        <div className="mt-10 flex justify-center">
          <button
            onClick={onClose}
            className="min-w-[180px] rounded-xl bg-primary px-8 py-3.5 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
          >
            關閉
          </button>
        </div>
      </div>
    </div>
  );
}
