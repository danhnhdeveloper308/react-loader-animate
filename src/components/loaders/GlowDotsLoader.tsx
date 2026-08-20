import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { dotR: 4, gap: 6 },
  md: { dotR: 6, gap: 9 },
  lg: { dotR: 8, gap: 12 },
};

export const GlowDotsLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.5,
}: LoaderProps) => {
  if (!visible) return null;
  ;
  const { dotR, gap } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{
        display: 'flex', alignItems: 'center', gap,
        '--rla-glow-shadow': `0 0 ${dotR * 2}px ${c}, 0 0 ${dotR * 4}px ${c}40`,
        ...wrapperStyle,
      } as React.CSSProperties}>
      {[0, 0.25, 0.5].map((delay, i) => (
        <div key={i} style={{
          width: dotR * 2, height: dotR * 2,
          borderRadius: '50%',
          backgroundColor: c,
          animation: `rla-glow ${animationDuration}s ease-in-out ${delay}s infinite`,
        }} />
      ))}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
