'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '@/lib/cn';

export interface PanelProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  position?: 'left' | 'right';
  children: React.ReactNode;
  className?: string;
  /** Additional class for the panel body */
  bodyClassName?: string;
}

const SLIDE = {
  left: { hidden: { x: '-100%', opacity: 0 }, visible: { x: 0, opacity: 1 } },
  right: { hidden: { x: '100%', opacity: 0 }, visible: { x: 0, opacity: 1 } },
};

export function Panel({
  title,
  isOpen,
  onClose,
  position = 'left',
  children,
  className,
  bodyClassName,
}: PanelProps) {
  const prefersReducedMotion = useReducedMotion();
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Focus the close button when panel opens for keyboard users
  useEffect(() => {
    if (isOpen) {
      // Small delay to allow animation to start before focus
      const timer = setTimeout(() => closeButtonRef.current?.focus(), 50);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const variants = {
    hidden: prefersReducedMotion
      ? { opacity: 0 }
      : SLIDE[position].hidden,
    visible: prefersReducedMotion
      ? { opacity: 1 }
      : SLIDE[position].visible,
    exit: prefersReducedMotion
      ? { opacity: 0 }
      : SLIDE[position].hidden,
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.aside
          role="complementary"
          aria-label={title}
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={variants}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className={cn(
            'flex flex-col',
            'w-72 sm:w-80',
            'bg-white rounded-3xl shadow-2xl',
            'overflow-hidden',
            // Positioning context — callers typically put this inside a
            // fixed/absolute container; we do not force fixed here so the
            // component stays composable.
            className,
          )}
        >
          {/* Header */}
          <div
            className={cn(
              'flex items-center justify-between',
              'px-5 py-4',
              'bg-gradient-to-r from-primary-100 to-secondary-100',
              'rounded-t-3xl',
            )}
          >
            <h2 className="text-lg font-bold text-primary-800 truncate pr-2">
              {title}
            </h2>
            <button
              ref={closeButtonRef}
              onClick={onClose}
              className={cn(
                'shrink-0 flex items-center justify-center',
                'h-9 w-9 rounded-xl',
                'bg-white/70 text-primary-700',
                'hover:bg-white hover:text-primary-900',
                'transition-colors duration-150',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1',
              )}
              aria-label="Close panel"
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>

          {/* Body */}
          <div className={cn('flex-1 overflow-y-auto p-5', bodyClassName)}>
            {children}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
