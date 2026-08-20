import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const DOT_SIZES = { sm: 6, md: 10, lg: 14 } as const;

export const DotsLoader = /* @__PURE__ */ memo(({
  size = 'md',
  variant = 'primary',
  color,
  className = '',
  ariaLabel = 'Loading',
  wrapperStyle,
  wrapperClass = '',
  visible = true,
  animationDuration = 1.2,
}: LoaderProps) => {
  if (!visible) return null;

  const c = resolveColor(variant, color);
  const d = DOT_SIZES[size];

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`flex space-x-2 ${wrapperClass}`}
      style={wrapperStyle}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`rounded-full animate-bounce-dot ${className}`}
          style={{
            width: d,
            height: d,
            backgroundColor: c,
            animationDelay: `${(i * animationDuration) / 7.5}s`,
            animationDuration: `${animationDuration}s`,
          }}
        />
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
