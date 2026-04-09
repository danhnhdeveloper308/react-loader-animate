import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

const CORNERS = [
  { x: '-60%', y: '-60%', delay: '0s' },
  { x: '60%', y: '-60%', delay: '0.5s' },
  { x: '-60%', y: '60%', delay: '1s' },
  { x: '60%', y: '60%', delay: '1.5s' },
] as const;

export const CornerSquaresLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => {
  const bg = LOADER_BG_VARIANTS[variant];
  return (
    <div className={`${LOADER_SIZES[size]} relative`}>
      {/* Ghost shape */}
      <div
        className={`absolute w-1/2 h-1/2 ${bg} rounded-sm opacity-20`}
        style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
      />
      {CORNERS.map((corner, i) => (
        <div
          key={i}
          className={`absolute w-1/4 h-1/4 ${bg} rounded-sm animate-corner-split`}
          style={{
            top: '50%',
            left: '50%',
            '--corner-x': corner.x,
            '--corner-y': corner.y,
            animationDelay: corner.delay,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
});

CornerSquaresLoader.displayName = 'CornerSquaresLoader';
