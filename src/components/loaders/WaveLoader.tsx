import { memo } from 'react';
import { LoaderProps, LOADER_BG_VARIANTS } from './types';

const BAR_SIZES = {
  sm: 'w-1 h-4',
  md: 'w-1.5 h-6',
  lg: 'w-2 h-8'
} as const;

export const WaveLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => (
  <div className="flex items-end space-x-1">
    {[0, 1, 2, 3, 4].map((index) => (
      <div
        key={index}
        className={`${BAR_SIZES[size]} rounded-sm animate-wave ${LOADER_BG_VARIANTS[variant]}`}
        style={{ animationDelay: `${index * 0.1}s` }}
      />
    ))}
  </div>
));

WaveLoader.displayName = 'WaveLoader';
