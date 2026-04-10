import { memo } from 'react';
import { LoaderProps, LOADER_SIZES } from './types';

export const RadarLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  const colors = {
    primary: 'border-primary',
    accent: 'border-accent',
    success: 'border-success',
    warning: 'border-warning',
  };
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
      className={`${LOADER_SIZES[size]} relative ${wrapperClass}`}
      style={wrapperStyle}
    >
      {/* Concentric rings */}
      {[100, 70, 40].map((pct, i) => (
        <div
          key={i}
          className={`absolute border ${colors[variant]} rounded-full opacity-30`}
          style={{
            width: `${pct}%`,
            height: `${pct}%`,
            top: `${(100 - pct) / 2}%`,
            left: `${(100 - pct) / 2}%`,
          }}
        />
      ))}
      {/* Sweep line */}
      <div className="absolute inset-0 animate-spin-slow" style={{ animationDuration: '1.5s' }}>
        <div
          className={`absolute top-1/2 left-1/2 h-[2px] origin-left ${fills[variant]}`}
          style={{ width: '50%', transform: 'translateY(-50%)' }}
        />
        {/* Sweep gradient cone */}
        <div
          className={`absolute top-0 left-0 w-full h-full rounded-full`}
          style={{
            background: `conic-gradient(from 0deg, transparent 0deg, transparent 340deg, hsl(var(--${variant === 'primary' ? 'primary' : variant}) / 0.3) 360deg)`,
          }}
        />
      </div>
      {/* Center dot */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[10%] h-[10%] ${fills[variant]} rounded-full`} />
    </div>
  );
});

RadarLoader.displayName = 'RadarLoader';
