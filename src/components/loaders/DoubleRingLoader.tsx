import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { r1: 12, r2: 8, sw: 2 },
  md: { r1: 18, r2: 12, sw: 2.5 },
  lg: { r1: 24, r2: 16, sw: 3 },
};

export const DoubleRingLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.2,
}: LoaderProps) => {
  if (!visible) return null;
  const { r1, r2, sw } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const vb = (r1 + sw) * 2;
  const cx = r1 + sw;
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={vb} height={vb} viewBox={`0 0 ${vb} ${vb}`}>
        {/* Outer ring — spins clockwise */}
        <circle cx={cx} cy={cx} r={r1} fill="none"
          stroke={c} strokeWidth={sw} strokeOpacity={0.2} />
        <circle cx={cx} cy={cx} r={r1} fill="none"
          stroke={c} strokeWidth={sw}
          strokeDasharray={`${r1 * 2} ${r1 * 4}`}
          strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate"
            from={`0 ${cx} ${cx}`} to={`360 ${cx} ${cx}`}
            dur={`${animationDuration}s`} repeatCount="indefinite" />
        </circle>
        {/* Inner ring — spins counter-clockwise */}
        <circle cx={cx} cy={cx} r={r2} fill="none"
          stroke={c} strokeWidth={sw} strokeOpacity={0.2} />
        <circle cx={cx} cy={cx} r={r2} fill="none"
          stroke={c} strokeWidth={sw}
          strokeDasharray={`${r2 * 1.5} ${r2 * 4}`}
          strokeLinecap="round">
          <animateTransform attributeName="transform" type="rotate"
            from={`0 ${cx} ${cx}`} to={`-360 ${cx} ${cx}`}
            dur={`${animationDuration * 0.7}s`} repeatCount="indefinite" />
        </circle>
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
DoubleRingLoader.displayName = 'DoubleRingLoader';
