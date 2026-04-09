import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

const DOT_SIZES = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4'
} as const;

export const OrbitLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => {
  const dot = DOT_SIZES[size];
  const bg = LOADER_BG_VARIANTS[variant];

  return (
    <div className={`${LOADER_SIZES[size]} relative animate-spin`}>
      <div className={`absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 ${dot} rounded-full ${bg}`} />
      <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 ${dot} rounded-full ${bg} opacity-50`} />
      <div className={`absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 ${dot} rounded-full ${bg} opacity-75`} />
      <div className={`absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 ${dot} rounded-full ${bg} opacity-25`} />
    </div>
  );
});

OrbitLoader.displayName = 'OrbitLoader';
