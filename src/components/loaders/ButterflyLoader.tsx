import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

export const ButterflyLoader = memo(({ size = 'md', variant = 'primary', visible = true, ariaLabel = 'loading', wrapperStyle, wrapperClass = '' }: LoaderProps) => {
  if (!visible) return null;
  const bg = LOADER_BG_VARIANTS[variant];
  return (
    <div
      role="status"
      aria-label={ariaLabel}
      className={`${LOADER_SIZES[size]} relative flex items-center justify-center animate-butterfly-flap ${wrapperClass}`}
      style={wrapperStyle}
    >
      {/* Left wing */}
      <div className={`absolute left-0 w-[45%] h-[70%] ${bg} rounded-tl-full rounded-bl-full origin-right`} />
      {/* Right wing */}
      <div className={`absolute right-0 w-[45%] h-[70%] ${bg} rounded-tr-full rounded-br-full origin-left`} />
      {/* Body */}
      <div className={`absolute w-[10%] h-[80%] ${bg} rounded-full`} />
    </div>
  );
});

ButterflyLoader.displayName = 'ButterflyLoader';
