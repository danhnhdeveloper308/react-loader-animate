import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 32 },
  md: { size: 48 },
  lg: { size: 64 },
};

export const BlobLoader = /* @__PURE__ */ memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 3,
}: LoaderProps) => {
  ;
  if (!visible) return null;
  const { size: s } = CONFIGS[size];
  const c = resolveColor(variant, color);
  const dur = animationDuration;
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass} style={wrapperStyle}>
      <div style={{ width: s, height: s, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Outer blob */}
        <div style={{
          position: 'absolute',
          width: s, height: s,
          background: c,
          opacity: 0.25,
          animation: `rla-blob-outer ${dur}s ease-in-out infinite`,
        }} />
        {/* Inner blob */}
        <div style={{
          position: 'absolute',
          width: s * 0.65, height: s * 0.65,
          background: c,
          animation: `rla-blob-inner ${dur * 0.8}s ease-in-out infinite`,
        }} />
      </div>
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
