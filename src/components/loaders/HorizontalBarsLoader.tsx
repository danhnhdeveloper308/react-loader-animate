import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { w: 40, barH: 4, gap: 3, count: 4 },
  md: { w: 60, barH: 5, gap: 4, count: 4 },
  lg: { w: 80, barH: 7, gap: 5, count: 4 },
};

export const HorizontalBarsLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.2,
}: LoaderProps) => {
  if (!visible) return null;
  ;
  const { w, barH, gap, count } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{ display: 'flex', flexDirection: 'column', gap, width: w, ...wrapperStyle }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ width: '100%', height: barH, borderRadius: barH, overflow: 'hidden', backgroundColor: `${c}20` }}>
          <div style={{
            height: '100%',
            backgroundColor: c,
            borderRadius: barH,
            animation: `rla-hbar ${animationDuration}s ease-in-out ${(i * animationDuration / count / 2).toFixed(2)}s infinite`,
          }} />
        </div>
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
