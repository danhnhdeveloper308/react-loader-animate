import { memo } from 'react';
import { LoaderProps } from './types';

export const TypingDotsLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => {
  const fills = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
  };
  const sizes = { sm: 'w-2 h-2', md: 'w-3 h-3', lg: 'w-4 h-4' };
  const gaps = { sm: 'gap-1', md: 'gap-2', lg: 'gap-3' };
  const containers = { sm: 'h-8', md: 'h-12', lg: 'h-16' };

  return (
    <div className={`flex items-center ${gaps[size]} ${containers[size]}`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`${sizes[size]} ${fills[variant]} rounded-full animate-[typing-bounce_1.4s_ease-in-out_infinite]`}
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
});
TypingDotsLoader.displayName = 'TypingDotsLoader';
