import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const GridLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => (
  <div className={`${LOADER_SIZES[size]} grid grid-cols-2 gap-1`}>
    {[0, 1, 2, 3].map((index) => (
      <div
        key={index}
        className={`w-full h-full ${LOADER_BG_VARIANTS[variant]} rounded-sm animate-bounce-dot`}
        style={{ animationDelay: `${index * 0.2}s` }}
      />
    ))}
  </div>
));

GridLoader.displayName = 'GridLoader';
