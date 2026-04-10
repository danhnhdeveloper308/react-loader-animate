import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { w: 24, h: 20, sw: 2.5 },
  md: { w: 36, h: 30, sw: 3 },
  lg: { w: 48, h: 40, sw: 4 },
};

export const WiFiLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.4,
}: LoaderProps) => {
  if (!visible) return null;
  const { w, h, sw } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const cx = w / 2;
  const cy = h * 1.1;
  // Arcs at increasing radii
  const arcs = [
    { r: h * 0.28, delay: 0.6 },
    { r: h * 0.56, delay: 0.3 },
    { r: h * 0.84, delay: 0 },
  ];
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        {/* Dot */}
        <circle cx={cx} cy={h - 2} r={sw / 1.5} fill={c}>
          <animate attributeName="opacity" values="0.3;1;0.3"
            dur={`${animationDuration}s`} repeatCount="indefinite" />
        </circle>
        {arcs.map(({ r, delay }, i) => {
          // Arc from bottom-left to bottom-right going up through top
          const startAngle = 210 * (Math.PI / 180);
          const endAngle = 330 * (Math.PI / 180);
          const x1 = cx + r * Math.cos(startAngle);
          const y1 = cy + r * Math.sin(startAngle);
          const x2 = cx + r * Math.cos(endAngle);
          const y2 = cy + r * Math.sin(endAngle);
          return (
            <path key={i}
              d={`M ${x1.toFixed(2)} ${y1.toFixed(2)} A ${r} ${r} 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)}`}
              fill="none" stroke={c} strokeWidth={sw} strokeLinecap="round">
              <animate attributeName="opacity"
                values="0.15;1;0.15"
                dur={`${animationDuration}s`}
                begin={`${delay}s`}
                repeatCount="indefinite" />
            </path>
          );
        })}
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
WiFiLoader.displayName = 'WiFiLoader';
