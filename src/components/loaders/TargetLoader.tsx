import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { rings: [12, 8, 4], sw: 2 },
  md: { rings: [18, 12, 6], sw: 2.5 },
  lg: { rings: [24, 16, 8], sw: 3 },
};

export const TargetLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.5,
}: LoaderProps) => {
  if (!visible) return null;
  const { rings, sw } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const maxR = rings[0] + sw;
  const vb = maxR * 2 + 4;
  const cx = vb / 2;
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={vb} height={vb} viewBox={`0 0 ${vb} ${vb}`}>
        {rings.map((r, i) => (
          <circle key={i} cx={cx} cy={cx} r={r}
            fill={i === rings.length - 1 ? c : 'none'}
            fillOpacity={i === rings.length - 1 ? 0.8 : 0}
            stroke={c} strokeWidth={sw}>
            <animate attributeName="opacity"
              values={i === 0 ? '0;1;0' : '0.3;0.9;0.3'}
              dur={`${animationDuration}s`}
              begin={`${i * animationDuration * 0.25}s`}
              repeatCount="indefinite" />
          </circle>
        ))}
        {/* Crosshair lines */}
        <line x1={cx - rings[0] + sw} y1={cx} x2={cx + rings[0] - sw} y2={cx}
          stroke={c} strokeWidth={0.8} strokeOpacity={0.3} />
        <line x1={cx} y1={cx - rings[0] + sw} x2={cx} y2={cx + rings[0] - sw}
          stroke={c} strokeWidth={0.8} strokeOpacity={0.3} />
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
TargetLoader.displayName = 'TargetLoader';
