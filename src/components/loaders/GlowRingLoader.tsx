import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 36, border: 3 },
  md: { size: 52, border: 4 },
  lg: { size: 68, border: 5 },
};

export const GlowRingLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.5,
}: LoaderProps) => {
  ;
  if (!visible) return null;
  const { size: s, border: bw } = CONFIGS[size];
  const c = resolveColor(variant, color);

  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <div style={{ position: 'relative', width: s, height: s }}>
        {/* Pulsing glow ring */}
        <div style={{
          position: 'absolute', inset: 0,
          borderRadius: '50%',
          border: `${bw}px solid ${c}`,
          boxShadow: `0 0 ${bw * 3}px ${c}, 0 0 ${bw * 6}px ${c}, inset 0 0 ${bw * 2}px ${c}`,
          animation: `rla-glow-ring-pulse ${animationDuration}s ease-in-out infinite`,
        }} />
        {/* Spinning arc on top */}
        <div style={{
          position: 'absolute', inset: bw,
          borderRadius: '50%',
          border: `${bw}px solid transparent`,
          borderTopColor: c,
          filter: `blur(${bw * 0.5}px)`,
          animation: `rla-glow-ring-spin ${animationDuration * 0.7}s linear infinite`,
        }} />
      </div>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
