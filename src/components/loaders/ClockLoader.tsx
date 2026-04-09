import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BORDER_VARIANTS } from './types';

export const ClockLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => {
  const bg = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
  };
  return (
    <div className={`${LOADER_SIZES[size]} relative rounded-full border-2 ${LOADER_BORDER_VARIANTS[variant]}`}>
      {/* Hour hand */}
      <div
        className={`absolute w-[3px] h-[30%] ${bg[variant]} rounded-full animate-spin-slow origin-bottom`}
        style={{ bottom: '50%', left: 'calc(50% - 1.5px)' }}
      />
      {/* Minute hand */}
      <div
        className={`absolute w-[2px] h-[40%] ${bg[variant]} rounded-full origin-bottom`}
        style={{ bottom: '50%', left: 'calc(50% - 1px)', animation: 'spin-slow 0.8s linear infinite' }}
      />
      {/* Center dot */}
      <div className={`absolute w-2 h-2 ${bg[variant]} rounded-full`} style={{ top: 'calc(50% - 4px)', left: 'calc(50% - 4px)' }} />
    </div>
  );
});
ClockLoader.displayName = 'ClockLoader';
