import { memo } from 'react';
import { LoaderProps, LOADER_SIZES } from './types';

export const SpinLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => {
  const variantClasses = {
    primary: 'border-primary border-t-transparent',
    accent: 'border-accent border-t-transparent',
    success: 'border-success border-t-transparent',
    warning: 'border-warning border-t-transparent'
  };

  return (
    <div className={`
      ${LOADER_SIZES[size]} 
      border-4 rounded-full animate-spin
      ${variantClasses[variant]}
    `} />
  );
});

SpinLoader.displayName = 'SpinLoader';
