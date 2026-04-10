import { memo } from 'react';
import { LoaderProps, resolveColor, resolveSizeClass } from './types';

export const BallTriangleLoader = memo(({
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
  animationDuration = 2,
}: LoaderProps) => {
  if (!visible) return null;

  const c = resolveColor(variant, color);
  const { sizeClass, sizeStyle } = resolveSizeClass(size, height, width);
  const r = 4;

  const balls = [
    { cx: 25, cy: 8,  delay: 0 },
    { cx: 10, cy: 38, delay: animationDuration / 3 },
    { cx: 40, cy: 38, delay: (animationDuration / 3) * 2 },
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
        {balls.map(({ cx, cy, delay }, i) => (
          <circle key={i} cx={cx} cy={cy} r={r} fill={c}>
            <animate
              attributeName="opacity"
              values="1;0.3;1"
              dur={`${animationDuration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values={`${r};${r * 0.7};${r}`}
              dur={`${animationDuration}s`}
              begin={`${delay}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
        <line x1="25" y1="8"  x2="10" y2="38" stroke={c} strokeWidth="1.5" strokeOpacity="0.3" />
        <line x1="25" y1="8"  x2="40" y2="38" stroke={c} strokeWidth="1.5" strokeOpacity="0.3" />
        <line x1="10" y1="38" x2="40" y2="38" stroke={c} strokeWidth="1.5" strokeOpacity="0.3" />
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});

BallTriangleLoader.displayName = 'BallTriangleLoader';
