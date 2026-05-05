'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';
import type { AIMessage } from '@/types/world';

export interface SparkBubbleProps {
  message: AIMessage;
}

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function getPrefix(type: AIMessage['type']): string {
  if (type === 'celebration') return '🎉 '; // party popper
  return '';
}

export function SparkBubble({ message }: SparkBubbleProps) {
  const prefersReducedMotion = useReducedMotion();
  const isAssistant = message.role === 'assistant';

  const variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : { opacity: 0, y: 8 },
    visible: prefersReducedMotion
      ? { opacity: 1 }
      : { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={cn(
        'flex gap-2',
        isAssistant ? 'justify-start' : 'justify-end',
      )}
    >
      {/* Spark avatar — only for assistant messages */}
      {isAssistant && (
        <div
          aria-hidden="true"
          className="shrink-0 w-7 h-7 rounded-full bg-purple-100 flex items-center justify-center text-base leading-none mt-1"
        >
          ✨
        </div>
      )}

      <div
        className={cn(
          'flex flex-col gap-1',
          isAssistant ? 'items-start' : 'items-end',
        )}
      >
        <div
          className={cn(
            'px-3 py-2 rounded-2xl text-sm leading-relaxed',
            isAssistant
              ? 'bg-purple-50 text-purple-900 max-w-[85%] rounded-tl-sm'
              : 'bg-sky-100 text-sky-900 max-w-[85%] rounded-tr-sm self-end',
          )}
        >
          {getPrefix(message.type)}
          {message.content}
        </div>

        <time
          dateTime={message.timestamp}
          className="text-[10px] text-gray-400 px-1"
        >
          {formatTimestamp(message.timestamp)}
        </time>
      </div>
    </motion.div>
  );
}
