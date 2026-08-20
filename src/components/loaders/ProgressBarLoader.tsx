import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { w: 40, h: 4 },
  md: { w: 60, h: 5 },
  lg: { w: 80, h: 6 },
};

export const ProgressBarLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.8,
}: LoaderProps) => {
  if (!visible) return null;
  ;
  const { w, h } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{ width: w, height: h, position: 'relative', overflow: 'hidden',
        borderRadius: h, backgroundColor: `${c}20`, ...wrapperStyle }}>
      <div style={{
        position: 'absolute',
        height: '100%',
        borderRadius: h,
        backgroundColor: c,
        animation: `rla-pbar ${animationDuration}s ease-in-out infinite`,
      }} />
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
