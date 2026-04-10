import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 28, loops: 4 },
  md: { size: 40, loops: 5 },
  lg: { size: 56, loops: 6 },
};

export const FingerprintLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 2,
}: LoaderProps) => {
  if (!visible) return null;
  const { size: s, loops } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const cx = s / 2;
  const cy = s / 2;
  const sw = s * 0.04;

  const rings = Array.from({ length: loops }, (_, i) => {
    const r = (cx - sw) * ((i + 1) / loops);
    const circ = 2 * Math.PI * r;
    const delay = (i / loops) * animationDuration;
    return { r, circ, delay };
  });

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {rings.map(({ r, circ, delay }, i) => (
          <circle key={i} cx={cx} cy={cy} r={r}
            fill="none" stroke={c} strokeWidth={sw}
            strokeDasharray={`${circ * 0.6} ${circ * 0.4}`}
            strokeLinecap="round">
            <animate attributeName="stroke-dashoffset"
              values={`0;${-circ}`}
              dur={`${animationDuration}s`}
              begin={`${delay.toFixed(2)}s`}
              repeatCount="indefinite" />
            <animate attributeName="opacity"
              values="0.2;1;0.2"
              dur={`${animationDuration}s`}
              begin={`${delay.toFixed(2)}s`}
              repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
FingerprintLoader.displayName = 'FingerprintLoader';
