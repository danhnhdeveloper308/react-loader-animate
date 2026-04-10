import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { r: 12, sw: 2 },
  md: { r: 18, sw: 2.5 },
  lg: { r: 24, sw: 3 },
};

export const DashLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.5,
}: LoaderProps) => {
  if (!visible) return null;
  const { r, sw } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const circ = 2 * Math.PI * r;
  const vb = (r + sw) * 2 + 4;
  const cx = vb / 2;
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={vb} height={vb} viewBox={`0 0 ${vb} ${vb}`}>
        {/* Track */}
        <circle cx={cx} cy={cx} r={r} fill="none"
          stroke={c} strokeWidth={sw} strokeOpacity={0.15} />
        {/* Animated dash */}
        <circle cx={cx} cy={cx} r={r} fill="none"
          stroke={c} strokeWidth={sw}
          strokeLinecap="round"
          strokeDasharray={`${circ * 0.3} ${circ * 0.7}`}
          transform={`rotate(-90 ${cx} ${cx})`}>
          <animateTransform attributeName="transform" type="rotate"
            from={`-90 ${cx} ${cx}`} to={`270 ${cx} ${cx}`}
            dur={`${animationDuration}s`} repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1" />
          <animate attributeName="stroke-dasharray"
            values={`1 ${circ};${circ * 0.85} ${circ * 0.15};1 ${circ}`}
            dur={`${animationDuration}s`} repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
        </circle>
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
DashLoader.displayName = 'DashLoader';
