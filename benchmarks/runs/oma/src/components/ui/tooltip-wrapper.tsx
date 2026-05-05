'use client';

import type { ReactNode } from 'react';
import {
  Provider as TooltipProvider,
  Root as TooltipRoot,
  Trigger as TooltipTrigger,
  Portal as TooltipPortal,
  Content as TooltipContent,
  Arrow as TooltipArrow,
} from '@radix-ui/react-tooltip';
import { cn } from '@/lib/cn';

export interface TooltipWrapperProps {
  /** Text shown inside the tooltip */
  content: string;
  /** Side of the trigger to show the tooltip */
  side?: 'top' | 'right' | 'bottom' | 'left';
  /** Alignment along the trigger axis */
  align?: 'start' | 'center' | 'end';
  /** Delay in ms before tooltip appears */
  delayDuration?: number;
  children: ReactNode;
  className?: string;
}

/**
 * Wraps any child with a Radix UI tooltip.
 *
 * Note: TooltipProvider should wrap your app root. If you are using this
 * in isolation, set `delayDuration` and the Provider is embedded here for
 * convenience. For best performance, hoist <TooltipProvider> to layout.tsx.
 */
export function TooltipWrapper({
  content,
  side = 'top',
  align = 'center',
  delayDuration = 400,
  children,
  className,
}: TooltipWrapperProps) {
  return (
    <TooltipProvider delayDuration={delayDuration}>
      <TooltipRoot>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipPortal>
          <TooltipContent
            side={side}
            align={align}
            sideOffset={6}
            className={cn(
              'z-50 max-w-xs',
              'rounded-xl px-3 py-2',
              'bg-gray-900 text-white text-sm font-medium',
              'shadow-lg',
              // Radix data-state animations
              'data-[state=delayed-open]:animate-in data-[state=delayed-open]:fade-in-0 data-[state=delayed-open]:zoom-in-95',
              'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
              'data-[side=bottom]:slide-in-from-top-2',
              'data-[side=top]:slide-in-from-bottom-2',
              'data-[side=left]:slide-in-from-right-2',
              'data-[side=right]:slide-in-from-left-2',
              className,
            )}
          >
            {content}
            <TooltipArrow className="fill-gray-900" />
          </TooltipContent>
        </TooltipPortal>
      </TooltipRoot>
    </TooltipProvider>
  );
}
