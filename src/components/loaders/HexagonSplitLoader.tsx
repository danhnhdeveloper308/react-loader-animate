import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

const HEXAGON_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

const PIECES = [
  { x: '0%', y: '-60%', delay: '0s' },
  { x: '52%', y: '-30%', delay: '0.3s' },
  { x: '52%', y: '30%', delay: '0.6s' },
  { x: '0%', y: '60%', delay: '0.9s' },
  { x: '-52%', y: '30%', delay: '1.2s' },
  { x: '-52%', y: '-30%', delay: '1.5s' },
] as const;

export const HexagonSplitLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => {
  const bg = LOADER_BG_VARIANTS[variant];
  return (
    <div className={`${LOADER_SIZES[size]} relative`}>
      {/* Ghost */}
      <div className={`absolute inset-[5%] ${bg} opacity-15`} style={{ clipPath: HEXAGON_CLIP }} />
      {PIECES.map((piece, i) => (
        <div
          key={i}
          className={`absolute w-[45%] h-[45%] ${bg} animate-split-out`}
          style={{
            top: '50%',
            left: '50%',
            clipPath: HEXAGON_CLIP,
            '--split-x': piece.x,
            '--split-y': piece.y,
            animationDelay: piece.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

HexagonSplitLoader.displayName = 'HexagonSplitLoader';
