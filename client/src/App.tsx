import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useJourneyStore } from '@/store/journeyStore';
import { Skeleton } from '@/components/ui/Skeleton';
import { ChatbotFAB } from '@/components/ChatbotFAB';
import { ToastContainer } from '@/components/ui/Toast';

const JourneyPage = lazy(() => import('@/pages/JourneyPage'));

export default function App() {
  const reset = useJourneyStore((s) => s.reset);

  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-8 max-w-xl mx-auto"><Skeleton lines={5} /></div>}>
        <Routes>
          <Route path="/" element={<JourneyPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {/* FAB rendered outside routes so it persists on all pages */}
      <ChatbotFAB />
      <ToastContainer />
      
      {/* Reset footer */}
      <footer className="mt-auto border-t border-white/5 py-8 text-center">
        <button
          onClick={() => {
            reset();
            window.location.href = '/';
          }}
          className="text-xs text-gray-500 hover:text-white transition-colors"
        >
          Reset Journey
        </button>
      </footer>
    </BrowserRouter>
  );
}
