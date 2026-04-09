import { memo } from 'react';
import { LoaderProps, LOADER_SIZES } from './types';

const GRADIENT_VARIANTS = {
  primary: 'bg-gradient-primary',
  accent: 'bg-gradient-accent',
  success: 'bg-gradient-success',
  warning: 'bg-gradient-warning'
} as const;

export const GradientSpinner = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => (
  <div className={`${LOADER_SIZES[size]} animate-spin-slow relative`}>
    <div className={`absolute inset-0 rounded-full ${GRADIENT_VARIANTS[variant]}`} />
    <div className="absolute inset-[3px] bg-background rounded-full" />
    <div
      className={`absolute w-[6px] h-[6px] rounded-full top-0 left-1/2 -translate-x-1/2 ${GRADIENT_VARIANTS[variant]}`}
    />
  </div>
));

GradientSpinner.displayName = 'GradientSpinner';
