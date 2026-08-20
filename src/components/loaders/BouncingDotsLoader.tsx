import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { dotR: 4, gap: 6 },
  md: { dotR: 6, gap: 9 },
  lg: { dotR: 8, gap: 12 },
};

export const BouncingDotsLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.4,
}: LoaderProps) => {
  if (!visible) return null;
  ;
  const { dotR, gap } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{ display: 'flex', alignItems: 'center', gap, ...wrapperStyle }}>
      {[0, 0.16, 0.32].map((delay, i) => (
        <div key={i} style={{
          width: dotR * 2, height: dotR * 2,
          borderRadius: '50%',
          backgroundColor: c,
          animation: `rla-bounce-dot ${animationDuration}s ease-in-out ${delay}s infinite both`,
        }} />
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
