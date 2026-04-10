import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { columns: 4, dotPx: 3,  linePx: 8,  gapPx: 2 },
  md: { columns: 5, dotPx: 5,  linePx: 12, gapPx: 3 },
  lg: { columns: 6, dotPx: 8,  linePx: 18, gapPx: 4 },
};

export const DNALoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'dna-loading', wrapperStyle, wrapperClass = '',
}: LoaderProps) => {
  if (!visible) return null;
  const { columns, dotPx, linePx, gapPx } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={wrapperClass}
      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: gapPx, ...wrapperStyle }}
    >
      {Array.from({ length: columns }).map((_, i) => (
        <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: gapPx }}>
          <div
            className="animate-dna-top"
            style={{ width: dotPx, height: dotPx, borderRadius: '50%', backgroundColor: c, animationDelay: `${i * 0.15}s` }}
          />
          <div style={{ width: 1, height: linePx, backgroundColor: c, opacity: 0.3 }} />
          <div
            className="animate-dna-bottom"
            style={{ width: dotPx, height: dotPx, borderRadius: '50%', backgroundColor: c, animationDelay: `${i * 0.15}s` }}
          />
        </div>
      ))}
    </div>
  );
});
DNALoader.displayName = 'DNALoader';
