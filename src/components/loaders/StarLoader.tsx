import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

const STAR_CLIP = 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)';

export const StarLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => (
  <div className={`${LOADER_SIZES[size]} relative animate-spin`}>
    <div className={`w-full h-full ${LOADER_BG_VARIANTS[variant]}`} style={{ clipPath: STAR_CLIP }} />
  </div>
));

StarLoader.displayName = 'StarLoader';
