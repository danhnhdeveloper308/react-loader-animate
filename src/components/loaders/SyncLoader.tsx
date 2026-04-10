import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const DOT_SIZES = { sm: 6, md: 10, lg: 14 } as const;

export const SyncLoader = memo(({
  size = 'md',
  variant = 'primary',
  color,
  className = '',
  ariaLabel = 'Loading',
  wrapperStyle,
  wrapperClass = '',
  visible = true,
  animationDuration = 0.6,
}: LoaderProps) => {
  if (!visible) return null;

  const c = resolveColor(variant, color);
  const d = DOT_SIZES[size];

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`flex items-center space-x-2 ${wrapperClass}`}
      style={wrapperStyle}
    >
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={`rounded-full ${className}`}
          style={{
            width: d,
            height: d,
            backgroundColor: c,
            animation: `bounce ${animationDuration}s ${i * (animationDuration / 3)}s ease-in-out infinite alternate`,
          }}
        />
      ))}
      <style>{`@keyframes bounce { 0% { transform: translateY(0) } 100% { transform: translateY(-${d * 1.5}px) } }`}</style>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});

SyncLoader.displayName = 'SyncLoader';
