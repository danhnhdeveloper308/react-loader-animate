import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BORDER_VARIANTS } from './types';

export const ChevronLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => (
  <div className={`${LOADER_SIZES[size]} relative`}>
    {[0, 1, 2].map((index) => (
      <div
        key={index}
        className={`absolute w-1/2 h-1/2 border-r-4 border-b-4 ${LOADER_BORDER_VARIANTS[variant]} rotate-45 animate-pulse`}
        style={{
          top: '25%',
          left: `${15 + index * 15}%`,
          animationDelay: `${index * 0.2}s`
        }}
      />
    ))}
  </div>
));

ChevronLoader.displayName = 'ChevronLoader';
