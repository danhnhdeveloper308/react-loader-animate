import { memo } from 'react';
import { LoaderProps, resolveColor, resolveSizeClass } from './types';

export const PulseLoader = memo(({
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
  animationDuration = 1,
}: LoaderProps) => {
  if (!visible) return null;

  const c = resolveColor(variant, color);
  const { sizeClass, sizeStyle } = resolveSizeClass(size, height, width);

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`relative ${wrapperClass}`}
      style={wrapperStyle}
    >
      <div
        className={`${sizeClass} rounded-full animate-pulse-ring ${className}`}
        style={{ ...sizeStyle, backgroundColor: c, animationDuration: `${animationDuration}s` }}
      />
      <div
        className={`absolute inset-0 ${sizeClass} rounded-full animate-pulse-ring ${className}`}
        style={{ ...sizeStyle, backgroundColor: c, animationDelay: `${animationDuration / 2}s`, animationDuration: `${animationDuration}s` }}
      />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});

PulseLoader.displayName = 'PulseLoader';
