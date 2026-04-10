import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

const PIECES = [
  { x: '-50%', y: '-50%', delay: '0s' },
  { x: '50%', y: '-50%', delay: '0.25s' },
  { x: '-50%', y: '50%', delay: '0.5s' },
  { x: '50%', y: '50%', delay: '0.75s' },
] as const;

export const SquareSplitLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
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
      <div className={`absolute inset-[15%] ${bg} opacity-15`} />
      {PIECES.map((piece, i) => (
        <div
          key={i}
          className={`absolute w-[45%] h-[45%] ${bg} animate-split-out`}
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

SquareSplitLoader.displayName = 'SquareSplitLoader';
