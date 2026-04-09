import { memo } from 'react';
import { LoaderProps, LOADER_SIZES, LOADER_BG_VARIANTS } from './types';

const HEXAGON_CLIP = 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)';

export const HexagonLoader = memo(({ size = 'md', variant = 'primary' }: LoaderProps) => (
  <div className={`${LOADER_SIZES[size]} relative animate-spin`}>
    <div
      className={`w-full h-full ${LOADER_BG_VARIANTS[variant]} animate-morph`}
      style={{ clipPath: HEXAGON_CLIP }}
    />
  </div>
));

HexagonLoader.displayName = 'HexagonLoader';
