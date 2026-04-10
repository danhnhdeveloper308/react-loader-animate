import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const BAR_SIZES = { sm: { w: 4, h: 16 }, md: { w: 6, h: 24 }, lg: { w: 8, h: 32 } } as const;

export const WaveLoader = memo(({
  size = 'md',
  variant = 'primary',
  color,
  className = '',
  ariaLabel = 'Loading',
  wrapperStyle,
  wrapperClass = '',
  visible = true,
  animationDuration = 1,
}: LoaderProps) => {
  if (!visible) return null;

  const c = resolveColor(variant, color);
  const { w, h } = BAR_SIZES[size];

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`flex items-end space-x-1 ${wrapperClass}`}
      style={wrapperStyle}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className={`rounded-sm animate-wave ${className}`}
          style={{
            width: w,
            height: h,
            backgroundColor: c,
            animationDelay: `${i * (animationDuration / 10)}s`,
            animationDuration: `${animationDuration}s`,
          }}
        />
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});

WaveLoader.displayName = 'WaveLoader';
