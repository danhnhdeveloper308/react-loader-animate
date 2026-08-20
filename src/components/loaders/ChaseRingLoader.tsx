import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 36, stroke: 3 },
  md: { size: 52, stroke: 4 },
  lg: { size: 68, stroke: 5 },
};

export const ChaseRingLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.6,
}: LoaderProps) => {
  ;
  if (!visible) return null;
  const { size: s, stroke: sw } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const cx = s / 2;
  const r = cx - sw * 2;
  const dotR = sw * 1.1;

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {/* Track ring */}
        <circle cx={cx} cy={cx} r={r} fill="none" stroke={c} strokeWidth={sw * 0.4} opacity={0.12} />
        {/* Dot A — chaser */}
        <g style={{ transformOrigin: `${cx}px ${cx}px`, animation: `rla-chase-a ${animationDuration}s linear infinite` }}>
          <circle cx={cx} cy={cx - r} r={dotR} fill={c} />
        </g>
        {/* Dot B — being chased, starts 180° offset, slower */}
        <g style={{ transformOrigin: `${cx}px ${cx}px`, animation: `rla-chase-b ${animationDuration * 1.35}s linear infinite` }}>
          <circle cx={cx} cy={cx - r} r={dotR * 0.75} fill={c} opacity={0.55} />
        </g>
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
