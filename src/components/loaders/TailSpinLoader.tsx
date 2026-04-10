import { memo } from 'react';
import { LoaderProps, resolveColor, resolveSizeClass } from './types';

export const TailSpinLoader = memo(({
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
  strokeWidth = 3,
  animationDuration = 0.9,
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
      <svg
        className={`${sizeClass} ${className}`}
        style={{ ...sizeStyle, animation: `spin ${animationDuration}s linear infinite` }}
        viewBox="0 0 50 50"
      >
        <defs>
          <linearGradient id={`tail-grad-${variant}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor={c} stopOpacity="0" />
            <stop offset="100%" stopColor={c} stopOpacity="1" />
          </linearGradient>
        </defs>
        <circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke={`url(#tail-grad-${variant})`}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray="100 26"
        />
        <circle cx="25" cy="5" r={strokeWidth / 2} fill={c} />
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});

TailSpinLoader.displayName = 'TailSpinLoader';
