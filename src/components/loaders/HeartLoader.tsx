import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 28 },
  md: { size: 40 },
  lg: { size: 56 },
};

export const HeartLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 0.9,
}: LoaderProps) => {
  if (!visible) return null;
  const { size: s } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const vb = 32;
  const heartPath = 'M16 28.5S3 20.5 3 12a6 6 0 0 1 10.58-3.91L16 11l2.42-2.91A6 6 0 0 1 29 12c0 8.5-13 16.5-13 16.5z';
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <svg width={s} height={s} viewBox={`0 0 ${vb} ${vb}`}>
        <path d={heartPath} fill={c}>
          <animateTransform attributeName="transform" type="scale"
            values={`1 1;1.15 1.15;1 1;0.9 0.9;1 1`}
            additive="sum"
            dur={`${animationDuration}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"
            keyTimes="0;0.3;0.5;0.7;1" />
          <animateTransform attributeName="transform" type="translate"
            values="0 0;-2.4 -2.4;0 0;1.6 1.6;0 0"
            additive="sum"
            dur={`${animationDuration}s`}
            repeatCount="indefinite"
            calcMode="spline"
            keySplines="0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1;0.4 0 0.2 1"
            keyTimes="0;0.3;0.5;0.7;1" />
          <animate attributeName="opacity"
            values="1;0.7;1;0.9;1"
            dur={`${animationDuration}s`}
            repeatCount="indefinite" />
        </path>
      </svg>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
HeartLoader.displayName = 'HeartLoader';
