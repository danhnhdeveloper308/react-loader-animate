import { memo, useState, useCallback } from 'react';
import { LoaderCard } from "@/components/LoaderCard";
import { LazyLoaderSection } from "@/components/LazyLoaderSection";
import { CodeBlock } from "@/components/CodeBlock";
import {
  SpinLoader, DotsLoader, PulseLoader, WaveLoader, SquareLoader,
  FlipLoader, GradientSpinner, OrbitLoader, TriangleLoader, DiamondLoader,
  CrossLoader, ButterflyLoader, HexagonLoader, SegmentLoader, ArrowLoader,
  GridLoader, StarLoader, PentagonLoader, ChevronLoader, SpiralLoader,
  RingLoader, ClockLoader, BarLoader, BounceBallLoader, DNALoader,
  HeartbeatLoader, CubeLoader, InfinityLoader, GearLoader, PyramidLoader,
  HourglassLoader, RadarLoader, TypingDotsLoader, PendulumLoader, AtomLoader,
  CornerSquaresLoader, SquareSplitLoader, TriangleSplitLoader,
  CircleSplitLoader, DiamondSplitLoader, HexagonSplitLoader,
} from "@/components/loaders";
import { Check, Copy } from 'lucide-react';

// ─── Sticky top navigation ────────────────────────────────────────────────────
const TopNav = memo(() => (
  <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
    <div className="container mx-auto px-6 h-14 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <GradientSpinner size="sm" />
        <span className="font-semibold text-foreground font-mono text-sm">react-loader-animate</span>
        <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
          v0.1.0
        </span>
      </div>
      <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground">
        <a href="#install" className="hover:text-foreground transition-colors">Install</a>
        <a href="#usage" className="hover:text-foreground transition-colors">Usage</a>
        <a href="#loaders" className="hover:text-foreground transition-colors">Components</a>
        <a href="#props" className="hover:text-foreground transition-colors">Props</a>
        <a href="#tailwind" className="hover:text-foreground transition-colors">Tailwind</a>
      </nav>
    </div>
  </header>
));
TopNav.displayName = 'TopNav';

