'use client';

import { forwardRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';

// ---------------------------------------------------------------------------
// ToolbarButton
// ---------------------------------------------------------------------------

export interface ToolbarButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  isActive?: boolean;
  tooltip?: string;
}

const ToolbarButton = forwardRef<HTMLButtonElement, ToolbarButtonProps>(
  ({ icon, label, isActive = false, tooltip, className, ...props }, ref) => {
    const prefersReducedMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        whileTap={prefersReducedMotion || props.disabled ? undefined : { scale: 0.9 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        title={tooltip ?? label}
        aria-label={tooltip ?? label}
        aria-pressed={isActive}
        className={cn(
          'relative inline-flex flex-col items-center justify-center',
          // 48px touch target
          'min-h-12 min-w-12 px-3 py-2 gap-1',
          'rounded-xl',
          'font-semibold text-xs',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-1',
          'disabled:pointer-events-none disabled:opacity-40',
          isActive
            ? 'bg-primary-100 text-primary-700'
            : 'text-foreground hover:bg-primary-50 hover:text-primary-700 active:bg-primary-100',
          className,
        )}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        <span className="h-6 w-6 flex items-center justify-center" aria-hidden="true">
          {icon}
        </span>
        {label && <span className="leading-none">{label}</span>}
      </motion.button>
    );
  },
);

ToolbarButton.displayName = 'ToolbarButton';

// ---------------------------------------------------------------------------
// Toolbar
// ---------------------------------------------------------------------------

export interface ToolbarProps extends React.HTMLAttributes<HTMLDivElement> {
  position?: 'top' | 'bottom';
  children: React.ReactNode;
  /** If true, toolbar is not fixed — useful for embedding in layouts */
  inline?: boolean;
}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(
  (
    { position = 'bottom', inline = false, className, children, ...props },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="toolbar"
        aria-orientation="horizontal"
        className={cn(
          'flex flex-row items-center gap-2 p-2',
          'rounded-full',
          'bg-white/90 backdrop-blur-md',
          'shadow-xl',
          'border border-white/60',
          !inline && [
            'fixed z-50 left-1/2 -translate-x-1/2',
            position === 'bottom' ? 'bottom-6' : 'top-6',
          ],
          className,
        )}
        {...props}
      >
        {children}
      </div>
    );
  },
);

Toolbar.displayName = 'Toolbar';

export { Toolbar, ToolbarButton };
