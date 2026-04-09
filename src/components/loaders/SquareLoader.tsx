import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const SquareLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => (
  <div className={`${LOADER_SIZES[size]} animate-morph ${LOADER_BG_VARIANTS[variant]}`} />
));

SquareLoader.displayName = 'SquareLoader';
