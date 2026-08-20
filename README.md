# react-loader-animate

> **112 curated React loaders** with modern motion, accessible defaults, TypeScript types, dark-mode tokens, and lightweight tree-shakeable imports.

[![npm version](https://img.shields.io/npm/v/react-loader-animate?color=CB3837&logo=npm&label=npm)](https://www.npmjs.com/package/react-loader-animate)
[![npm downloads](https://img.shields.io/npm/dm/react-loader-animate?color=CB3837&logo=npm)](https://www.npmjs.com/package/react-loader-animate)
[![React](https://img.shields.io/badge/React-≥17-61DAFB?logo=react&logoColor=61DAFB)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

---

## ✨ Features

- 🎨 **112 curated animations** — selected from a visual and technical audit of 190 loaders
- 📐 **3 built-in sizes** — `sm`, `md`, `lg`
- 🎭 **4 colour variants** — `primary`, `accent`, `success`, `warning`
- 🖌️ **Full customisation** — `color`, `height`, `width`, `animationDuration`, `strokeWidth`, `colors[]`
- ♿ **Accessible** — `role="status"`, `aria-label`, `visible` prop for screen-reader-friendly hiding
- ⚡ **Performance-first** — 591 B gzip for a production `SpinLoader` import, zero runtime dependencies
- 🌗 **Dark mode** — CSS custom properties, works with any theming strategy
- 🌲 **Tree-shakable** — root named imports and explicit per-loader subpaths
- 🔧 **TypeScript** — complete type definitions included

---

## 📦 Installation

```bash
# npm
npm install react-loader-animate

# pnpm
pnpm add react-loader-animate

# yarn
yarn add react-loader-animate
```

**Peer dependencies:** `react >= 16.14`, `react-dom >= 16.14`

---

## 🚀 Quick Start

### Option 1 — Pre-built CSS

```tsx
// main.tsx / _app.tsx
import 'react-loader-animate/style.css';
```

### Option 2 — Tailwind CSS preset (recommended)

```ts
// tailwind.config.ts
import loaderPreset from 'react-loader-animate/tailwind.preset';

export default {
  presets: [loaderPreset],
  content: [
    './src/**/*.{ts,tsx}',
    'node_modules/react-loader-animate/dist/**/*.{js,mjs}',
  ],
};
```

### Use a component

```tsx
import { SpinLoader, DotsLoader, GradientSpinner } from 'react-loader-animate';

export default function App() {
  return (
    <div>
      <SpinLoader />
      <SpinLoader size="lg" variant="accent" />
      <SpinLoader color="#6366f1" animationDuration={0.6} />
    </div>
  );
}
```

For the most explicit minimal entry, use a per-loader subpath:

```tsx
import { SpinLoader } from 'react-loader-animate/loaders/SpinLoader';
```

Both import forms measure 591 B gzip in the automated package size check.

---

## 🎛️ Props

All components share a common `LoaderProps` interface:

| Prop | Type | Default | Description |
|---|---|---|---|
| `size` | `'sm' \| 'md' \| 'lg'` | `'md'` | Preset size |
| `variant` | `'primary' \| 'accent' \| 'success' \| 'warning'` | `'primary'` | Colour theme token |
| `color` | `string` | — | Custom CSS colour (overrides `variant`) |
| `height` | `number \| string` | — | Custom height in px or CSS string |
| `width` | `number \| string` | — | Custom width in px or CSS string |
| `className` | `string` | — | Extra class(es) on the root element |
| `ariaLabel` | `string` | `'loading'` | Accessible label for screen readers |
| `wrapperStyle` | `CSSProperties` | — | Inline styles on the wrapper |
| `wrapperClass` | `string` | — | Extra class(es) on the wrapper |
| `visible` | `boolean` | `true` | Set to `false` to hide (returns `null`) |
| `strokeWidth` | `number` | `4` | SVG stroke width (SVG-based loaders) |
| `animationDuration` | `number` | `1` | Animation speed in seconds |
| `colors` | `string[]` | — | Custom colour array (e.g. `ColorRingLoader`) |

---

## 🧩 Component Catalogue

The documentation gallery contains the 112 recommended, visually distinct loaders. Older root exports remain available for backward compatibility and may be deprecated in a future major release.

### Basic & Spinner
`SpinLoader` · `DotsLoader` · `PulseLoader` · `WaveLoader` · `GradientSpinner` · `RingLoader` · `BarLoader` · `TypingDotsLoader` · `SyncLoader` · `BarsLoader` · `RotatingLoader`

### Shapes
`SquareLoader` · `TriangleLoader` · `DiamondLoader` · `CrossLoader` · `HexagonLoader` · `PentagonLoader` · `StarLoader` · `ArrowLoader` · `ChevronLoader` · `PyramidLoader` · `CubeLoader`

### Motion & Physics
`FlipLoader` · `OrbitLoader` · `ButterflyLoader` · `SegmentLoader` · `SpiralLoader` · `GridLoader` · `Grid3x3Loader` · `BounceBallLoader` · `ClockLoader` · `DNALoader` · `HeartbeatLoader` · `InfinityLoader` · `GearLoader` · `HourglassLoader` · `RadarLoader` · `PendulumLoader` · `AtomLoader`

### Advanced / Multi-colour
`ColorRingLoader` · `CircularProgressLoader` · `TailSpinLoader` · `BallTriangleLoader` · `HashLoader` · `MutatingDotsLoader` · `ThreeDotsFadeLoader`

### Split & Transform
`CornerSquaresLoader` · `SquareSplitLoader` · `TriangleSplitLoader` · `CircleSplitLoader` · `DiamondSplitLoader` · `HexagonSplitLoader`

---

## 💡 Usage Examples

```tsx
// Custom colour
<SpinLoader color="#f43f5e" size="lg" />

// Custom size override
<RingLoader height={80} width={80} strokeWidth={6} />

// Controlled visibility
<DotsLoader visible={isLoading} />

// Multi-colour ring
<ColorRingLoader colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />

// Slow down animation
<PulseLoader animationDuration={2} variant="success" />

// Wrapper customisation
<SpinLoader wrapperClass="flex items-center justify-center" wrapperStyle={{ minHeight: 200 }} />
```

---

## 🌗 Dark Mode

The library uses [CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) for colour tokens. Add the following variables to your global CSS:

```css
:root {
  --primary:   262 80% 60%;
  --accent:    25 95% 53%;
  --success:   142 71% 45%;
  --warning:   38 92% 50%;
}

.dark {
  --primary:   262 80% 65%;
  --accent:    25 95% 58%;
  --success:   142 71% 50%;
  --warning:   38 92% 55%;
}
```

---

## 📖 Documentation

Live demo and full API reference: **[react-loader-animate docs](https://danhnhdeveloper308.github.io/react-loader-animate-docs/)**

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/danhnhdeveloper308/react-loader-animate).

---

## 📄 License

MIT © [danhnhdeveloper308](https://github.com/danhnhdeveloper308)
