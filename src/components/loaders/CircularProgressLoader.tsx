import { memo } from 'react';
import { LoaderProps, resolveColor, resolveSizeClass } from './types';

export const CircularProgressLoader = memo(({
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
  strokeWidth = 4,
  animationDuration = 1.5,
}: LoaderProps) => {
  if (!visible) return null;

  const c = resolveColor(variant, color);
  const { sizeClass, sizeStyle } = resolveSizeClass(size, height, width);
  const r = 20;
  const circumference = 2 * Math.PI * r;

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={wrapperClass}
      style={wrapperStyle}
    >
      <svg
        className={`${sizeClass} ${className}`}
        style={{ ...sizeStyle, animation: `spin ${animationDuration}s linear infinite` }}
        viewBox="0 0 50 50"
      >
        <circle
          cx="25"
          cy="25"
          r={r}
          fill="none"
          stroke={c}
          strokeWidth={strokeWidth}
          strokeOpacity="0.2"
        />
        <circle
          cx="25"
          cy="25"
          r={r}
          fill="none"
          stroke={c}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${circumference * 0.75} ${circumference * 0.25}`}
          strokeDashoffset={circumference * 0.25}
        />
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});

CircularProgressLoader.displayName = 'CircularProgressLoader';
