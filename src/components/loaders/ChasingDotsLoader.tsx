import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { r: 12, dotR: 3.5, count: 3 },
  md: { r: 18, dotR: 5, count: 3 },
  lg: { r: 24, dotR: 6.5, count: 3 },
};

export const ChasingDotsLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.5,
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
          const initAngle = (i / count) * 360 - 90;
          const rad = (initAngle * Math.PI) / 180;
          const x = cx + r * Math.cos(rad);
          const y = cx + r * Math.sin(rad);
          const opacity = 0.4 + (0.6 * (i + 1)) / count;
          const dotScale = 0.5 + (0.5 * (i + 1)) / count;
          return (
            <circle key={i} cx={x} cy={y} r={dotR * dotScale}
              fill={c} opacity={opacity}>
              <animateTransform attributeName="transform" type="rotate"
                from={`${initAngle + 90} ${cx} ${cx}`}
                to={`${initAngle + 450} ${cx} ${cx}`}
                dur={`${animationDuration}s`} repeatCount="indefinite" />
            </circle>
          );
        })}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
ChasingDotsLoader.displayName = 'ChasingDotsLoader';
