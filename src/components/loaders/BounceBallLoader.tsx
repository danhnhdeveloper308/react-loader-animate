import { memo } from 'react';
import { LoaderProps, LOADER_BG_VARIANTS } from './types';

const SIZE_MAP = { sm: 'w-8 h-12', md: 'w-12 h-16', lg: 'w-16 h-20' };
const BALL_SIZE = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };

export const BounceBallLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  const bg = LOADER_BG_VARIANTS[variant];
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${SIZE_MAP[size]} relative flex items-end justify-center ${wrapperClass}`}
      style={wrapperStyle}
    >
      <div className={`${BALL_SIZE[size]} ${bg} rounded-full animate-bounce-ball`} />
      {/* Shadow */}
      <div className={`absolute bottom-0 w-6 h-1 ${bg} rounded-full opacity-20 animate-bounce-shadow`} />
    </div>
  );
});

BounceBallLoader.displayName = 'BounceBallLoader';
