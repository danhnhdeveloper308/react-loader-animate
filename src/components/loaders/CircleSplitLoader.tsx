import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

const PIECES = [
  { x: '0%', y: '-55%', delay: '0s' },
  { x: '55%', y: '0%', delay: '0.4s' },
  { x: '0%', y: '55%', delay: '0.8s' },
  { x: '-55%', y: '0%', delay: '1.2s' },
] as const;

export const CircleSplitLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  const bg = LOADER_BG_VARIANTS[variant];
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} relative ${wrapperClass}`}
      style={wrapperStyle}
    >
      {/* Ghost */}
      <div className={`absolute inset-[10%] ${bg} rounded-full opacity-15`} />
      {PIECES.map((piece, i) => (
        <div
          key={i}
          className={`absolute w-[45%] h-[45%] ${bg} rounded-full animate-split-out`}
          style={{
            top: '50%',
            left: '50%',
            '--split-x': piece.x,
            '--split-y': piece.y,
            animationDelay: piece.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

CircleSplitLoader.displayName = 'CircleSplitLoader';
