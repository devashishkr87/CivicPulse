import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type ToastType = 'error' | 'success' | 'info';

interface ToastItem {
  id: number;
  message: string;
  type: ToastType;
}

let toastListeners: Array<(t: ToastItem) => void> = [];
let nextId = 1;

export function showToast(message: string, type: ToastType = 'error') {
  const item: ToastItem = { id: nextId++, message, type };
  toastListeners.forEach((fn) => fn(item));
}

const typeStyles: Record<ToastType, string> = {
  error:   'border-red-500/40 bg-red-500/10 text-red-300',
  success: 'border-green-500/40 bg-green-500/10 text-green-300',
  info:    'border-blue-500/40 bg-blue-500/10 text-blue-300',
};

export function ToastContainer() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const addToast = useCallback((t: ToastItem) => {
    setToasts((prev) => [...prev, t]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((x) => x.id !== t.id));
    }, 4000);
  }, []);

  useEffect(() => {
    toastListeners.push(addToast);
    return () => {
      toastListeners = toastListeners.filter((fn) => fn !== addToast);
    };
  }, [addToast]);

  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[100] flex -translate-x-1/2 flex-col gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`pointer-events-auto rounded-xl border px-4 py-3 text-sm font-medium shadow-lg backdrop-blur-sm ${typeStyles[t.type]}`}
          >
            {t.message}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
