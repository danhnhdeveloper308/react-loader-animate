import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const CrossLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => {
  const bg = LOADER_BG_VARIANTS[variant];
  return (
    <div className={`${LOADER_SIZES[size]} relative animate-spin`}>
      <div className={`absolute top-1/2 left-0 w-full h-1/4 -translate-y-1/2 ${bg}`} />
      <div className={`absolute left-1/2 top-0 w-1/4 h-full -translate-x-1/2 ${bg}`} />
    </div>
  );
});

CrossLoader.displayName = 'CrossLoader';
