import { memo } from 'react';
import { LoaderProps } from './types';

const SIZE_MAP = { sm: 'w-10 h-5', md: 'w-16 h-8', lg: 'w-20 h-10' };

export const InfinityLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  const stroke = {
    primary: 'stroke-primary',
    accent: 'stroke-accent',
    success: 'stroke-success',
    warning: 'stroke-warning',
  };
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={{ display: 'inline-flex', ...wrapperStyle }}>
      <svg className={`${SIZE_MAP[size]}`} viewBox="0 0 100 50">
        <path
          className={`${stroke[variant]} fill-none animate-infinity-draw`}
          strokeWidth="4"
          strokeLinecap="round"
          d="M25,25 C25,10 10,10 10,25 C10,40 25,40 25,25 C25,10 40,10 50,25 C60,40 75,40 75,25 C75,10 90,10 90,25 C90,40 75,40 75,25 C75,10 60,10 50,25 C40,40 25,40 25,25"
          style={{ strokeDasharray: 300, strokeDashoffset: 0 }}
        />
      </svg>
    </div>
  );
});

InfinityLoader.displayName = 'InfinityLoader';
