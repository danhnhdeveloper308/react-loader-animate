import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { w: 40, h: 4 },
  md: { w: 60, h: 5 },
  lg: { w: 80, h: 6 },
};

const KF = `@keyframes rla-pbar{0%{left:-40%;width:30%}50%{left:30%;width:60%}100%{left:100%;width:30%}}`;
let inj = false;
function inject() {
  if (inj || typeof document === 'undefined') return;
  const s = document.createElement('style'); s.textContent = KF;
  document.head.appendChild(s); inj = true;
}

export const ProgressBarLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.8,
}: LoaderProps) => {
  if (!visible) return null;
  inject();
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
ProgressBarLoader.displayName = 'ProgressBarLoader';
