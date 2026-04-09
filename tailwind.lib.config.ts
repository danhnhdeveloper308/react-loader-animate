import type { Config } from 'tailwindcss';

/**
 * Dedicated Tailwind config for building the library's distributed CSS.
 * Scans only the loader components so the output stays minimal.
 */
export default {
  darkMode: ['class'],
  content: ['./src/components/loaders/**/*.{ts,tsx}'],
  safelist: [
    // Colour variant classes referenced via LOADER_BG_VARIANTS / LOADER_BORDER_VARIANTS
    'bg-primary', 'bg-accent', 'bg-success', 'bg-warning',
    'border-primary', 'border-accent', 'border-success', 'border-warning',
    'fill-primary', 'fill-accent', 'fill-success', 'fill-warning',
    'text-primary', 'text-accent', 'text-success', 'text-warning',
    // Size classes from LOADER_SIZES
    'w-8', 'h-8', 'w-12', 'h-12', 'w-16', 'h-16',
    // All custom animation utilities
    { pattern: /^animate-/ },
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        success: {
          DEFAULT: 'hsl(var(--success))',
          foreground: 'hsl(var(--success-foreground))',
        },
        warning: {
          DEFAULT: 'hsl(var(--warning))',
          foreground: 'hsl(var(--warning-foreground))',
        },
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'bounce-dot': {
          '0%, 80%, 100%': { transform: 'scale(0)' },
          '40%': { transform: 'scale(1)' },
        },
        'pulse-ring': {
          '0%': { transform: 'scale(0.33)', opacity: '1' },
          '80%, 100%': { transform: 'scale(2.33)', opacity: '0' },
        },
        wave: {
          '0%, 60%, 100%': { transform: 'initial' },
          '30%': { transform: 'translateY(-15px)' },
        },
        flip: {
          '0%, 80%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        swing: {
          '0%, 100%': { transform: 'rotate(15deg)' },
          '50%': { transform: 'rotate(-15deg)' },
        },
        morph: {
          '0%': { borderRadius: '50%' },
          '50%': { borderRadius: '0%' },
          '100%': { borderRadius: '50%' },
        },
        'segment-fade': {
          '0%, 100%': { opacity: '0.15' },
          '50%': { opacity: '1' },
        },
        'butterfly-flap': {
          '0%, 100%': { transform: 'scaleX(1) rotate(0deg)' },
          '25%': { transform: 'scaleX(0.3) rotate(10deg)' },
          '50%': { transform: 'scaleX(1) rotate(0deg)' },
          '75%': { transform: 'scaleX(0.3) rotate(-10deg)' },
        },
        'diamond-pulse': {
          '0%': { transform: 'rotate(45deg) scale(1)' },
          '25%': { transform: 'rotate(45deg) scale(0.5)' },
          '50%': { transform: 'rotate(225deg) scale(1)' },
          '75%': { transform: 'rotate(225deg) scale(0.5)' },
          '100%': { transform: 'rotate(405deg) scale(1)' },
        },
        'split-out': {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: '0.3',
          },
          '10%': { opacity: '1' },
          '50%': {
            transform: 'translate(calc(-50% + var(--split-x)), calc(-50% + var(--split-y))) scale(0.6)',
            opacity: '1',
          },
          '90%': { opacity: '1' },
        },
        'corner-split': {
          '0%, 100%': {
            transform: 'translate(-50%, -50%) scale(1)',
            opacity: '0.3',
          },
          '10%': { opacity: '1' },
          '50%': {
            transform: 'translate(calc(-50% + var(--corner-x)), calc(-50% + var(--corner-y))) scale(0.6)',
            opacity: '1',
          },
          '90%': { opacity: '1' },
        },
        'square-split': {
          '0%': {
            transform: 'translate(-50%, -50%) scale(1) rotate(0deg)',
            borderRadius: '0%',
          },
          '25%': {
            transform: 'translate(-50%, -50%) scale(0.7) rotate(90deg)',
            borderRadius: '20%',
          },
          '50%': {
            transform: 'translate(-50%, -50%) scale(0.4) rotate(180deg)',
            borderRadius: '50%',
          },
          '75%': {
            transform: 'translate(-50%, -50%) scale(0.7) rotate(270deg)',
            borderRadius: '20%',
          },
          '100%': {
            transform: 'translate(-50%, -50%) scale(1) rotate(360deg)',
            borderRadius: '0%',
          },
        },
        'bar-slide': {
          '0%': { left: '-40%' },
          '100%': { left: '100%' },
        },
        'bounce-ball': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-200%)' },
        },
        'bounce-shadow': {
          '0%, 100%': { transform: 'scaleX(1)', opacity: '0.2' },
          '50%': { transform: 'scaleX(0.5)', opacity: '0.1' },
        },
        'dna-top': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(0.3)', opacity: '0.3' },
        },
        'dna-bottom': {
          '0%, 100%': { transform: 'scale(0.3)', opacity: '0.3' },
          '50%': { transform: 'scale(1)', opacity: '1' },
        },
        heartbeat: {
          '0%': { transform: 'scale(1)' },
          '14%': { transform: 'scale(1.3)' },
          '28%': { transform: 'scale(1)' },
          '42%': { transform: 'scale(1.3)' },
          '70%': { transform: 'scale(1)' },
        },
        'cube-face': {
          '0%': { transform: 'perspective(120px) rotateX(0deg) rotateY(0deg)' },
          '50%': { transform: 'perspective(120px) rotateX(-180deg) rotateY(0deg)' },
          '100%': { transform: 'perspective(120px) rotateX(-180deg) rotateY(-180deg)' },
        },
        'infinity-draw': {
          '0%': { strokeDashoffset: '600' },
          '100%': { strokeDashoffset: '0' },
        },
        'hourglass-flip': {
          '0%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(180deg)' },
          '100%': { transform: 'rotate(180deg)' },
        },
        'sand-fall': {
          '0%': { opacity: '0', height: '0%' },
          '20%': { opacity: '1', height: '10%' },
          '80%': { opacity: '1', height: '10%' },
          '100%': { opacity: '0', height: '0%' },
        },
        'typing-bounce': {
          '0%, 80%, 100%': { transform: 'scale(0.4)', opacity: '0.3' },
          '40%': { transform: 'scale(1)', opacity: '1' },
        },
        'pendulum-left': {
          '0%': { transform: 'rotate(0deg)' },
          '25%': { transform: 'rotate(-30deg)' },
          '50%, 100%': { transform: 'rotate(0deg)' },
        },
        'pendulum-right': {
          '0%, 50%': { transform: 'rotate(0deg)' },
          '75%': { transform: 'rotate(30deg)' },
          '100%': { transform: 'rotate(0deg)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 2s linear infinite',
        'bounce-dot': 'bounce-dot 1.4s ease-in-out infinite both',
        'pulse-ring': 'pulse-ring 1.25s cubic-bezier(0.215, 0.61, 0.355, 1) infinite',
        wave: 'wave 1.5s ease-in-out infinite',
        flip: 'flip 1.2s ease-in-out infinite',
        swing: 'swing 2s ease-in-out infinite',
        morph: 'morph 2s ease-in-out infinite',
        'segment-fade': 'segment-fade 1.2s ease-in-out infinite',
        'butterfly-flap': 'butterfly-flap 1.5s ease-in-out infinite',
        'diamond-pulse': 'diamond-pulse 2s ease-in-out infinite',
        'split-out': 'split-out 2s ease-in-out infinite',
        'corner-split': 'corner-split 2s ease-in-out infinite',
        'square-split': 'square-split 2s ease-in-out infinite',
        'bar-slide': 'bar-slide 1.5s ease-in-out infinite',
        'bounce-ball': 'bounce-ball 0.6s ease-in-out infinite',
        'bounce-shadow': 'bounce-shadow 0.6s ease-in-out infinite',
        'dna-top': 'dna-top 1s ease-in-out infinite',
        'dna-bottom': 'dna-bottom 1s ease-in-out infinite',
        heartbeat: 'heartbeat 1s ease-in-out infinite',
        'cube-rotate': 'spin-slow 2s linear infinite',
        'cube-face': 'cube-face 1.2s infinite ease-in-out',
        'infinity-draw': 'infinity-draw 2s linear infinite',
        'hourglass-flip': 'hourglass-flip 2s ease-in-out infinite',
        'sand-fall': 'sand-fall 2s ease-in-out infinite',
        'typing-bounce': 'typing-bounce 1.4s ease-in-out infinite',
        'pendulum-left': 'pendulum-left 1s ease-in-out infinite',
        'pendulum-right': 'pendulum-right 1s ease-in-out infinite',
      },
    },
  },
} satisfies Config;
