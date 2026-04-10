import { memo } from 'react';
import { LoaderProps, resolveColor, resolveSizeClass } from './types';

const DEFAULT_COLORS = ['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87'];

export const ColorRingLoader = memo(({
  size = 'md',
  variant = 'primary',
  color,
  colors,
  className = '',
  height,
  width,
  ariaLabel = 'Loading',
  wrapperStyle,
  wrapperClass = '',
  visible = true,
  strokeWidth = 5,
  animationDuration = 2,
}: LoaderProps) => {
  if (!visible) return null;

  const palette = colors && colors.length >= 5 ? colors : DEFAULT_COLORS;
  const fallback = resolveColor(variant, color);
  const resolved = palette.map((c, i) => (c ?? fallback) || DEFAULT_COLORS[i]);
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
        {resolved.slice(0, 5).map((c, i) => (
          <circle
            key={i}
            cx="25"
            cy="25"
            r={22 - i * 4}
            fill="none"
            stroke={c}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={`${(22 - i * 4) * 1.5} ${(22 - i * 4) * 4.8}`}
            strokeDashoffset={i * -10}
          />
        ))}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});

ColorRingLoader.displayName = 'ColorRingLoader';
