'use client';

import { cn } from '@/lib/cn';

export interface EmojiAvatarProps {
  /** The emoji character to display */
  emoji: string;
  size?: 'sm' | 'md' | 'lg';
  /** A Tailwind background-color class, e.g. "bg-yellow-200" */
  bgColor?: string;
  /** Accessible label; defaults to the emoji itself */
  label?: string;
  className?: string;
}

const sizeClasses = {
  sm: { container: 'h-10 w-10', emoji: 'text-xl' },
  md: { container: 'h-16 w-16', emoji: 'text-3xl' },
  lg: { container: 'h-24 w-24', emoji: 'text-5xl' },
} satisfies Record<NonNullable<EmojiAvatarProps['size']>, { container: string; emoji: string }>;

export function EmojiAvatar({
  emoji,
  size = 'md',
  bgColor = 'bg-primary-100',
  label,
  className,
}: EmojiAvatarProps) {
  const { container, emoji: emojiSize } = sizeClasses[size];
  const ariaLabel = label ?? emoji;

  return (
    <div
      role="img"
      aria-label={ariaLabel}
      className={cn(
        'inline-flex items-center justify-center',
        'rounded-full select-none',
        'shrink-0',
        container,
        bgColor,
        className,
      )}
    >
      <span className={cn('leading-none', emojiSize)} aria-hidden="true">
        {emoji}
      </span>
    </div>
  );
}
