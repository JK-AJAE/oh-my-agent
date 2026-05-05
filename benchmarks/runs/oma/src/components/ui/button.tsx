'use client';

import { forwardRef } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { cn } from '@/lib/cn';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  primary: [
    'bg-gradient-to-br from-primary-400 to-primary-700',
    'text-white shadow-md shadow-primary-200',
    'hover:from-primary-500 hover:to-primary-800',
    'active:from-primary-600 active:to-primary-900',
  ].join(' '),
  secondary: [
    'bg-secondary-400 text-white shadow-md shadow-secondary-200',
    'hover:bg-secondary-500',
    'active:bg-secondary-600',
  ].join(' '),
  ghost: [
    'bg-transparent text-foreground',
    'hover:bg-primary-50 hover:text-primary-700',
    'active:bg-primary-100',
  ].join(' '),
  danger: [
    'bg-red-500 text-white shadow-md shadow-red-200',
    'hover:bg-red-600',
    'active:bg-red-700',
  ].join(' '),
};

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm: 'min-h-9 px-4 py-2 text-sm gap-1.5',
  md: 'min-h-11 px-5 py-2.5 text-base gap-2',
  lg: 'min-h-12 px-7 py-3 text-lg gap-2.5',
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      icon,
      isLoading = false,
      className,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const prefersReducedMotion = useReducedMotion();

    return (
      <motion.button
        ref={ref}
        whileTap={
          prefersReducedMotion || disabled || isLoading
            ? undefined
            : { scale: 0.95 }
        }
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
        className={cn(
          // base
          'inline-flex items-center justify-center',
          'rounded-2xl font-bold',
          'select-none cursor-pointer',
          'transition-colors duration-150',
          'focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-300 focus-visible:ring-offset-2',
          // disabled
          'disabled:pointer-events-none disabled:opacity-50',
          // variant & size
          variantClasses[variant],
          sizeClasses[size],
          className,
        )}
        disabled={disabled || isLoading}
        aria-disabled={disabled || isLoading}
        {...(props as React.ComponentProps<typeof motion.button>)}
      >
        {icon && (
          <span className="shrink-0" aria-hidden="true">
            {icon}
          </span>
        )}
        {isLoading ? (
          <span className="flex items-center gap-1.5">
            <span className="sr-only">Loading…</span>
            <span
              className="block h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
              aria-hidden="true"
            />
          </span>
        ) : (
          children
        )}
      </motion.button>
    );
  },
);

Button.displayName = 'Button';

export { Button };
