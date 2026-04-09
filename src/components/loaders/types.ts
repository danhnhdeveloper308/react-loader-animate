export interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'accent' | 'success' | 'warning';
}

export const LOADER_SIZES = {
  sm: 'w-8 h-8',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
} as const;

export const LOADER_BG_VARIANTS = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warning: 'bg-warning'
} as const;

export const LOADER_BORDER_VARIANTS = {
  primary: 'border-primary',
  accent: 'border-accent',
  success: 'border-success',
  warning: 'border-warning'
} as const;
