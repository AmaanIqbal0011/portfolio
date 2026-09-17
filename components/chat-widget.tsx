'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Loader2, Sparkles, Bot, User, Trash2 } from 'lucide-react';
import Markdown from 'react-markdown';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AGENT_API = process.env.NEXT_PUBLIC_AGENT_API_URL || 'http://localhost:8000';

const QUICK_REPLIES = [
  'What are Amaan\'s skills?',
  'Tell me about ContentPilot',
  'How can I contact Amaan?',
  'What tech stack does he use?',
];

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: "Hey! I'm **Manho** — Amaan's AI assistant. Ask me anything about his skills, projects, or how to connect.",
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  const clearChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: "Chat cleared! I'm **Manho** — Amaan's AI assistant. Ask me anything.",
      },
    ]);
  };

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: msg }]);
    setLoading(true);

    try {
      const res = await fetch(`${AGENT_API}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg }),
      });

      if (!res.ok) throw new Error('Agent unavailable');

      const data = await res.json();
      setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            "I'm currently offline. Reach Amaan on **WhatsApp** (+92 329 2030521) or **email** amaaniqbal0011@gmail.com.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Toggle button */}
      <motion.button
        onClick={() => setOpen(!open)}
        className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-br from-brand to-brand/80 text-white shadow-lg shadow-brand/25 hover:shadow-xl hover:shadow-brand/30 hover:scale-105 transition-all duration-300"
        whileTap={{ scale: 0.92 }}
        aria-label={open ? 'Close chat' : 'Open chat'}
      >
        <AnimatePresence mode="wait">
          {open ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-5 h-5" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageCircle className="w-5 h-5" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.92 }}
            transition={{ type: 'spring', damping: 28, stiffness: 340 }}
            className="fixed bottom-20 left-5 right-5 sm:bottom-24 sm:right-6 sm:left-auto z-50 w-auto sm:w-[400px] max-w-[calc(100vw-2.5rem)] rounded-3xl overflow-hidden flex flex-col"
            style={{
              maxHeight: 'min(640px, calc(100vh - 7rem))',
              background: 'color-mix(in srgb, var(--card) 80%, transparent)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid color-mix(in srgb, var(--border) 60%, transparent)',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.15), 0 0 0 1px color-mix(in srgb, var(--border) 40%, transparent)',
            }}
          >
            {/* Header */}
            <div className="relative px-5 py-4 border-b border-border/40">
              <div className="absolute inset-0 bg-gradient-to-r from-brand/5 via-transparent to-brand/5" />
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center justify-center w-10 h-10 rounded-2xl bg-gradient-to-br from-brand to-brand/70 text-white text-sm font-bold shadow-md shadow-brand/20">
                    <Bot className="w-5 h-5" />
                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-card" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold tracking-tight text-foreground">Manho</p>
                    <p className="text-[11px] text-muted-foreground font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block" />
                      Online
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  {messages.length > 1 && (
                    <button
                      onClick={clearChat}
                      className="flex items-center justify-center w-8 h-8 rounded-xl text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                      aria-label="Clear chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                  <button
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center w-8 h-8 rounded-xl text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-5 space-y-4 min-h-0">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25, ease: 'easeOut' }}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2.5 max-w-[82%] min-w-0 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div
                      className={`flex items-center justify-center w-7 h-7 rounded-lg shrink-0 mt-0.5 ${
                        msg.role === 'user'
                          ? 'bg-brand/10 text-brand'
                          : 'bg-muted text-muted-foreground'
                      }`}
                    >
                      {msg.role === 'user' ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                    </div>
                    {/* Bubble */}
                    <div
                      className={`px-4 py-2.5 text-[13px] leading-relaxed min-w-0 max-w-full ${
                        msg.role === 'user'
                          ? 'bg-gradient-to-br from-brand to-brand/90 text-white rounded-2xl rounded-br-md shadow-sm shadow-brand/10'
                          : 'bg-muted/70 text-foreground rounded-2xl rounded-bl-md border border-border/30'
                      }`}
                    >
                      {msg.role === 'assistant' ? (
                        <div className="prose prose-xs prose-neutral dark:prose-invert max-w-none overflow-hidden break-words prose-p:my-1 prose-li:my-0.5 prose-strong:text-inherit prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-headings:my-2 prose-ul:my-1 prose-ol:my-1 prose-li:pl-0">
                          <Markdown>{msg.content}</Markdown>
                        </div>
                      ) : (
                        msg.content
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} className="flex justify-start">
                  <div className="flex items-start gap-2.5">
                    <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-muted text-muted-foreground shrink-0 mt-0.5">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="px-4 py-3 rounded-2xl rounded-bl-md bg-muted/70 border border-border/30">
                      <div className="flex gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 rounded-full bg-brand/40 animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Quick replies — only show on first message */}
              {messages.length === 1 && !loading && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.3 }}
                  className="flex flex-wrap gap-2 pt-1"
                >
                  {QUICK_REPLIES.map((reply) => (
                    <button
                      key={reply}
                      onClick={() => send(reply)}
                      className="px-3 py-1.5 text-[11px] font-medium rounded-full border border-border/50 bg-muted/50 text-muted-foreground hover:bg-brand/10 hover:text-brand hover:border-brand/30 transition-all duration-200"
                    >
                      {reply}
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-border/40">
              <div className="flex items-center gap-2 bg-background/80 border border-border/50 rounded-2xl px-4 py-2 focus-within:border-brand/40 focus-within:ring-2 focus-within:ring-brand/10 transition-all duration-200">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && send()}
                  placeholder="Ask Manho anything..."
                  className="flex-1 bg-transparent px-1 py-1.5 text-[13px] placeholder:text-muted-foreground/40 focus:outline-none"
                />
                <button
                  onClick={() => send()}
                  disabled={!input.trim() || loading}
                  className="flex items-center justify-center w-8 h-8 rounded-xl bg-brand text-white hover:bg-brand/90 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200 shrink-0 shadow-sm shadow-brand/20"
                >
                  {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[9px] text-muted-foreground/30 text-center mt-2 font-medium tracking-wide">
                Powered by <Sparkles className="inline w-2.5 h-2.5" /> Groq &bull; Built by Amaan
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
