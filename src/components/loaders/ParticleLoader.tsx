import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { count: 6, r: 12, dotR: 2 },
  md: { count: 8, r: 18, dotR: 3 },
  lg: { count: 10, r: 24, dotR: 4 },
};

const KF = `@keyframes rla-particle{0%{transform:translate(0,0);opacity:1}100%{transform:var(--rla-tx,0) var(--rla-ty,0);opacity:0}}`;
let inj = false;
function inject() {
  if (inj || typeof document === 'undefined') return;
  const s = document.createElement('style'); s.textContent = KF;
  document.head.appendChild(s); inj = true;
}

export const ParticleLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.8,
}: LoaderProps) => {
  if (!visible) return null;
  inject();
  const { count, r, dotR } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const vb = (r + dotR) * 2 + r * 2;
  const cx = vb / 2;
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={vb} height={vb} viewBox={`0 0 ${vb} ${vb}`}>
        {Array.from({ length: count }).map((_, i) => {
          const angle = (i / count) * 2 * Math.PI;
          const x = cx + r * Math.cos(angle);
          const y = cx + r * Math.sin(angle);
          const tx = r * 1.4 * Math.cos(angle);
          const ty = r * 1.4 * Math.sin(angle);
          const delay = (i / count) * animationDuration;
          return (
            <circle key={i} cx={x} cy={y} r={dotR} fill={c}>
              <animateTransform attributeName="transform" type="translate"
                values={`0 0;${tx} ${ty}`}
                dur={`${animationDuration}s`} begin={`${delay.toFixed(2)}s`}
                repeatCount="indefinite" />
              <animate attributeName="opacity"
                values="1;0" dur={`${animationDuration}s`}
                begin={`${delay.toFixed(2)}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
        {/* Center dot */}
        <circle cx={cx} cy={cx} r={dotR * 1.5} fill={c} opacity="0.6">
          <animate attributeName="opacity" values="0.4;1;0.4"
            dur={`${animationDuration * 0.5}s`} repeatCount="indefinite" />
        </circle>
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
ParticleLoader.displayName = 'ParticleLoader';
