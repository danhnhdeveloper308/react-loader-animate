import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 32, rings: 2 },
  md: { size: 48, rings: 2 },
  lg: { size: 64, rings: 2 },
};

export const RippleLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'ripple-loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.4,
}: LoaderProps) => {
  if (!visible) return null;
  ;
  const { size: s, rings } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{ position: 'relative', width: s, height: s, ...wrapperStyle }}>
      {Array.from({ length: rings }).map((_, i) => (
        <div key={i} style={{
          position: 'absolute', inset: 0,
          border: `2px solid ${c}`,
          borderRadius: '50%',
          animation: `rla-ripple ${animationDuration}s ease-out ${i * (animationDuration / rings)}s infinite`,
        }} />
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
