import { memo } from 'react';
import { LoaderProps, resolveColor, resolveSizeClass } from './types';

export const HashLoader = memo(({
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
  animationDuration = 2,
}: LoaderProps) => {
  if (!visible) return null;

  const c = resolveColor(variant, color);
  const { sizeClass, sizeStyle } = resolveSizeClass(size, height, width);

  const lines = [
    { x1: 18, y1: 5,  x2: 13, y2: 45, delay: 0 },
    { x1: 32, y1: 5,  x2: 27, y2: 45, delay: animationDuration / 4 },
    { x1: 5,  y1: 18, x2: 45, y2: 18, delay: animationDuration / 2 },
    { x1: 5,  y1: 30, x2: 45, y2: 30, delay: (animationDuration * 3) / 4 },
  ];

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={wrapperClass}
      style={wrapperStyle}
    >
      <svg
        className={`${sizeClass} ${className}`}
        style={sizeStyle}
        viewBox="0 0 50 50"
      >
        {lines.map(({ x1, y1, x2, y2, delay }, i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke={c} strokeWidth={strokeWidth} strokeLinecap="round">
            <animate
              attributeName="opacity"
              values="1;0.2;1"
              dur={`${animationDuration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </line>
        ))}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});

HashLoader.displayName = 'HashLoader';
