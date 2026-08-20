import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 28 },
  md: { size: 40 },
  lg: { size: 56 },
};

export const MorphLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.8,
}: LoaderProps) => {
  ;
  if (!visible) return null;
  const { size: s } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <div style={{
        width: s, height: s,
        background: c,
        boxShadow: `0 0 ${Math.round(s / 3)}px ${c}`,
        animation: `rla-morph ${animationDuration}s ease-in-out infinite`,
      }} />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
