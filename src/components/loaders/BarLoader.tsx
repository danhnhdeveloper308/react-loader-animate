import { memo } from 'react';
import { LoaderProps, LOADER_BG_VARIANTS } from './types';

const SIZE_MAP = { sm: 'w-16 h-2', md: 'w-24 h-3', lg: 'w-32 h-4' };

export const BarLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => {
  const bg = LOADER_BG_VARIANTS[variant];
  return (
    <div className={`${SIZE_MAP[size]} rounded-full overflow-hidden bg-muted relative`}>
      <div
        className={`absolute inset-y-0 ${bg} rounded-full animate-bar-slide`}
        style={{ width: '40%' }}
      />
    </div>
  );
});
BarLoader.displayName = 'BarLoader';
