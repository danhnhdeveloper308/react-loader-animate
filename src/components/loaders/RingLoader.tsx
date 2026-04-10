import { memo } from 'react';
import { LoaderProps, resolveColor, resolveSizeClass } from './types';

export const RingLoader = memo(({
  size = 'md',
  variant = 'primary',
  color,
  className = '',
  height,
  width,
  ariaLabel = 'Loading',
  wrapperStyle,
  wrapperClass = '',
  visible = true,
  strokeWidth = 2,
  animationDuration = 1.2,
}: LoaderProps) => {
  if (!visible) return null;

  const c = resolveColor(variant, color);
  const { sizeClass, sizeStyle } = resolveSizeClass(size, height, width);

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={wrapperClass}
      style={wrapperStyle}
    >
      <div className={`${sizeClass} relative ${className}`} style={sizeStyle}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-full animate-pulse-ring"
            style={{
              border: `${strokeWidth}px solid ${c}`,
              opacity: 0.8,
              animationDelay: `${i * (animationDuration / 3)}s`,
              animationDuration: `${animationDuration}s`,
            }}
          />
        ))}
      </div>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
RingLoader.displayName = 'RingLoader';
