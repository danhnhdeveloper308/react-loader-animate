import { memo } from 'react';
import { LoaderProps, LOADER_SIZES } from './types';

export const HourglassLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  const fills = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
  };
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} relative animate-[hourglass-flip_2s_ease-in-out_infinite] ${wrapperClass}`}
      style={wrapperStyle}
    >
      {/* Top triangle */}
      <div
        className={`absolute top-0 left-1/2 -translate-x-1/2 w-0 h-0`}
        style={{
          borderLeft: '16px solid transparent',
          borderRight: '16px solid transparent',
          borderTop: '20px solid currentColor',
        }}
      />
      {/* Sand falling */}
      <div className={`absolute top-[45%] left-1/2 -translate-x-1/2 w-[2px] h-[10%] ${fills[variant]} animate-[sand-fall_2s_ease-in-out_infinite]`} />
      {/* Bottom triangle */}
      <div
        className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0`}
        style={{
          borderLeft: '16px solid transparent',
          borderRight: '16px solid transparent',
          borderBottom: '20px solid currentColor',
        }}
      />
      {/* Frame */}
      <div className={`absolute top-0 left-[10%] right-[10%] h-[3px] ${fills[variant]} rounded-full`} />
      <div className={`absolute bottom-0 left-[10%] right-[10%] h-[3px] ${fills[variant]} rounded-full`} />
    </div>
  );
});

HourglassLoader.displayName = 'HourglassLoader';
