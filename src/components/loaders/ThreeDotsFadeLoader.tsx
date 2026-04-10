import { memo } from 'react';
import { LoaderProps, resolveColor, resolveSizeClass } from './types';

export const ThreeDotsFadeLoader = memo(({
  size = 'md',
  variant = 'primary',
  color,
  colors,
  className = '',
  ariaLabel = 'Loading',
  wrapperStyle,
  wrapperClass = '',
  visible = true,
  animationDuration = 1.4,
}: LoaderProps) => {
  if (!visible) return null;

  const fallback = resolveColor(variant, color);
  const palette = colors && colors.length >= 3 ? colors : [fallback, fallback, fallback];
  const { sizeClass, sizeStyle } = resolveSizeClass(size);

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
        viewBox="0 0 80 20"
      >
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={10 + i * 30} cy="10" r="8" fill={palette[i]}>
            <animate
              attributeName="opacity"
              values="1;0.2;1"
              dur={`${animationDuration}s`}
              begin={`${i * (animationDuration / 3)}s`}
              repeatCount="indefinite"
            />
            <animate
              attributeName="r"
              values="8;5;8"
              dur={`${animationDuration}s`}
              begin={`${i * (animationDuration / 3)}s`}
              repeatCount="indefinite"
            />
          </circle>
        ))}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});

ThreeDotsFadeLoader.displayName = 'ThreeDotsFadeLoader';