// ─── Hero ─────────────────────────────────────────────────────────────────────
const HeroSection = memo(() => (
  <section className="relative overflow-hidden border-b border-border">
    <div className="absolute inset-0 bg-gradient-primary opacity-5" />
    <div className="relative z-10 container mx-auto px-6 py-24 text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-medium mb-6">
        <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
        41+ animation components
      </div>
      <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-5 tracking-tight">
        react-loader-animate
      </h1>
      <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
        Beautiful, performant React loading animations. TypeScript-first, Tailwind CSS,
        zero runtime dependencies.
      </p>
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[
          { label: '41+ components', color: 'primary' },
          { label: 'TypeScript', color: 'accent' },
          { label: 'React ≥ 16.8', color: 'success' },
          { label: 'Zero deps', color: 'warning' },
        ].map(({ label, color }) => (
          <span
            key={label}
            className={`px-3 py-1 rounded-full text-xs font-medium border bg-${color}/10 text-${color} border-${color}/30`}
          >
            {label}
          </span>
        ))}
      </div>
      <div className="flex items-end justify-center gap-6 mb-2">
        {([
          { loader: <SpinLoader size="lg" variant="primary" />, name: 'SpinLoader' },
          { loader: <GradientSpinner size="lg" variant="accent" />, name: 'GradientSpinner' },
          { loader: <OrbitLoader size="lg" variant="success" />, name: 'OrbitLoader' },
          { loader: <AtomLoader size="lg" variant="warning" />, name: 'AtomLoader' },
          { loader: <InfinityLoader size="lg" variant="primary" />, name: 'InfinityLoader' },
        ] as const).map(({ loader, name }) => (
          <div key={name} className="flex flex-col items-center gap-3">
            {loader}
            <span className="text-[10px] text-muted-foreground font-mono hidden sm:block">{name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
));
HeroSection.displayName = 'HeroSection';

// ─── Install section ──────────────────────────────────────────────────────────
type PkgManager = 'npm' | 'pnpm' | 'yarn' | 'bun';

const INSTALL_CMDS: Record<PkgManager, string> = {
  npm:  'npm install react-loader-animate',
  pnpm: 'pnpm add react-loader-animate',
  yarn: 'yarn add react-loader-animate',
  bun:  'bun add react-loader-animate',
};

const InstallSection = memo(() => {
  const [pm, setPm] = useState<PkgManager>('npm');

  return (
    <section id="install" className="container mx-auto px-6 py-16">
      <SectionHeader
        badge="01"
        title="Installation"
        description="Install the package from npm."
      />
      <div className="max-w-2xl">
        <div className="flex gap-1 mb-3 border-b border-border">
          {(Object.keys(INSTALL_CMDS) as PkgManager[]).map((key) => (
            <button
              key={key}
              onClick={() => setPm(key)}
              className={`px-4 py-2 text-sm font-medium transition-colors rounded-t border-b-2 -mb-px
                ${pm === key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
            >
              {key}
            </button>
          ))}
        </div>
        <CodeBlock code={INSTALL_CMDS[pm]} />
      </div>
    </section>
  );
});
InstallSection.displayName = 'InstallSection';

// ─── Quick-start / usage ──────────────────────────────────────────────────────
const USAGE_STEPS: Array<{ title: string; code: string }> = [
  {
    title: '1. Import the CSS (non-Tailwind projects)',
    code: `// Add to your entry file (main.tsx / _app.tsx / index.ts)
import 'react-loader-animate/style.css';`,
  },
  {
    title: '2. Import and use any loader',
    code: `import { SpinLoader, DotsLoader, WaveLoader } from 'react-loader-animate';

export function App() {
  return (
    <div>
      {/* Default: size="md" variant="primary" */}
      <SpinLoader />

      {/* Custom size and colour */}
      <DotsLoader size="lg" variant="accent" />
      <WaveLoader size="sm" variant="success" />
    </div>
  );
}`,
  },
  {
    title: '3. Tailwind CSS projects — use the preset instead',
    code: `// tailwind.config.ts
import loaderPreset from 'react-loader-animate/tailwind.preset';

export default {
  presets: [loaderPreset],
  content: [
    './src/**/*.{ts,tsx}',
    'node_modules/react-loader-animate/dist/**/*.{js,cjs}',
  ],
};`,
  },
];

const UsageSection = memo(() => (
  <section id="usage" className="container mx-auto px-6 py-16 border-t border-border">
    <SectionHeader
      badge="02"
      title="Quick Start"
      description="Up and running in under a minute."
    />
    <div className="max-w-3xl space-y-6">
      {USAGE_STEPS.map(({ title, code }) => (
        <div key={title}>
          <p className="text-sm font-medium text-foreground mb-2">{title}</p>
          <CodeBlock code={code} />
        </div>
      ))}
    </div>
  </section>
));
UsageSection.displayName = 'UsageSection';

// ─── Props reference ──────────────────────────────────────────────────────────
const PropsSection = memo(() => (
  <section id="props" className="container mx-auto px-6 py-16 border-t border-border">
    <SectionHeader
      badge="03"
      title="Props Reference"
      description="Every loader accepts the same two optional props."
    />
    <div className="max-w-3xl">
      <CodeBlock
        code={`interface LoaderProps {
  /** Visual size of the loader. Default: 'md' */
  size?:    'sm' | 'md' | 'lg';

  /** Colour variant. Default: 'primary' */
  variant?: 'primary' | 'accent' | 'success' | 'warning';
}`}
        className="mb-8"
      />
      <div className="overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-muted/40">
              <th className="text-left px-4 py-3 text-muted-foreground font-medium">Prop</th>
              <th className="text-left px-4 py-3 text-muted-foreground font-medium">Type</th>
              <th className="text-left px-4 py-3 text-muted-foreground font-medium">Default</th>
              <th className="text-left px-4 py-3 text-muted-foreground font-medium">Options</th>
            </tr>
          </thead>
          <tbody>
            {[
              { prop: 'size', type: 'string', def: "'md'", opts: "'sm' | 'md' | 'lg'" },
              { prop: 'variant', type: 'string', def: "'primary'", opts: "'primary' | 'accent' | 'success' | 'warning'" },
            ].map((row, i) => (
              <tr key={row.prop} className={i % 2 === 0 ? '' : 'bg-muted/20'}>
                <td className="px-4 py-3 font-mono text-primary">{row.prop}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.type}</td>
                <td className="px-4 py-3 font-mono text-accent">{row.def}</td>
                <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{row.opts}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </section>
));
PropsSection.displayName = 'PropsSection';

// ─── Tailwind preset section ──────────────────────────────────────────────────
const TailwindSection = memo(() => (
  <section id="tailwind" className="container mx-auto px-6 py-16 border-t border-border">
    <SectionHeader
      badge="04"
      title="Tailwind CSS Preset"
      description="Already using Tailwind? Skip the CSS import and use the preset for tree-shaking-friendly styles."
    />
    <div className="max-w-3xl space-y-4">
      <CodeBlock code={`// tailwind.config.ts
import loaderPreset from 'react-loader-animate/tailwind.preset';

export default {
  presets: [loaderPreset],
  content: [
    './src/**/*.{ts,tsx}',
    // Tell Tailwind to scan the library's compiled output
    'node_modules/react-loader-animate/dist/**/*.{js,cjs}',
  ],
} satisfies Config;`} />
      <p className="text-sm text-muted-foreground">
        The preset registers all keyframes and animation utilities required by the loaders, along with the four colour tokens (<code className="font-mono text-xs">--primary</code>, <code className="font-mono text-xs">--accent</code>, <code className="font-mono text-xs">--success</code>, <code className="font-mono text-xs">--warning</code>).
        Override them in your own <code className="font-mono text-xs">:root</code> to customise the palette.
      </p>
    </div>
  </section>
));
TailwindSection.displayName = 'TailwindSection';

// ─── Loaders grid ─────────────────────────────────────────────────────────────
const LOADERS: Array<{ title: string; componentName: string; node: React.ReactNode }> = [
  { title: 'Spin Loader',      componentName: 'SpinLoader',        node: <SpinLoader /> },
  { title: 'Dots Loader',      componentName: 'DotsLoader',        node: <DotsLoader /> },
  { title: 'Pulse Loader',     componentName: 'PulseLoader',       node: <PulseLoader /> },
  { title: 'Wave Loader',      componentName: 'WaveLoader',        node: <WaveLoader /> },
  { title: 'Square Morph',     componentName: 'SquareLoader',      node: <SquareLoader /> },
  { title: 'Flip Loader',      componentName: 'FlipLoader',        node: <FlipLoader /> },
  { title: 'Gradient Spinner', componentName: 'GradientSpinner',   node: <GradientSpinner /> },
  { title: 'Orbit Loader',     componentName: 'OrbitLoader',       node: <OrbitLoader /> },
  { title: 'Triangle Loader',  componentName: 'TriangleLoader',    node: <TriangleLoader /> },
  { title: 'Diamond Loader',   componentName: 'DiamondLoader',     node: <DiamondLoader /> },
  { title: 'Cross Loader',     componentName: 'CrossLoader',       node: <CrossLoader /> },
  { title: 'Butterfly Loader', componentName: 'ButterflyLoader',   node: <ButterflyLoader /> },
  { title: 'Hexagon Loader',   componentName: 'HexagonLoader',     node: <HexagonLoader /> },
  { title: 'Segment Loader',   componentName: 'SegmentLoader',     node: <SegmentLoader /> },
  { title: 'Arrow Loader',     componentName: 'ArrowLoader',       node: <ArrowLoader /> },
  { title: 'Grid Loader',      componentName: 'GridLoader',        node: <GridLoader /> },
  { title: 'Star Loader',      componentName: 'StarLoader',        node: <StarLoader /> },
  { title: 'Pentagon Loader',  componentName: 'PentagonLoader',    node: <PentagonLoader /> },
  { title: 'Chevron Loader',   componentName: 'ChevronLoader',     node: <ChevronLoader /> },
  { title: 'Spiral Loader',    componentName: 'SpiralLoader',      node: <SpiralLoader /> },
  { title: 'Ring Loader',      componentName: 'RingLoader',        node: <RingLoader /> },
  { title: 'Clock Loader',     componentName: 'ClockLoader',       node: <ClockLoader /> },
  { title: 'Bar Loader',       componentName: 'BarLoader',         node: <BarLoader /> },
  { title: 'Bounce Ball',      componentName: 'BounceBallLoader',  node: <BounceBallLoader /> },
  { title: 'DNA Loader',       componentName: 'DNALoader',         node: <DNALoader /> },
  { title: 'Heartbeat',        componentName: 'HeartbeatLoader',   node: <HeartbeatLoader /> },
  { title: 'Cube Loader',      componentName: 'CubeLoader',        node: <CubeLoader /> },
  { title: 'Infinity Loader',  componentName: 'InfinityLoader',    node: <InfinityLoader /> },
  { title: 'Gear Loader',      componentName: 'GearLoader',        node: <GearLoader /> },
  { title: 'Pyramid Loader',   componentName: 'PyramidLoader',     node: <PyramidLoader /> },
  { title: 'Hourglass',        componentName: 'HourglassLoader',   node: <HourglassLoader /> },
  { title: 'Radar',            componentName: 'RadarLoader',       node: <RadarLoader /> },
  { title: 'Typing Dots',      componentName: 'TypingDotsLoader',  node: <TypingDotsLoader /> },
  { title: 'Pendulum',         componentName: 'PendulumLoader',    node: <PendulumLoader /> },
  { title: 'Atom',             componentName: 'AtomLoader',        node: <AtomLoader /> },
];

const SPLIT_LOADERS: Array<{ title: string; componentName: string; node: React.ReactNode }> = [
  { title: 'Corner Squares',  componentName: 'CornerSquaresLoader',  node: <CornerSquaresLoader /> },
  { title: 'Square Split',    componentName: 'SquareSplitLoader',    node: <SquareSplitLoader /> },
  { title: 'Triangle Split',  componentName: 'TriangleSplitLoader',  node: <TriangleSplitLoader /> },
  { title: 'Circle Split',    componentName: 'CircleSplitLoader',    node: <CircleSplitLoader /> },
  { title: 'Diamond Split',   componentName: 'DiamondSplitLoader',   node: <DiamondSplitLoader /> },
  { title: 'Hexagon Split',   componentName: 'HexagonSplitLoader',   node: <HexagonSplitLoader /> },
];

const MainLoadersGrid = memo(() => (
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {LOADERS.map(({ title, componentName, node }) => (
      <LoaderCard key={componentName} title={title} componentName={componentName}>
        {node}
      </LoaderCard>
    ))}
  </div>
));
MainLoadersGrid.displayName = 'MainLoadersGrid';

const SplitLoadersGrid = memo(() => (
  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
    {SPLIT_LOADERS.map(({ title, componentName, node }) => (
      <LoaderCard key={componentName} title={title} componentName={componentName}>
        {node}
      </LoaderCard>
    ))}
  </div>
));
SplitLoadersGrid.displayName = 'SplitLoadersGrid';

// ─── Bulk-import code block ───────────────────────────────────────────────────
const BULK_IMPORT = `import {
  // Basic
  SpinLoader, DotsLoader, PulseLoader, WaveLoader, GradientSpinner,
  RingLoader, BarLoader, TypingDotsLoader,
  // Shapes
  SquareLoader, TriangleLoader, DiamondLoader, CrossLoader,
  HexagonLoader, PentagonLoader, StarLoader, ArrowLoader,
  ChevronLoader, PyramidLoader, CubeLoader,
  // Motion
  FlipLoader, OrbitLoader, ButterflyLoader, SegmentLoader,
  SpiralLoader, GridLoader, BounceBallLoader, ClockLoader,
  DNALoader, HeartbeatLoader, InfinityLoader, GearLoader,
  HourglassLoader, RadarLoader, PendulumLoader, AtomLoader,
  CornerSquaresLoader,
  // Split & Transform
  SquareSplitLoader, TriangleSplitLoader, CircleSplitLoader,
  DiamondSplitLoader, HexagonSplitLoader,
} from 'react-loader-animate';`;

const ComponentsSection = memo(() => (
  <section id="loaders" className="container mx-auto px-6 py-16 border-t border-border">
    <SectionHeader
      badge="05"
      title="All Components"
      description="41+ loaders — hover any card to copy the import and usage snippet."
    />
    <div className="max-w-3xl mb-10">
      <p className="text-sm font-medium text-foreground mb-2">Import everything at once</p>
      <CodeBlock code={BULK_IMPORT} />
    </div>

    <h3 className="text-lg font-semibold text-foreground mb-6">Basic &amp; Shape Loaders</h3>
    <MainLoadersGrid />

    <LazyLoaderSection className="mt-12">
      <h3 className="text-lg font-semibold text-foreground mb-6">Split &amp; Transform Loaders</h3>
      <SplitLoadersGrid />
    </LazyLoaderSection>
  </section>
));
ComponentsSection.displayName = 'ComponentsSection';

// ─── Footer ───────────────────────────────────────────────────────────────────
const Footer = memo(() => (
  <footer className="border-t border-border mt-16">
    <div className="container mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <GradientSpinner size="sm" />
        <span className="font-mono">react-loader-animate</span>
        <span>·</span>
        <span>MIT License</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Built with React, TypeScript &amp; Tailwind CSS
      </p>
    </div>
  </footer>
));
Footer.displayName = 'Footer';

// ─── Shared SectionHeader helper ─────────────────────────────────────────────
interface SectionHeaderProps {
  badge: string;
  title: string;
  description: string;
}

const SectionHeader = memo(({ badge, title, description }: SectionHeaderProps) => (
  <div className="mb-8">
    <div className="flex items-center gap-3 mb-2">
      <span className="text-xs font-mono font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
        {badge}
      </span>
      <h2 className="text-2xl font-bold text-foreground">{title}</h2>
    </div>
    <p className="text-muted-foreground">{description}</p>
  </div>
));
SectionHeader.displayName = 'SectionHeader';

// ─── Page ─────────────────────────────────────────────────────────────────────
const Index = () => (
  <div className="min-h-screen bg-background">
    <TopNav />
    <HeroSection />
    <LazyLoaderSection>
      <InstallSection />
    </LazyLoaderSection>
    <LazyLoaderSection>
      <UsageSection />
    </LazyLoaderSection>
    <LazyLoaderSection>
      <PropsSection />
    </LazyLoaderSection>
    <LazyLoaderSection>
      <TailwindSection />
    </LazyLoaderSection>
    <LazyLoaderSection>
      <ComponentsSection />
    </LazyLoaderSection>
    <Footer />
  </div>
);

export default Index;
