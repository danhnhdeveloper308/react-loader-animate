import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const FlipLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => (
  <div className={`${LOADER_SIZES[size]} rounded-sm animate-flip ${LOADER_BG_VARIANTS[variant]}`} />
));

FlipLoader.displayName = 'FlipLoader';
