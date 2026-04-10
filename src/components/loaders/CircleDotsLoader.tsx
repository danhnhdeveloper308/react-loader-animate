import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { r: 12, dotR: 2, count: 8 },
  md: { r: 18, dotR: 3, count: 10 },
  lg: { r: 24, dotR: 4, count: 12 },
};

export const CircleDotsLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.2,
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
          const angle = (i / count) * 2 * Math.PI - Math.PI / 2;
          const x = cx + r * Math.cos(angle);
          const y = cx + r * Math.sin(angle);
          const delay = -animationDuration + (i / count) * animationDuration;
          return (
            <circle key={i} cx={x} cy={y} r={dotR} fill={c}>
              <animate attributeName="opacity"
                values="1;0.15;1"
                dur={`${animationDuration}s`}
                begin={`${delay.toFixed(3)}s`}
                repeatCount="indefinite" />
              <animate attributeName="r"
                values={`${dotR};${dotR * 0.5};${dotR}`}
                dur={`${animationDuration}s`}
                begin={`${delay.toFixed(3)}s`}
                repeatCount="indefinite" />
            </circle>
          );
        })}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
CircleDotsLoader.displayName = 'CircleDotsLoader';
