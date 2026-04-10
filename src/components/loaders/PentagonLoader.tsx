import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

const PENTAGON_CLIP = 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)';

export const PentagonLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} relative animate-spin ${wrapperClass}`}
      style={wrapperStyle}
    >
      <div className={`w-full h-full ${LOADER_BG_VARIANTS[variant]}`} style={{ clipPath: PENTAGON_CLIP }} />
    </div>
  );
});

PentagonLoader.displayName = 'PentagonLoader';
