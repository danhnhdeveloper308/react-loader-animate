import { memo } from 'react';
import { LoaderProps, LOADER_BG_VARIANTS } from './types';

const DOT_SIZES = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2.5 h-2.5',
  lg: 'w-3.5 h-3.5'
} as const;

export const DotsLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => (
  <div className="flex space-x-2">
    {[0, 1, 2].map((index) => (
      <div
        key={index}
        className={`${DOT_SIZES[size]} rounded-full animate-bounce-dot ${LOADER_BG_VARIANTS[variant]}`}
        style={{ animationDelay: `${index * 0.16}s` }}
      />
    ))}
  </div>
));

DotsLoader.displayName = 'DotsLoader';
