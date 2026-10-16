/**
 * Geometry for the schematic "metro" journey map.
 *
 * Everything lives in a 600 × 600 SVG coordinate space. Real latitude /
 * longitude is projected with a simple equirectangular projection, then the
 * route between stations is redrawn octilinearly (straight down, then 45°),
 * the way transit diagrams are.
 */

export const MAP_SIZE = 600;
const SCALE = 20; // px per degree
const PAD = 10;
const LNG_MIN = 68;
const LAT_MAX = 37;

export interface Point {
  x: number;
  y: number;
}

export const project = (lat: number, lng: number): Point => ({
  x: (lng - LNG_MIN) * SCALE + PAD,
  y: (LAT_MAX - lat) * SCALE + PAD
});

/** Simplified outline of India as [lng, lat] pairs — only used to place dots. */
const INDIA_OUTLINE: [number, number][] = [
  [74.0, 37.0], [75.5, 36.5], [77.5, 35.5], [78.5, 33.0], [79.5, 32.0], [81.0, 30.2], [83.5, 28.8],
  [86.0, 27.9], [88.1, 27.8], [88.2, 26.4], [89.8, 26.7], [92.0, 26.9], [94.5, 27.8], [96.5, 28.2],
  [97.0, 27.3], [95.3, 26.0], [94.5, 24.2], [93.3, 23.0], [92.4, 22.6], [91.8, 23.9], [91.2, 23.4],
  [91.5, 24.6], [90.0, 25.2], [89.5, 25.9], [88.6, 25.4], [88.9, 24.2], [88.9, 22.0], [87.5, 21.6],
  [86.8, 20.5], [85.0, 19.3], [84.0, 18.2], [82.3, 16.6], [80.3, 15.8], [80.2, 13.3], [79.8, 11.5],
  [79.8, 10.3], [78.5, 9.0], [77.5, 8.1], [76.6, 8.9], [76.0, 10.3], [75.2, 12.0], [74.6, 13.5],
  [73.9, 15.5], [73.2, 17.5], [72.8, 19.5], [72.7, 21.0], [72.6, 22.3], [70.5, 20.8], [69.0, 22.3],
  [68.2, 23.6], [70.0, 24.5], [71.0, 26.0], [70.0, 27.8], [72.0, 29.0], [73.5, 30.0], [74.6, 31.0],
  [73.8, 33.0], [74.2, 34.5], [73.5, 35.5]
];

const outlinePoints = INDIA_OUTLINE.map(([lng, lat]) => project(lat, lng));

const isInside = ({ x, y }: Point) => {
  let inside = false;
  for (let i = 0, j = outlinePoints.length - 1; i < outlinePoints.length; j = i++) {
    const a = outlinePoints[i];
    const b = outlinePoints[j];
    if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) {
      inside = !inside;
    }
  }
  return inside;
};

/**
 * One SVG path of zero-length segments; drawn with a round line cap each
 * segment becomes a dot. ~1,000 dots in a single DOM node.
 */
export const buildDotPath = (spacing = 11): string => {
  const parts: string[] = [];
  for (let y = PAD + 5; y < MAP_SIZE; y += spacing) {
    for (let x = PAD + 5; x < MAP_SIZE; x += spacing) {
      if (isInside({ x, y })) parts.push(`M${x} ${y}h0`);
    }
  }
  return parts.join('');
};

/** Faint reference cities that help the outline read as India. */
export const referenceCities = [
  { name: 'Mumbai', ...project(19.076, 72.8777), labelSide: 'left' as const },
  { name: 'Bengaluru', ...project(12.9716, 77.5946), labelSide: 'left' as const },
  { name: 'Kolkata', ...project(22.5726, 88.3639), labelSide: 'right' as const }
];

const R2 = Math.SQRT2;
const fmt = (n: number) => Math.round(n * 10) / 10;

/**
 * Octilinear segment from `a` to `b` for one line of the bundle, shifted
 * sideways by `offset` px. Assumes the route heads south (b.y > a.y) and is
 * steeper than 45° — true for Delhi → Chennai. Goes straight down, then turns
 * 45° into the destination.
 */
export const routeSegment = (a: Point, b: Point, offset: number, overshoot = 10): string => {
  const dx = b.x - a.x;
  if (Math.abs(dx) < 0.5) {
    return `M${fmt(a.x + offset)} ${fmt(a.y)}V${fmt(b.y + overshoot)}`;
  }
  const s = Math.sign(dx);
  const corner = { x: a.x, y: b.y - Math.abs(dx) };
  // The diagonal is y - s·x = c; shifting it by `offset` keeps the bundle parallel.
  const c = corner.y - s * corner.x - s * offset * R2;
  const x = a.x + offset;
  const turnY = c + s * x;
  const end = {
    x: b.x + offset / R2 + (s * overshoot) / R2,
    y: b.y - (s * offset) / R2 + overshoot / R2
  };
  return `M${fmt(x)} ${fmt(a.y)}V${fmt(turnY)}L${fmt(end.x)} ${fmt(end.y)}`;
};

/** Angle (deg) of an interchange capsule so it sits across the arriving line. */
export const capsuleAngle = (from: Point | null, to: Point): number => {
  if (!from) return 0;
  const dx = to.x - from.x;
  if (Math.abs(dx) < 0.5) return 0;
  return -45 * Math.sign(dx);
};
