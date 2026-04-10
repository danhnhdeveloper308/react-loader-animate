import { memo } from 'react';
import { LoaderProps, resolveColor, resolveSizeClass } from './types';

export const SpinLoader = memo(({
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
  animationDuration = 0.7,
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
      <div
        className={`${sizeClass} rounded-full ${className}`}
        style={{
          ...sizeStyle,
          border: `${strokeWidth}px solid ${c}`,
          borderTopColor: 'transparent',
          animation: `spin ${animationDuration}s linear infinite`,
        }}
      />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});

SpinLoader.displayName = 'SpinLoader';
