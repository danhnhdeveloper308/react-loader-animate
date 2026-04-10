import { memo } from 'react';
import { LoaderProps, LOADER_SIZES } from './types';

const BORDER_VARIANTS = {
  primary: 'border-t-primary',
  accent: 'border-t-accent',
  success: 'border-t-success',
  warning: 'border-t-warning'
} as const;

const BORDER_R_VARIANTS = {
  primary: 'border-r-primary',
  accent: 'border-r-accent',
  success: 'border-r-success',
  warning: 'border-r-warning'
} as const;

const BORDER_B_VARIANTS = {
  primary: 'border-b-primary',
  accent: 'border-b-accent',
  success: 'border-b-success',
  warning: 'border-b-warning'
} as const;

export const SpiralLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} relative animate-spin ${wrapperClass}`}
      style={wrapperStyle}
    >
      <div className={`absolute inset-0 rounded-full border-4 border-transparent ${BORDER_VARIANTS[variant]}`} />
      <div className={`absolute inset-1 rounded-full border-4 border-transparent ${BORDER_R_VARIANTS[variant]}`} />
      <div className={`absolute inset-2 rounded-full border-4 border-transparent ${BORDER_B_VARIANTS[variant]}`} />
    </div>
  );
});

SpiralLoader.displayName = 'SpiralLoader';
