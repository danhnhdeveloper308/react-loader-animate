import { memo } from 'react';
import { LoaderProps } from './types';

const SIZE_MAP = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-14 h-14' };

export const HeartbeatLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  const fill = {
    primary: 'fill-primary',
    accent: 'fill-accent',
    success: 'fill-success',
    warning: 'fill-warning',
  };
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={{ display: 'inline-flex', ...wrapperStyle }}>
      <svg className={`${SIZE_MAP[size]} animate-heartbeat`} viewBox="0 0 24 24">
        <path
          className={fill[variant]}
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        />
      </svg>
    </div>
  );
});

HeartbeatLoader.displayName = 'HeartbeatLoader';
