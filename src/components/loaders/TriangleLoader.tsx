import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const TriangleLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => (
  <div className={`${LOADER_SIZES[size]} relative animate-spin`}>
    <div
      className={`w-full h-full ${LOADER_BG_VARIANTS[variant]}`}
      style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
    />
  </div>
));

TriangleLoader.displayName = 'TriangleLoader';
