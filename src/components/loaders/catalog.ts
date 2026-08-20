/** Canonical loaders that meet the v2 quality and uniqueness bar. */
export const CURATED_LOADER_NAMES = [
  'SpinLoader', 'GradientSpinner', 'ArcSpinLoader', 'DonutSpinLoader',
  'ColorRingLoader', 'DoubleRingLoader', 'NestedRingsLoader', 'DashLoader',
  'ElasticRingLoader', 'VortexLoader', 'GyroscopeLoader', 'RippleLoader',
  'ConcentricLoader', 'GlowRingLoader', 'PulseRingLoader', 'BreathingRingLoader',
  'TypingDotsLoader', 'TypewriterLoader', 'GlowDotsLoader', 'NeonDotsLoader',
  'QuadDotsLoader', 'CircleDotsLoader', 'ChasingDotsLoader', 'OrbitalDotsLoader',
  'FlipDotsLoader', 'MutatingDotsLoader', 'BarsLoader', 'WaveLoader',
  'SoundBarsLoader', 'HorizontalBarsLoader', 'LineLoader', 'ProgressBarLoader',
  'LevelMeterLoader', 'PianoKeysLoader', 'BatteryLoader', 'SignalLoader',
  'WiFiLoader', 'CountdownBarLoader', 'StaircaseLoader', 'FilmStripLoader',
  'ScanLoader', 'GridLoader', 'Grid3x3Loader', 'GridWaveLoader',
  'GridBounceLoader', 'GridRainLoader', 'GridPulseLoader', 'GridSnakeLoader',
  'HexGridLoader', 'MatrixLoader', 'CubeGridLoader', 'FlipLoader',
  'MorphLoader', 'StarLoader', 'RippleSquareLoader', 'PulsatingSquareLoader',
  'CornerSquaresLoader', 'SquaresTrailLoader', 'SpinSquaresLoader', 'SplitSquareLoader',
  'TriangleSplitLoader', 'CircleSplitLoader', 'AtomSplitLoader', 'FissionLoader',
  'PuzzleLoader', 'CollideLoader', 'ExpandContractLoader', 'OrbitLoader',
  'DoubleDotOrbitLoader', 'EllipseOrbitLoader', 'SolarSystemLoader', 'GalaxyLoader',
  'SatelliteLoader', 'AtomLoader', 'MoleculeLoader', 'DoubleHelixLoader',
  'HelixLoader', 'DNALoader', 'CometLoader', 'CometRingLoader',
  'RocketLoader', 'ConstellationLoader', 'InfinityLoader', 'RadarLoader',
  'FingerprintLoader', 'ClockLoader', 'CompassLoader', 'CrosshairLoader',
  'CircuitLoader', 'GearLoader', 'GearTrainLoader', 'CubeRotateLoader',
  'CubeUnfoldLoader', 'TesseractLoader', 'IsometricLoader', 'FoldingLoader',
  'PyramidLoader', 'HourglassLoader', 'SandTimer', 'BlobLoader',
  'PlasmaLoader', 'LiquidFillLoader', 'OrbLoader', 'FireLoader',
  'SnowflakeLoader', 'LeafLoader', 'ButterflyLoader', 'HeartbeatLoader',
  'ThunderLoader', 'PacmanLoader', 'ShimmerLoader', 'CounterLoader',
] as const;

export type CuratedLoaderName = (typeof CURATED_LOADER_NAMES)[number];
export const CURATED_LOADER_COUNT = CURATED_LOADER_NAMES.length;
