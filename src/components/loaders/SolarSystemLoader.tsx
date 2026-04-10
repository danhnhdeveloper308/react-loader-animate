import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 40 },
  md: { size: 56 },
  lg: { size: 72 },
};

let rlaInjSolar = false;
function injectSolarKF() {
  if (rlaInjSolar || typeof document === 'undefined') return;
  rlaInjSolar = true;
  const s = document.createElement('style');
  s.textContent = `
    @keyframes rla-solar-1 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
    @keyframes rla-solar-2 { from { transform: rotate(0deg); } to { transform: rotate(-360deg); } }
    @keyframes rla-solar-3 { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
  `;
  document.head.appendChild(s);
}

export const SolarSystemLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 2,
}: LoaderProps) => {
  injectSolarKF();
  if (!visible) return null;
  const { size: s } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const cx = s / 2;
  const orbits = [
    { r: cx * 0.28, dotR: s * 0.045, dur: animationDuration * 0.6, kf: 'rla-solar-1', opacity: 1 },
    { r: cx * 0.52, dotR: s * 0.038, dur: animationDuration, kf: 'rla-solar-2', opacity: 0.75 },
    { r: cx * 0.78, dotR: s * 0.03, dur: animationDuration * 1.7, kf: 'rla-solar-3', opacity: 0.5 },
  ];

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {/* Orbit rings */}
        {orbits.map((o, i) => (
          <circle key={`ring-${i}`} cx={cx} cy={cx} r={o.r}
            fill="none" stroke={c} strokeWidth="0.5" opacity={0.15} />
        ))}
        {/* Center nucleus */}
        <circle cx={cx} cy={cx} r={s * 0.07} fill={c} />
        {/* Orbiting dots */}
        {orbits.map((o, i) => (
          <g key={`dot-${i}`} style={{
            transformOrigin: `${cx}px ${cx}px`,
            animation: `${o.kf} ${o.dur}s linear infinite`,
          }}>
            <circle cx={cx} cy={cx - o.r} r={o.dotR} fill={c} opacity={o.opacity} />
          </g>
        ))}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
SolarSystemLoader.displayName = 'SolarSystemLoader';
