import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { w: 40, h: 24, ballR: 3 },
  md: { w: 60, h: 36, ballR: 4.5 },
  lg: { w: 80, h: 48, ballR: 6 },
};

export const ZigzagBallLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.6,
}: LoaderProps) => {
  if (!visible) return null;
  const { w, h, ballR } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const steps = 4;
  const segW = (w - ballR * 2) / steps;

  // Build zigzag path
  let path = `M ${ballR} ${h - ballR}`;
  for (let i = 0; i < steps; i++) {
    const x = ballR + (i + 1) * segW;
    const y = i % 2 === 0 ? ballR : h - ballR;
    path += ` L ${x} ${y}`;
  }

  // Keyframe x/y positions along zigzag
  const points: [number, number][] = [];
  for (let i = 0; i <= steps; i++) {
    const x = ballR + i * segW;
    const y = i % 2 === 0 ? h - ballR : ballR;
    points.push([x, y]);
  }
  // reverse back
  for (let i = steps - 1; i >= 0; i--) {
    const x = ballR + i * segW;
    const y = i % 2 === 0 ? h - ballR : ballR;
    points.push([x, y]);
  }

  const xs = points.map(p => p[0].toFixed(1)).join(';');
  const ys = points.map(p => p[1].toFixed(1)).join(';');

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`}>
        <polyline points={points.slice(0, steps + 1).map(p => `${p[0]},${p[1]}`).join(' ')}
          fill="none" stroke={c} strokeWidth={1.5} strokeOpacity={0.25} strokeLinejoin="round" />
        <circle r={ballR} fill={c}>
          <animate attributeName="cx" values={xs} dur={`${animationDuration}s`} repeatCount="indefinite"
            calcMode="linear" />
          <animate attributeName="cy" values={ys} dur={`${animationDuration}s`} repeatCount="indefinite"
            calcMode="linear" />
        </circle>
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
ZigzagBallLoader.displayName = 'ZigzagBallLoader';
