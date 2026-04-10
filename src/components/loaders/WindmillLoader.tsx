import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 28, blades: 6, bladeW: 3.5, bladeH: 9 },
  md: { size: 40, blades: 6, bladeW: 5, bladeH: 13 },
  lg: { size: 56, blades: 8, bladeW: 6, bladeH: 18 },
};

const KF = `@keyframes rla-windmill{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`;
let inj = false;
function inject() {
  if (inj || typeof document === 'undefined') return;
  const s = document.createElement('style'); s.textContent = KF;
  document.head.appendChild(s); inj = true;
}

export const WindmillLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1,
}: LoaderProps) => {
  if (!visible) return null;
  inject();
  const { size: s, blades, bladeW, bladeH } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const cx = s / 2;
  const cy = s / 2;

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{ width: s, height: s, position: 'relative', ...wrapperStyle }}>
      <div style={{
        width: s, height: s,
        position: 'absolute', inset: 0,
        animation: `rla-windmill ${animationDuration}s linear infinite`,
      }}>
        <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
          {Array.from({ length: blades }).map((_, i) => {
            const angle = (i / blades) * 360;
            const opacity = 0.25 + (0.75 * (i + 1)) / blades;
            return (
              <rect key={i}
                x={cx - bladeW / 2}
                y={cy - bladeH - 1}
                width={bladeW}
                height={bladeH}
                rx={bladeW / 2}
                fill={c}
                opacity={opacity}
                transform={`rotate(${angle} ${cx} ${cy})`}
              />
            );
          })}
          {/* Center hub */}
          <circle cx={cx} cy={cy} r={bladeW * 0.6} fill={c} />
        </svg>
      </div>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
WindmillLoader.displayName = 'WindmillLoader';
