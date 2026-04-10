import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { rings: [10, 7, 4], sw: 1.5 },
  md: { rings: [16, 11, 6], sw: 2 },
  lg: { rings: [22, 15, 8], sw: 2.5 },
};

export const ConcentricLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.6,
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
            fill="none" stroke={c} strokeWidth={sw}>
            <animate attributeName="opacity"
              values="0.2;1;0.2"
              dur={`${animationDuration}s`}
              begin={`${i * (animationDuration / rings.length)}s`}
              repeatCount="indefinite" />
            <animate attributeName="r"
              values={`${r};${r + 2};${r}`}
              dur={`${animationDuration}s`}
              begin={`${i * (animationDuration / rings.length)}s`}
              repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
ConcentricLoader.displayName = 'ConcentricLoader';
