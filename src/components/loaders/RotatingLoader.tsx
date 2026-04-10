import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const SIZES = { sm: 32, md: 48, lg: 64 };

export const RotatingLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'rotating-loading', wrapperStyle, wrapperClass = '',
  strokeWidth = 4, animationDuration = 1,
}: LoaderProps) => {
  if (!visible) return null;
  const s = SIZES[size];
  const r1 = s / 2 - strokeWidth * 1.5;
  const r2 = s / 2 - strokeWidth * 3.5;
  const c = resolveColor(variant, color);
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={wrapperClass}
      style={{ display: 'inline-flex', ...wrapperStyle }}
    >
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`}>
        {/* Outer ring */}
        <circle
          cx={s / 2} cy={s / 2} r={r1}
          fill="none"
          stroke={c}
          strokeWidth={strokeWidth}
          strokeOpacity={0.25}
        />
        <circle
          cx={s / 2} cy={s / 2} r={r1}
          fill="none"
          stroke={c}
          strokeWidth={strokeWidth}
          strokeDasharray={`${r1 * 0.6 * 2 * Math.PI} ${r1 * 2 * Math.PI}`}
          strokeLinecap="round"
          style={{
            transformOrigin: 'center',
            animation: `spin ${animationDuration}s linear infinite`,
          }}
        />
        {/* Inner ring — counter-spin */}
        <circle
          cx={s / 2} cy={s / 2} r={r2}
          fill="none"
          stroke={c}
          strokeWidth={strokeWidth}
          strokeOpacity={0.25}
        />
        <circle
          cx={s / 2} cy={s / 2} r={r2}
          fill="none"
          stroke={c}
          strokeWidth={strokeWidth}
          strokeDasharray={`${r2 * 0.4 * 2 * Math.PI} ${r2 * 2 * Math.PI}`}
          strokeLinecap="round"
          style={{
            transformOrigin: 'center',
            animation: `spin ${animationDuration * 0.7}s linear reverse infinite`,
          }}
        />
      </svg>
    </div>
  );
});
RotatingLoader.displayName = 'RotatingLoader';
