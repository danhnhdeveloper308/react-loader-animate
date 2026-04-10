import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const DOT_SIZES = { sm: 5, md: 8, lg: 11 } as const;

export const MutatingDotsLoader = memo(({
  size = 'md',
  variant = 'primary',
  color,
  colors,
  className = '',
  ariaLabel = 'Loading',
  wrapperStyle,
  wrapperClass = '',
  visible = true,
  animationDuration = 2.3,
}: LoaderProps) => {
  if (!visible) return null;

  const fallback = resolveColor(variant, color);
  const c1 = colors?.[0] ?? fallback;
  const c2 = colors?.[1] ?? fallback;
  const d = DOT_SIZES[size];
  const dur = animationDuration;

  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`relative flex items-center justify-center ${wrapperClass}`}
      style={{ width: d * 6, height: d * 3, ...wrapperStyle }}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          className={`absolute rounded-full ${className}`}
          style={{
            width: d,
            height: d,
            backgroundColor: i === 0 ? c1 : c2,
            animation: `mutate-${i === 0 ? 'a' : 'b'} ${dur}s ease-in-out infinite`,
          }}
        />
      ))}
      <style>{`
        @keyframes mutate-a {
          0%   { transform: scale(1) translateX(-${d * 2}px); }
          25%  { transform: scale(0) translateX(0px); }
          50%  { transform: scale(1) translateX(${d * 2}px); }
          75%  { transform: scale(0) translateX(0px); }
          100% { transform: scale(1) translateX(-${d * 2}px); }
        }
        @keyframes mutate-b {
          0%   { transform: scale(1) translateX(${d * 2}px); }
          25%  { transform: scale(0) translateX(0px); }
          50%  { transform: scale(1) translateX(-${d * 2}px); }
          75%  { transform: scale(0) translateX(0px); }
          100% { transform: scale(1) translateX(${d * 2}px); }
        }
      `}</style>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});

MutatingDotsLoader.displayName = 'MutatingDotsLoader';
