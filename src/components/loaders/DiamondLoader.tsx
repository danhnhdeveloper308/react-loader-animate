import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const DiamondLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => (
  <div className={`${LOADER_SIZES[size]} flex items-center justify-center`}>
    <div className={`w-3/4 h-3/4 ${LOADER_BG_VARIANTS[variant]} animate-diamond-pulse`} />
  </div>
));

DiamondLoader.displayName = 'DiamondLoader';
