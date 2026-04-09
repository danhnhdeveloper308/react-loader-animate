import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const PulseLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => (
  <div className="relative">
    <div className={`${LOADER_SIZES[size]} rounded-full animate-pulse-ring ${LOADER_BG_VARIANTS[variant]}`} />
    <div
      className={`absolute inset-0 ${LOADER_SIZES[size]} rounded-full animate-pulse-ring ${LOADER_BG_VARIANTS[variant]}`}
      style={{ animationDelay: '0.5s' }}
    />
  </div>
));

PulseLoader.displayName = 'PulseLoader';
