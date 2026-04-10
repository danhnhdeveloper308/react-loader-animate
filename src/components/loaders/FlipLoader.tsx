import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const FlipLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} rounded-sm animate-flip ${LOADER_BG_VARIANTS[variant]} ${wrapperClass}`}
      style={wrapperStyle}
    />
  );
});

FlipLoader.displayName = 'FlipLoader';
