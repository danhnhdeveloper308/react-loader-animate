import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { size: 32 },
  md: { size: 48 },
  lg: { size: 64 },
};

let rlaInjBlob = false;
function injectBlobKF() {
  if (rlaInjBlob || typeof document === 'undefined') return;
  rlaInjBlob = true;
  const s = document.createElement('style');
  s.textContent = `
    @keyframes rla-blob-outer {
      0%,100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; transform: rotate(0deg); }
      25%     { border-radius: 30% 60% 70% 40% / 50% 60% 30% 60%; transform: rotate(90deg); }
      50%     { border-radius: 50% 60% 30% 60% / 30% 40% 70% 50%; transform: rotate(180deg); }
      75%     { border-radius: 70% 40% 60% 30% / 40% 70% 30% 60%; transform: rotate(270deg); }
    }
    @keyframes rla-blob-inner {
      0%,100% { border-radius: 40% 60% 60% 40% / 40% 50% 60% 50%; transform: rotate(0deg) scale(1); }
      33%     { border-radius: 60% 40% 40% 60% / 60% 40% 60% 40%; transform: rotate(-120deg) scale(1.05); }
      66%     { border-radius: 50% 50% 30% 70% / 70% 30% 60% 40%; transform: rotate(-240deg) scale(0.95); }
    }
  `;
  document.head.appendChild(s);
}

export const BlobLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 3,
}: LoaderProps) => {
  injectBlobKF();
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
BlobLoader.displayName = 'BlobLoader';
