import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { count: 7, barW: 3, maxH: 24 },
  md: { count: 7, barW: 4, maxH: 36 },
  lg: { count: 9, barW: 5, maxH: 52 },
};

export const SoundBarsLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1,
}: LoaderProps) => {
  if (!visible) return null;
  ;
  const { count, barW, maxH } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const delays = [0, 0.1, 0.25, 0.07, 0.15, 0.3, 0.05, 0.18, 0.22];
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{ display: 'flex', alignItems: 'flex-end', gap: barW, height: maxH, ...wrapperStyle }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{
          width: barW,
          height: maxH,
          position: 'relative',
          display: 'flex',
          alignItems: 'flex-end',
        }}>
          <div style={{
            width: '100%',
            borderRadius: barW,
            backgroundColor: c,
            animation: `rla-sound ${animationDuration}s ease-in-out ${delays[i] ?? 0}s infinite`,
          }} />
        </div>
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
