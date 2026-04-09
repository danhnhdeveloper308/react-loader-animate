import { memo } from 'react';
import { LoaderProps, LOADER_SIZES } from './types';

export const RingLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => {
  const colors = {
    primary: 'border-primary',
    accent: 'border-accent',
    success: 'border-success',
    warning: 'border-warning',
  };
  return (
    <div className={`${LOADER_SIZES[size]} relative`}>
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`absolute inset-0 rounded-full border-2 ${colors[variant]} opacity-80 animate-pulse-ring`}
          style={{ animationDelay: `${i * 0.4}s` }}
        />
      ))}
    </div>
  );
});
RingLoader.displayName = 'RingLoader';
