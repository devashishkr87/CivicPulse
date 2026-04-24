import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { postChat } from '@/services/api';
import { showToast } from '@/components/ui/Toast';
import type { ChatMsg } from '@/types';

interface ChatDrawerProps {
  open: boolean;
  onClose: () => void;
}

export function ChatDrawer({ open, onClose }: ChatDrawerProps) {
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: 'assistant',
      content: 'Hi! I am the CivicPulse AI Assistant. How can I help you learn about the election process?',
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open, typing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || typing) return;

    const userMsg: ChatMsg = {
      role: 'user',
      content: input.trim(),
      timestamp: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);

    try {
      // 800ms mandatory wait for typing indicator as per AC
      await new Promise((resolve) => setTimeout(resolve, 800));
      const res = await postChat(userMsg.content, messages);
      
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: res.reply,
          timestamp: new Date().toISOString(),
        },
      ]);
    } catch {
      showToast('Failed to get reply. Please try again.');
    } finally {
      setTyping(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 z-50 flex h-screen w-[min(380px,100vw)] flex-col border-l border-white/10 bg-gray-900 shadow-2xl"
          role="dialog"
          aria-label="Chat assistant"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-4 backdrop-blur-md">
            <h2 className="font-bold text-white">CivicPulse Assistant</h2>
            <button
              onClick={onClose}
              aria-label="Close chat"
              className="rounded-lg p-2 text-gray-400 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === 'user'
                      ? 'bg-primary text-white rounded-br-sm'
                      : 'bg-white/10 text-gray-200 rounded-bl-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex items-center gap-1">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="border-t border-white/10 bg-gray-950 p-4">
            <div className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about voting..."
                className="input-field pr-12"
                aria-label="Type your message"
                disabled={typing}
              />
              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
                className="absolute bottom-1.5 right-1.5 rounded-lg bg-primary p-2 text-white transition-colors hover:bg-primary-dark disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
