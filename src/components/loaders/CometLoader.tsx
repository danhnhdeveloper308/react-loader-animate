import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 36, stroke: 3.5 },
  md: { size: 52, stroke: 4.5 },
  lg: { size: 72, stroke: 6 },
};

let rlaInjComet = false;
function injectCometKF() {
  if (rlaInjComet || typeof document === 'undefined') return;
  rlaInjComet = true;
  const s = document.createElement('style');
  s.textContent = `
    @keyframes rla-comet-rot { from { transform: rotate(-90deg); } to { transform: rotate(270deg); } }
    @keyframes rla-comet-dash {
      0%   { stroke-dashoffset: 250; }
      50%  { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -250; }
    }
  `;
  document.head.appendChild(s);
}

export const CometLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.4,
}: LoaderProps) => {
  injectCometKF();
  if (!visible) return null;
  const { size: s, stroke: sw } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const cx = s / 2;
  const r = cx - sw;
  const circ = 2 * Math.PI * r;
  const dashLen = circ * 0.55;

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}
        style={{ animation: `rla-comet-rot ${animationDuration}s linear infinite` }}>
        {/* Track */}
        <circle cx={cx} cy={cx} r={r} fill="none" stroke={c} strokeWidth={sw * 0.3} opacity={0.15} />
        {/* Comet arc */}
        <circle cx={cx} cy={cx} r={r} fill="none" stroke={c}
          strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={`${dashLen} ${circ - dashLen}`}
          strokeDashoffset={0}
          style={{ opacity: 1 }}
        />
        {/* Leading bright dot */}
        <circle cx={cx} cy={cx - r} r={sw * 0.8} fill={c} />
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
CometLoader.displayName = 'CometLoader';
