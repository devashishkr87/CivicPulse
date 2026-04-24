import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function Modal({ open, onClose, title, children }: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const titleId = 'modal-title';

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    if (open) {
      el.showModal();
    } else {
      el.close();
    }
  }, [open]);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    el.addEventListener('cancel', handleCancel);
    return () => el.removeEventListener('cancel', handleCancel);
  }, [onClose]);

  return (
    <AnimatePresence>
      {open && (
        <dialog
          ref={dialogRef}
          aria-labelledby={titleId}
          aria-modal="true"
          className="fixed inset-0 z-50 m-auto w-full max-w-lg rounded-2xl border border-white/10 bg-gray-900 p-0 shadow-2xl backdrop:bg-black/60 backdrop:backdrop-blur-sm"
          style={{ maxHeight: '90vh' }}
          onClick={(e) => { if (e.target === dialogRef.current) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-4 p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id={titleId} className="text-lg font-bold text-white">
                {title}
              </h2>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="rounded-lg p-1.5 text-gray-400 hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto">{children}</div>
          </motion.div>
        </dialog>
      )}
    </AnimatePresence>
  );
}
