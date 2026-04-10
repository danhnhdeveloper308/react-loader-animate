import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 32, stars: 12 },
  md: { size: 48, stars: 16 },
  lg: { size: 64, stars: 20 },
};

export const GalaxyLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 3,
}: LoaderProps) => {
  if (!visible) return null;
  const { size: s, stars } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const cx = s / 2;
  const cy = s / 2;

  // Generate stars in a spiral pattern
  const starData = Array.from({ length: stars }, (_, i) => {
    const t = i / stars;
    const angle = t * 4 * Math.PI;
    const r = cx * 0.15 + cx * 0.75 * t;
    const x = cx + r * Math.cos(angle);
    const y = cy + r * Math.sin(angle);
    const starR = (1 - t * 0.5) * (s * 0.055);
    const opacity = 0.3 + t * 0.7;
    return { x, y, r: starR, opacity };
  });

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        <g>
          <animateTransform attributeName="transform" type="rotate"
            from={`0 ${cx} ${cy}`} to={`360 ${cx} ${cy}`}
            dur={`${animationDuration}s`} repeatCount="indefinite" />
          {starData.map((star, i) => (
            <circle key={i} cx={star.x} cy={star.y} r={star.r}
              fill={c} opacity={star.opacity}>
              <animate attributeName="opacity"
                values={`${star.opacity};${star.opacity * 0.2};${star.opacity}`}
                dur={`${animationDuration * 0.4}s`}
                begin={`${((i / stars) * animationDuration * 0.4).toFixed(2)}s`}
                repeatCount="indefinite" />
            </circle>
          ))}
        </g>
        {/* Center core */}
        <circle cx={cx} cy={cy} r={s * 0.07} fill={c} opacity="0.9">
          <animate attributeName="opacity" values="0.6;1;0.6"
            dur={`${animationDuration * 0.3}s`} repeatCount="indefinite" />
        </circle>
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
GalaxyLoader.displayName = 'GalaxyLoader';
