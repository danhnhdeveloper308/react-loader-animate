import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { r: 12, dotR: 2.5, count: 6 },
  md: { r: 18, dotR: 3.5, count: 8 },
  lg: { r: 24, dotR: 4.5, count: 10 },
};

export const CircleChaseLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.8,
}: LoaderProps) => {
  if (!visible) return null;
  const { r, dotR, count } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const vb = (r + dotR) * 2 + 4;
  const cx = vb / 2;
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={vb} height={vb} viewBox={`0 0 ${vb} ${vb}`}>
        {Array.from({ length: count }).map((_, i) => {
          const angle = (i / count) * 360 - 90;
          const rad = (angle * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cx + r * Math.sin(rad);
          const opacity = (i + 1) / count;
          const scale = 0.3 + (0.7 * (i + 1)) / count;
          return (
            <circle key={i} cx={x} cy={y} r={dotR * scale}
              fill={c} opacity={opacity}>
              <animateTransform attributeName="transform" type="rotate"
                from={`0 ${cx} ${cx}`} to={`360 ${cx} ${cx}`}
                dur={`${animationDuration}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
CircleChaseLoader.displayName = 'CircleChaseLoader';
