import { memo } from 'react';
import { LoaderProps, resolveColor, resolveSizeClass } from './types';

export const GradientSpinner = memo(({
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
      className={wrapperClass}
      style={wrapperStyle}
    >
      <div
        className={`${sizeClass} rounded-full ${className}`}
        style={{
          ...sizeStyle,
          background: `conic-gradient(transparent 30%, ${c})`,
          WebkitMask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #fff calc(100% - 3px))',
          mask: 'radial-gradient(farthest-side, transparent calc(100% - 4px), #fff calc(100% - 3px))',
          animation: `spin ${animationDuration}s linear infinite`,
        }}
      />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});

GradientSpinner.displayName = 'GradientSpinner';
