import { memo } from 'react';
import { LoaderProps, resolveColor } from './types';

const CONFIGS = {
  sm: { cols: 5, rows: 5, cell: 5, gap: 2 },
  md: { cols: 6, rows: 6, cell: 6, gap: 2 },
  lg: { cols: 8, rows: 8, cell: 7, gap: 2 },
};

const KF = `@keyframes rla-matrix{0%{opacity:0.05;transform:scaleY(0)}50%{opacity:1;transform:scaleY(1)}100%{opacity:0.05;transform:scaleY(0)}}`;
let inj = false;
function inject() {
  if (inj || typeof document === 'undefined') return;
  const s = document.createElement('style'); s.textContent = KF;
  document.head.appendChild(s); inj = true;
}

export const MatrixLoader = memo(({
  size = 'md', variant = 'primary', color, visible = true,
  ariaLabel = 'loading', wrapperStyle, wrapperClass = '',
  animationDuration = 1.5,
}: LoaderProps) => {
  if (!visible) return null;
  inject();
  const { cols, rows, cell, gap } = CONFIGS[size];
  const c = resolveColor(variant, color);
  return (
    <div role="status" aria-label={ariaLabel} className={wrapperClass}
      style={{ display: 'grid', gridTemplateColumns: `repeat(${cols},${cell}px)`, gap, ...wrapperStyle }}>
      {Array.from({ length: cols * rows }).map((_, i) => {
        const col = i % cols;
        // Each column falls at a random offset per column
        const delay = (col / cols) * animationDuration + (Math.floor(i / cols) / rows) * (animationDuration * 0.3);
        return (
          <div key={i} style={{
            width: cell,
            height: cell,
            borderRadius: 1,
            backgroundColor: c,
            transformOrigin: 'top',
            animation: `rla-matrix ${animationDuration}s ease-in ${delay.toFixed(2)}s infinite`,
          }} />
        );
      })}
      <span className="sr-only">{ariaLabel}</span>
    </div>
  );
});
MatrixLoader.displayName = 'MatrixLoader';
