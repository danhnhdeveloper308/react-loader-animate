import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { r: 12, sw: 3 },
  md: { r: 18, sw: 4 },
  lg: { r: 24, sw: 5 },
};

export const TrailSpinLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 0.8,
}: LoaderProps) => {
  if (!visible) return null;
  const { r, sw } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const circ = 2 * Math.PI * r;
  const vb = (r + sw) * 2 + 4;
  const cx = vb / 2;
  const gradId = `rla-trail-${size}`;
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={vb} height={vb} viewBox={`0 0 ${vb} ${vb}`}>
        <defs>
          <linearGradient id={gradId} gradientUnits="userSpaceOnUse"
            x1={cx} y1={2} x2={cx} y2={vb - 2}>
            <stop offset="0%" stopColor={c} stopOpacity="0" />
            <stop offset="100%" stopColor={c} stopOpacity="1" />
          </linearGradient>
        </defs>
        {/* Track */}
        <circle cx={cx} cy={cx} r={r} fill="none"
          stroke={c} strokeWidth={sw} strokeOpacity={0.12} />
        {/* Gradient trail arc — 270° visible */}
        <circle cx={cx} cy={cx} r={r} fill="none"
          stroke={`url(#${gradId})`} strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={`${circ * 0.75} ${circ * 0.25}`}
          transform={`rotate(-90 ${cx} ${cx})`}>
          <animateTransform attributeName="transform" type="rotate"
            from={`-90 ${cx} ${cx}`} to={`270 ${cx} ${cx}`}
            dur={`${animationDuration}s`} repeatCount="indefinite" />
        </circle>
        {/* Leading dot */}
        <circle cx={cx} cy={cx + r} r={sw / 1.5} fill={c}>
          <animateTransform attributeName="transform" type="rotate"
            from={`-90 ${cx} ${cx}`} to={`270 ${cx} ${cx}`}
            dur={`${animationDuration}s`} repeatCount="indefinite" />
        </circle>
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
TrailSpinLoader.displayName = 'TrailSpinLoader';
