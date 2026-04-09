import { memo } from 'react';
import { LoaderProps, LOADER_BG_VARIANTS } from './types';

const SIZE_MAP = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-16 h-16' };

export const DNALoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => {
  const bg = LOADER_BG_VARIANTS[variant];
  return (
    <div className={`${SIZE_MAP[size]} flex items-center justify-center gap-[3px]`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex flex-col items-center gap-[2px]">
          <div
            className={`w-[5px] h-[5px] ${bg} rounded-full animate-dna-top`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
          <div className={`w-[1px] h-3 ${bg} opacity-30`} />
          <div
            className={`w-[5px] h-[5px] ${bg} rounded-full animate-dna-bottom`}
            style={{ animationDelay: `${i * 0.15}s` }}
          />
        </div>
      ))}
    </div>
  );
});
DNALoader.displayName = 'DNALoader';
