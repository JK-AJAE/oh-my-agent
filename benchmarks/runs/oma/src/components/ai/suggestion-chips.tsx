'use client';

import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';

export interface SuggestionChipsProps {
  suggestions: string[];
  onSelect: (suggestion: string) => void;
}

export function SuggestionChips({ suggestions, onSelect }: SuggestionChipsProps) {
  const prefersReducedMotion = useReducedMotion();

  if (suggestions.length === 0) return null;

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.06,
      },
    },
  };

  const chipVariants = {
    hidden: prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.95 },
    visible: prefersReducedMotion ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 },
  };

  return (
    <motion.div
      role="group"
      aria-label="Suggested prompts"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-wrap gap-2 px-3 py-2"
    >
      {suggestions.map((suggestion, index) => (
        <motion.button
          key={`${suggestion}-${index}`}
          variants={chipVariants}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          onClick={() => onSelect(suggestion)}
          className={cn(
            'rounded-full px-3 py-1.5',
            'bg-gradient-to-r from-purple-100 to-sky-100',
            'text-sm font-medium text-purple-800',
            'border border-purple-200/60',
            'hover:from-purple-200 hover:to-sky-200',
            'active:scale-95',
            'transition-colors duration-150',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 focus-visible:ring-offset-1',
            'cursor-pointer',
          )}
          type="button"
        >
          {suggestion}
        </motion.button>
      ))}
    </motion.div>
  );
}
