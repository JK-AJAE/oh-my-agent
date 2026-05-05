'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';
import { useAIStore } from '@/stores/ai-store';
import { useWorldStore } from '@/stores/world-store';
import { getWelcomeMessage } from '@/lib/ai-prompts';
import { SparkBubble } from '@/components/ai/spark-bubble';
import { SuggestionChips } from '@/components/ai/suggestion-chips';
import type { AIMessage } from '@/types/world';
import { nanoid } from 'nanoid';

// ---------------------------------------------------------------------------
// Loading dots animation
// ---------------------------------------------------------------------------

function LoadingDots() {
  return (
    <div
      role="status"
      aria-label="Spark is thinking"
      className="flex justify-start gap-2 px-3 py-2"
    >
      <div className="flex items-center gap-1 px-3 py-2 bg-purple-50 rounded-2xl rounded-tl-sm">
        {[0, 1, 2].map((i) => (
          <motion.span
            key={i}
            className="block w-2 h-2 rounded-full bg-purple-400"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 0.6,
              repeat: Infinity,
              delay: i * 0.15,
              ease: 'easeInOut',
            }}
            aria-hidden="true"
          />
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Quick action button labels
// ---------------------------------------------------------------------------

const QUICK_ACTIONS = ['What if...', 'Tell me more', 'New idea', 'Help me'] as const;

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export interface AICompanionProps {
  /** Controls whether the panel starts open. Defaults to false. */
  defaultOpen?: boolean;
}

export function AICompanion({ defaultOpen = false }: AICompanionProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const [inputValue, setInputValue] = useState('');
  const [hasGreeted, setHasGreeted] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Store selectors
  const messages = useAIStore((s) => s.messages);
  const isLoading = useAIStore((s) => s.isLoading);
  const suggestions = useAIStore((s) => s.suggestions);
  const sendPrompt = useAIStore((s) => s.sendPrompt);
  const addMessage = useAIStore((s) => s.addMessage);

  const objects = useWorldStore((s) => s.objects);
  const environmentTheme = useWorldStore((s) => s.environmentTheme);
  const title = useWorldStore((s) => s.title);

  const worldContext = { objects, environmentTheme, title };

  // Greet the child when the panel first opens
  useEffect(() => {
    if (isOpen && !hasGreeted) {
      setHasGreeted(true);
      const welcomeMsg: AIMessage = {
        id: nanoid(),
        role: 'assistant',
        content: getWelcomeMessage(),
        timestamp: new Date().toISOString(),
        type: 'suggestion',
      };
      addMessage(welcomeMsg);
    }
  }, [isOpen, hasGreeted, addMessage]);

  // Auto-scroll to newest message
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  // Focus input when panel opens
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = useCallback(
    async (text?: string) => {
      const message = (text ?? inputValue).trim();
      if (!message || isLoading) return;
      setInputValue('');
      await sendPrompt(worldContext, message);
    },
    [inputValue, isLoading, sendPrompt, worldContext],
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      void handleSend();
    }
  };

  const handleQuickAction = (label: string) => {
    void handleSend(label);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    void handleSend(suggestion);
  };

  // ---------------------------------------------------------------------------
  // Panel slide animation
  // ---------------------------------------------------------------------------

  const panelVariants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, x: '100%' },
    visible: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 1, x: 0 },
    exit: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, x: '100%' },
  };

  // ---------------------------------------------------------------------------
  // Collapsed floating button
  // ---------------------------------------------------------------------------

  if (!isOpen) {
    return (
      <motion.button
        key="spark-fab"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ duration: 0.2 }}
        onClick={() => setIsOpen(true)}
        aria-label="Open Spark AI companion"
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'w-14 h-14 rounded-full',
          'bg-gradient-to-br from-purple-500 to-sky-400',
          'shadow-lg shadow-purple-300/40',
          'flex items-center justify-center text-2xl',
          'hover:scale-110 active:scale-95',
          'transition-transform duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-2',
          'cursor-pointer',
        )}
        type="button"
      >
        <span aria-hidden="true">✨</span>
      </motion.button>
    );
  }

  // ---------------------------------------------------------------------------
  // Expanded panel
  // ---------------------------------------------------------------------------

  return (
    <AnimatePresence mode="wait">
      <motion.aside
        key="spark-panel"
        role="complementary"
        aria-label="Spark AI companion"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={panelVariants}
        transition={{ type: 'spring', stiffness: 320, damping: 32 }}
        className={cn(
          'fixed bottom-6 right-6 z-50',
          'w-80 max-h-[calc(100vh-3rem)]',
          'flex flex-col',
          'bg-white rounded-3xl shadow-2xl',
          'overflow-hidden',
          'border border-purple-100',
        )}
      >
        {/* ------------------------------------------------------------------ */}
        {/* Header                                                               */}
        {/* ------------------------------------------------------------------ */}
        <div
          className={cn(
            'flex items-center justify-between',
            'px-4 py-3',
            'bg-gradient-to-r from-purple-100 to-sky-100',
            'rounded-t-3xl shrink-0',
          )}
        >
          <div className="flex items-center gap-2">
            <span aria-hidden="true" className="text-xl leading-none">✨</span>
            <h2 className="text-base font-bold text-purple-800">Spark</h2>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            aria-label="Minimize Spark companion"
            className={cn(
              'w-8 h-8 rounded-xl',
              'flex items-center justify-center',
              'bg-white/70 text-purple-700',
              'hover:bg-white hover:text-purple-900',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-1',
              'cursor-pointer',
            )}
            type="button"
          >
            {/* Minimise icon — a horizontal line */}
            <span aria-hidden="true" className="block w-4 h-0.5 bg-current rounded-full" />
          </button>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Message list                                                         */}
        {/* ------------------------------------------------------------------ */}
        <div
          role="log"
          aria-live="polite"
          aria-label="Conversation with Spark"
          className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-3 min-h-0"
        >
          {messages.length === 0 && !isLoading && (
            <p className="text-center text-sm text-gray-400 mt-8">
              Say hello to Spark!
            </p>
          )}

          {messages.map((msg) => (
            <SparkBubble key={msg.id} message={msg} />
          ))}

          {isLoading && <LoadingDots />}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} aria-hidden="true" />
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Suggestion chips                                                     */}
        {/* ------------------------------------------------------------------ */}
        {suggestions.length > 0 && !isLoading && (
          <div className="shrink-0 border-t border-purple-50">
            <SuggestionChips
              suggestions={suggestions}
              onSelect={handleSuggestionSelect}
            />
          </div>
        )}

        {/* ------------------------------------------------------------------ */}
        {/* Quick action pills                                                   */}
        {/* ------------------------------------------------------------------ */}
        <div
          className="shrink-0 flex gap-1.5 flex-wrap px-3 py-2 border-t border-purple-50"
          aria-label="Quick actions"
        >
          {QUICK_ACTIONS.map((label) => (
            <button
              key={label}
              type="button"
              disabled={isLoading}
              onClick={() => handleQuickAction(label)}
              className={cn(
                'rounded-full px-3 py-1 text-xs font-medium',
                'bg-purple-50 text-purple-700',
                'hover:bg-purple-100',
                'disabled:opacity-40 disabled:cursor-not-allowed',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-1',
                'cursor-pointer',
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* Text input                                                           */}
        {/* ------------------------------------------------------------------ */}
        <div
          className={cn(
            'shrink-0 flex items-center gap-2',
            'px-3 pb-3 pt-1',
          )}
        >
          <label htmlFor="spark-input" className="sr-only">
            Ask Spark anything
          </label>
          <input
            ref={inputRef}
            id="spark-input"
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Spark anything..."
            disabled={isLoading}
            autoComplete="off"
            className={cn(
              'flex-1 min-w-0',
              'rounded-full px-4 py-2 text-sm',
              'bg-gray-50 border border-gray-200',
              'placeholder:text-gray-400 text-gray-800',
              'focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent',
              'disabled:opacity-50',
              'transition-shadow duration-150',
            )}
          />
          <button
            type="button"
            disabled={isLoading || inputValue.trim().length === 0}
            onClick={() => void handleSend()}
            aria-label="Send message to Spark"
            className={cn(
              'shrink-0 w-9 h-9 rounded-full',
              'flex items-center justify-center',
              'bg-gradient-to-br from-purple-500 to-sky-400',
              'text-white text-sm',
              'hover:opacity-90 active:scale-95',
              'disabled:opacity-40 disabled:cursor-not-allowed',
              'transition-all duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-1',
              'cursor-pointer',
            )}
          >
            {/* Send arrow */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4"
              aria-hidden="true"
            >
              <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.154.75.75 0 0 0 0-1.115A28.897 28.897 0 0 0 3.105 2.288Z" />
            </svg>
          </button>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
}
