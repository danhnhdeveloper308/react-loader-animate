import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { w: 40, h: 3 },
  md: { w: 60, h: 4 },
  lg: { w: 80, h: 5 },
};

export const LineLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.6,
}: LoaderProps) => {
  if (!visible) return null;
  const { w, h } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const len = w * 0.9;
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={w} height={h + 4} viewBox={`0 0 ${w} ${h + 4}`}>
        {/* Track */}
        <rect x={2} y={2} width={w - 4} height={h}
          rx={h / 2} fill={c} opacity={0.15} />
        {/* Moving line segment */}
        <rect x={2} y={2} width={len * 0.4} height={h}
          rx={h / 2} fill={c}>
          <animate attributeName="x"
            values={`2;${w - len * 0.4 - 2};${2}`}
            dur={`${animationDuration}s`} repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
          <animate attributeName="width"
            values={`${len * 0.2};${len * 0.6};${len * 0.2}`}
            dur={`${animationDuration}s`} repeatCount="indefinite"
            calcMode="spline" keySplines="0.4 0 0.6 1;0.4 0 0.6 1" />
        </rect>
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
LineLoader.displayName = 'LineLoader';
