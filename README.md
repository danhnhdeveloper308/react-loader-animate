# react-loader-animate

Bộ sưu tập **41+ loading components** được xây dựng bằng React, TypeScript và Tailwind CSS — sẵn sàng publish lên npm.

![npm](https://img.shields.io/npm/v/react-loader-animate?color=CB3837&logo=npm)
![React](https://img.shields.io/badge/React-≥16.8-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)

## ✨ Tính năng

- 🎨 **41+ loader animations** với nhiều kiểu dáng khác nhau
- 📐 **3 kích thước**: `sm`, `md`, `lg`
- 🎭 **4 biến thể màu**: `primary`, `accent`, `success`, `warning`
- ⚡ **Tối ưu hiệu suất**: `React.memo`, Intersection Observer lazy-load
- 🧩 **Barrel exports** — import gọn gàng từ một package duy nhất
- 🌗 Hỗ trợ **dark mode** qua CSS custom properties
- 🔧 **TypeScript** first — đầy đủ type definitions

## 📦 Cài đặt

```bash
npm install react-loader-animate
# hoặc
pnpm add react-loader-animate
# hoặc
yarn add react-loader-animate
```

## 🚀 Cách sử dụng

### 1. Import CSS (bắt buộc cho non-Tailwind project)

```tsx
// Thêm vào file entry (main.tsx / _app.tsx)
import 'react-loader-animate/style.css';
```

### 2. Sử dụng component

```tsx
import { SpinLoader, DotsLoader, WaveLoader } from 'react-loader-animate';

// Kích thước mặc định (md), màu mặc định (primary)
<SpinLoader />

// Tuỳ chỉnh kích thước và màu
<DotsLoader size="lg" variant="accent" />
<WaveLoader size="sm" variant="success" />
```

### 3. Tailwind CSS project (tùy chọn thay thế cho CSS import)

```ts
// tailwind.config.ts
import loaderPreset from 'react-loader-animate/tailwind.preset';

export default {
  presets: [loaderPreset],
  content: [
    './src/**/*.{ts,tsx}',
    'node_modules/react-loader-animate/dist/**/*.{js,cjs}',
  ],
};
```

## 📐 Props

```ts
interface LoaderProps {
  size?:    'sm' | 'md' | 'lg';                           // default: 'md'
  variant?: 'primary' | 'accent' | 'success' | 'warning'; // default: 'primary'
}
```


## 📦 Danh sách Loaders

### Basic Loaders

| Loader | Mô tả |
|--------|--------|
| `SpinLoader` | Vòng xoay cơ bản |
| `DotsLoader` | 3 chấm nhảy lên xuống |
| `PulseLoader` | Hiệu ứng nhịp đập |
| `WaveLoader` | Sóng chuyển động |
| `GradientSpinner` | Vòng xoay gradient |
| `RingLoader` | Vòng tròn xoay kép |
| `BarLoader` | Thanh trượt ngang |
| `TypingDotsLoader` | 3 chấm gõ chữ |

### Shape Loaders

| Loader | Mô tả |
|--------|--------|
| `SquareLoader` | Hình vuông biến đổi |
| `TriangleLoader` | Tam giác xoay |
| `DiamondLoader` | Hình thoi xoay |
| `CrossLoader` | Dấu cộng xoay |
| `HexagonLoader` | Lục giác xoay |
| `PentagonLoader` | Ngũ giác xoay |
| `StarLoader` | Ngôi sao xoay |
| `ArrowLoader` | Mũi tên xoay |
| `ChevronLoader` | Chevron chuyển động |
| `PyramidLoader` | Kim tự tháp 3D |
| `CubeLoader` | Khối lập phương 3D |

### Motion Loaders

| Loader | Mô tả |
|--------|--------|
| `FlipLoader` | Lật 3D |
| `OrbitLoader` | Quỹ đạo xoay |
| `ButterflyLoader` | Cánh bướm vỗ |
| `SegmentLoader` | Phân đoạn xoay |
| `SpiralLoader` | Xoắn ốc |
| `GridLoader` | Lưới nhấp nháy |
| `BounceBallLoader` | Bóng nảy |
| `ClockLoader` | Kim đồng hồ |
| `DNALoader` | Chuỗi DNA xoắn |
| `HeartbeatLoader` | Nhịp tim |
| `InfinityLoader` | Vô cực ∞ |
| `GearLoader` | Bánh răng quay |
| `HourglassLoader` | Đồng hồ cát |
| `RadarLoader` | Radar quét |
| `PendulumLoader` | Con lắc Newton |
| `AtomLoader` | Nguyên tử với electron |
| `CornerSquaresLoader` | 4 ô vuông góc |

### Split & Transform Loaders

| Loader | Mô tả |
|--------|--------|
| `SquareSplitLoader` | Vuông tách & gộp |
| `TriangleSplitLoader` | Tam giác tách & gộp |
| `CircleSplitLoader` | Tròn tách & gộp |
| `DiamondSplitLoader` | Thoi tách & gộp |
| `HexagonSplitLoader` | Lục giác tách & gộp |

## ⚙️ Props

```typescript
interface LoaderProps {
  size?: 'sm' | 'md' | 'lg';       // Mặc định: 'md'
  variant?: 'primary' | 'accent' | 'success' | 'warning'; // Mặc định: 'primary'
}
```

| Prop | Giá trị | Kích thước |
|------|---------|------------|
| `sm` | `w-8 h-8` | 32px |
| `md` | `w-12 h-12` | 48px |
| `lg` | `w-16 h-16` | 64px |

## 🛠️ Tech Stack

- **React 18** + **TypeScript 5**
- **Tailwind CSS v3** — utility-first styling
- **Vite 5** — bundler
- **Intersection Observer** — lazy loading sections

## 📄 License

MIT
