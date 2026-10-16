import type { AccentId, LineId } from '../types';

/**
 * Class names are spelled out in full so Tailwind can find them.
 * `fill` is the solid base colour (safe under text), `tint` the brighter
 * variant for small dots and lines on dark surfaces.
 */
export const lineStyles: Record<
  LineId,
  { label: string; code: string; fill: string; onFill: string; tint: string; ring: string; tintHex: string }
> = {
  frontend: {
    label: 'Frontend',
    code: 'F',
    fill: 'bg-line-frontend',
    onFill: 'text-white',
    tint: 'bg-tint-frontend',
    ring: 'border-line-frontend',
    tintHex: '#e8604a'
  },
  backend: {
    label: 'Backend',
    code: 'B',
    fill: 'bg-line-backend',
    onFill: 'text-white',
    tint: 'bg-tint-backend',
    ring: 'border-line-backend',
    tintHex: '#5b86f0'
  },
  devops: {
    label: 'DevOps',
    code: 'D',
    fill: 'bg-line-devops',
    onFill: 'text-white',
    tint: 'bg-tint-devops',
    ring: 'border-line-devops',
    tintHex: '#2fb07e'
  },
  tools: {
    label: 'Tools',
    code: 'T',
    fill: 'bg-line-tools',
    onFill: 'text-[#15171c]',
    tint: 'bg-tint-tools',
    ring: 'border-tools-strong',
    tintHex: '#f2b01e'
  }
};

export const lineOrder: LineId[] = ['frontend', 'backend', 'devops', 'tools'];

export const accentStyles: Record<AccentId, { fill: string; onFill: string; bar: string; border: string }> = {
  red: { fill: 'bg-line-frontend', onFill: 'text-white', bar: 'bg-line-frontend', border: 'border-white' },
  blue: { fill: 'bg-line-backend', onFill: 'text-white', bar: 'bg-line-backend', border: 'border-white' },
  green: { fill: 'bg-line-devops', onFill: 'text-white', bar: 'bg-line-devops', border: 'border-white' },
  amber: { fill: 'bg-line-tools', onFill: 'text-[#15171c]', bar: 'bg-line-tools', border: 'border-[#15171c]' },
  purple: { fill: 'bg-line-purple', onFill: 'text-white', bar: 'bg-line-purple', border: 'border-white' }
};
