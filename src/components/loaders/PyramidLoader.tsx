import { memo } from 'react';
import { LoaderProps } from './types';

const SIZE_MAP = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-16 h-16' };

export const PyramidLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => {
  const stroke = {
    primary: 'stroke-primary',
    accent: 'stroke-accent',
    success: 'stroke-success',
    warning: 'stroke-warning',
  };
  const fill = {
    primary: 'fill-primary/20',
    accent: 'fill-accent/20',
    success: 'fill-success/20',
    warning: 'fill-warning/20',
  };
  return (
    <svg className={`${SIZE_MAP[size]} animate-swing`} viewBox="0 0 50 50">
      <polygon className={`${stroke[variant]} ${fill[variant]}`} points="25,5 5,45 45,45" strokeWidth="2" />
      <line className={stroke[variant]} x1="25" y1="5" x2="25" y2="45" strokeWidth="1" opacity="0.4" />
      <line className={stroke[variant]} x1="15" y1="25" x2="35" y2="25" strokeWidth="1" opacity="0.4" />
    </svg>
  );
});
PyramidLoader.displayName = 'PyramidLoader';
