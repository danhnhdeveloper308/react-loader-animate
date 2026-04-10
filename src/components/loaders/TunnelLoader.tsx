import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 32, layers: 4 },
  md: { size: 48, layers: 5 },
  lg: { size: 64, layers: 6 },
};

export const TunnelLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.6,
}: LoaderProps) => {
  if (!visible) return null;
  const { size: s, layers } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const cx = s / 2;

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {Array.from({ length: layers }, (_, i) => {
          const frac = (i + 1) / layers;
          const half = cx * frac;
          const x = cx - half;
          const y = cx - half;
          const w = half * 2;
          const h = half * 2;
          const r = half * 0.15;
          const opacity = 0.15 + frac * 0.7;
          const delay = ((layers - 1 - i) / layers) * animationDuration;
          return (
            <rect key={i} x={x} y={y} width={w} height={h} rx={r}
              fill="none" stroke={c} strokeWidth={1.5} opacity={opacity}>
              <animate attributeName="opacity"
                values={`${opacity};${opacity * 0.2};${opacity}`}
                dur={`${animationDuration}s`}
                begin={`${delay.toFixed(2)}s`}
                repeatCount="indefinite" />
              <animateTransform attributeName="transform" type="scale"
                values="1;0.85;1"
                additive="sum"
                dur={`${animationDuration}s`}
                begin={`${delay.toFixed(2)}s`}
                repeatCount="indefinite" />
            </rect>
          );
        })}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
TunnelLoader.displayName = 'TunnelLoader';
