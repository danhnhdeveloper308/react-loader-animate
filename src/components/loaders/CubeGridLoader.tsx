import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { cube: 7, gap: 3 },
  md: { cube: 11, gap: 4 },
  lg: { cube: 15, gap: 5 },
};

const DELAYS = [0.2, 0.3, 0.4, 0.1, 0.2, 0.3, 0, 0.1, 0.2];

export const CubeGridLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.3,
}: LoaderProps) => {
  if (!visible) return null;
  ;
  const { cube, gap } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap, ...wrapperStyle }}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} style={{
          width: cube, height: cube,
          borderRadius: 2,
          backgroundColor: c,
          animation: `rla-cube-grid ${animationDuration}s ease-in-out ${DELAYS[i]}s infinite`,
        }} />
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
