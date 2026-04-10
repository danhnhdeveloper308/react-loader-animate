import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const ArrowLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} relative animate-spin ${wrapperClass}`}
      style={wrapperStyle}
    >
      <div
        className={`w-full h-full ${LOADER_BG_VARIANTS[variant]}`}
        style={{ clipPath: 'polygon(50% 0%, 0% 100%, 35% 85%, 65% 85%, 100% 100%)' }}
      />
    </div>
  );
});

ArrowLoader.displayName = 'ArrowLoader';
