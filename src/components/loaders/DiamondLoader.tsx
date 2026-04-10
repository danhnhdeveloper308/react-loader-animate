import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const DiamondLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} flex items-center justify-center ${wrapperClass}`}
      style={wrapperStyle}
    >
      <div className={`w-3/4 h-3/4 ${LOADER_BG_VARIANTS[variant]} animate-diamond-pulse`} />
    </div>
  );
});

DiamondLoader.displayName = 'DiamondLoader';
