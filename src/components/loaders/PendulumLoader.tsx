import { memo } from 'react';
import { LoaderProps } from './types';

export const PendulumLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => {
  const fills = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warning: 'bg-warning',
  };
  const containers = { sm: 'w-16 h-8', md: 'w-24 h-12', lg: 'w-32 h-16' };
  const ballSizes = { sm: 'w-3 h-3', md: 'w-4 h-4', lg: 'w-5 h-5' };

  return (
    <div className={`${containers[size]} relative`}>
      {/* 5 balls in a row */}
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="absolute top-0" style={{ left: `${i * 25}%` }}>
          {/* String */}
          <div className={`w-[1px] ${fills[variant]} opacity-30 mx-auto`} style={{ height: '60%' }} />
          {/* Ball */}
          <div
            className={`${ballSizes[size]} ${fills[variant]} rounded-full ${
              i === 0 ? 'animate-[pendulum-left_1s_ease-in-out_infinite]' :
              i === 4 ? 'animate-[pendulum-right_1s_ease-in-out_infinite]' : ''
            }`}
            style={{ transformOrigin: 'top center' }}
          />
        </div>
      ))}
    </div>
  );
});
PendulumLoader.displayName = 'PendulumLoader';
