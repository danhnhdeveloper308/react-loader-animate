import { memo } from 'react';
import { LoaderProps, LOADER_SIZES } from './types';

export const AtomLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
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
      {/* Nucleus */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[15%] h-[15%] ${fills[variant]} rounded-full`} />
      {/* Orbits */}
      {[0, 60, 120].map((angle, i) => (
        <div
          key={i}
          className="absolute inset-[5%] animate-spin-slow"
          style={{
            animationDuration: `${1.5 + i * 0.3}s`,
            animationDirection: i % 2 === 0 ? 'normal' : 'reverse',
            transform: `rotate(${angle}deg)`,
          }}
        >
          <div
            className={`w-full h-full border ${colors[variant]} rounded-full opacity-40`}
            style={{ transform: 'rotateX(70deg)' }}
          />
          {/* Electron */}
          <div
            className={`absolute -top-[6%] left-1/2 -translate-x-1/2 w-[12%] h-[12%] ${fills[variant]} rounded-full`}
          />
        </div>
      ))}
    </div>
  );
});

AtomLoader.displayName = 'AtomLoader';
