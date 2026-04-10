import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 30 },
  md: { size: 44 },
  lg: { size: 60 },
};

export const PacmanLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 0.7,
}: LoaderProps) => {
  if (!visible) return null;
  const { size: s } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const r = s / 2;
  const dotR = r * 0.12;
  const vbW = s * 2.2;

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={vbW} height={s} viewBox={`0 0 ${vbW} ${s}`}>
        {/* Pacman body */}
        <g>
          {/* Upper jaw */}
          <path fill={c}>
            <animate attributeName="d"
              values={
                `M ${r} ${r} L ${r * 2} ${r * 0.3} A ${r} ${r} 0 1 0 ${r * 2} ${r * 1.7} Z;` +
                `M ${r} ${r} L ${r * 2} ${r * 0.7} A ${r} ${r} 0 1 0 ${r * 2} ${r * 1.3} Z;` +
                `M ${r} ${r} L ${r * 2} ${r * 0.3} A ${r} ${r} 0 1 0 ${r * 2} ${r * 1.7} Z`
              }
              dur={`${animationDuration}s`} repeatCount="indefinite"
              calcMode="spline" keySplines="0.4 0 0.2 1;0.4 0 0.2 1" />
          </path>
        </g>
        {/* Dots */}
        {[0.9, 0.72, 0.54].map((frac, i) => (
          <circle key={i}
            cx={r + vbW * frac * 0.45}
            cy={r} r={dotR} fill={c} opacity="0.5">
            <animate attributeName="opacity"
              values="0.5;0;0.5"
              dur={`${animationDuration * 2}s`}
              begin={`${i * animationDuration * 0.5}s`}
              repeatCount="indefinite" />
            <animate attributeName="cx"
              values={`${r + vbW * frac * 0.45};${r + vbW * frac * 0.45 - s * 0.1};${r + vbW * frac * 0.45}`}
              dur={`${animationDuration * 3}s`}
              repeatCount="indefinite" />
          </circle>
        ))}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
PacmanLoader.displayName = 'PacmanLoader';
