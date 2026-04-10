import { memo } from 'react';
import { LoaderProps, LOADER_BG_VARIANTS } from './types';

const SIZE_MAP = { sm: 'w-6 h-6', md: 'w-10 h-10', lg: 'w-14 h-14' };

export const CubeLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  const bg = LOADER_BG_VARIANTS[variant];
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${SIZE_MAP[size]} animate-cube-rotate ${wrapperClass}`}
      style={{ perspective: '120px', ...wrapperStyle }}
    >
      <div
        className={`w-full h-full ${bg} rounded-sm`}
        style={{ animation: 'cube-face 1.2s infinite ease-in-out' }}
      />
    </div>
  );
});

CubeLoader.displayName = 'CubeLoader';
