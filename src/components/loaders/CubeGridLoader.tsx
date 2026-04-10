import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { cube: 7, gap: 3 },
  md: { cube: 11, gap: 4 },
  lg: { cube: 15, gap: 5 },
};

const KF = `@keyframes rla-cube-grid{0%,70%,100%{transform:scale3d(1,1,1);opacity:1}35%{transform:scale3d(0,0,1);opacity:0.15}}`;
let inj = false;
function inject() {
  if (inj || typeof document === 'undefined') return;
  const s = document.createElement('style'); s.textContent = KF;
  document.head.appendChild(s); inj = true;
}

const DELAYS = [0.2, 0.3, 0.4, 0.1, 0.2, 0.3, 0, 0.1, 0.2];

export const CubeGridLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.3,
}: LoaderProps) => {
  if (!visible) return null;
  inject();
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
CubeGridLoader.displayName = 'CubeGridLoader';
