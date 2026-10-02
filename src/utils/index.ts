import type { ColorPalette, DesignConfig, PageNumberFormat } from '../types';
import { PRESET_PREMIUM_CORPORATE } from '../presets';

const isObject = (value: unknown): value is Record<string, unknown> =>
  typeof value === 'object' && value !== null && !Array.isArray(value);

// Fill any fields missing from saved or imported data (e.g. designs saved by an older build)
// with defaults, so the editor never reads undefined sections and crashes.
const mergeWithDefaults = (defaults: unknown, value: unknown): unknown => {
  if (!isObject(defaults)) {
    return value === undefined || value === null ? defaults : value;
  }
  if (!isObject(value)) return defaults;
  const result: Record<string, unknown> = { ...value };
  for (const key of Object.keys(defaults)) {
    result[key] = mergeWithDefaults(defaults[key], value[key]);
  }
  return result;
};

export const normalizeDesign = (data: unknown): DesignConfig | null =>
  isObject(data) ? (mergeWithDefaults(PRESET_PREMIUM_CORPORATE, data) as DesignConfig) : null;

export const PAGE_SIZES: Record<string, { width: number; height: number }> = {
  A5: { width: 148, height: 210 },
  A4: { width: 210, height: 297 },
  A3: { width: 297, height: 420 },
  Letter: { width: 215.9, height: 279.4 },
  Legal: { width: 215.9, height: 355.6 },
};

export const FONT_FAMILIES = [
  'Arial',
  'Helvetica',
  'Georgia',
  'Times New Roman',
  'Garamond',
  'Poppins',
  'Verdana',
  'Tahoma',
];

export const saveToLocalStorage = (design: DesignConfig) => {
  try {
    localStorage.setItem('documentDesign', JSON.stringify(design));
  } catch (error) {
    console.error('Failed to save design to localStorage:', error);
  }
};

export const loadFromLocalStorage = (): DesignConfig | null => {
  try {
    const data = localStorage.getItem('documentDesign');
    return data ? normalizeDesign(JSON.parse(data)) : null;
  } catch (error) {
    console.error('Failed to load design from localStorage:', error);
    return null;
  }
};

export const exportDesignAsJson = (design: DesignConfig): string => {
  return JSON.stringify(design, null, 2);
};

export const importDesignFromJson = (jsonString: string): DesignConfig | null => {
  try {
    return normalizeDesign(JSON.parse(jsonString));
  } catch (error) {
    console.error('Failed to import design:', error);
    return null;
  }
};

export const mmToPx = (mm: number, dpi: number = 96): number => {
  return (mm * dpi) / 25.4;
};

export const pxToMm = (px: number, dpi: number = 96): number => {
  return (px * 25.4) / dpi;
};

const ROMAN_NUMERALS: Array<[number, string]> = [
  [1000, 'm'],
  [900, 'cm'],
  [500, 'd'],
  [400, 'cd'],
  [100, 'c'],
  [90, 'xc'],
  [50, 'l'],
  [40, 'xl'],
  [10, 'x'],
  [9, 'ix'],
  [5, 'v'],
  [4, 'iv'],
  [1, 'i'],
];

export const formatPageNumber = (page: number, format: PageNumberFormat): string => {
  if (format !== 'Roman') return String(page);
  let remaining = page;
  let result = '';
  for (const [value, numeral] of ROMAN_NUMERALS) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }
  return result;
};

// Colour values are either a literal CSS colour or a reference to a palette entry
// ("palette:heading"), resolved against the design's current palette when rendering.
export const PALETTE_PREFIX = 'palette:';

export const PALETTE_COLORS: Array<{ key: keyof ColorPalette; label: string }> = [
  { key: 'primary', label: 'Primary' },
  { key: 'secondary', label: 'Secondary' },
  { key: 'accent', label: 'Accent' },
  { key: 'heading', label: 'Heading' },
  { key: 'body', label: 'Body Text' },
  { key: 'muted', label: 'Muted Text' },
  { key: 'background', label: 'Page Background' },
  { key: 'tableHeader', label: 'Table Header' },
  { key: 'tableBody', label: 'Table Body' },
  { key: 'border', label: 'Border' },
  { key: 'footer', label: 'Footer' },
  { key: 'highlight', label: 'Highlight' },
];

export const paletteRef = (key: keyof ColorPalette) => `${PALETTE_PREFIX}${key}`;

export const getPaletteKey = (value: string): keyof ColorPalette | null => {
  if (!value?.startsWith(PALETTE_PREFIX)) return null;
  const key = value.slice(PALETTE_PREFIX.length);
  return PALETTE_COLORS.some((c) => c.key === key) ? (key as keyof ColorPalette) : null;
};

export const resolveColor = (value: string, palette: ColorPalette): string => {
  const key = getPaletteKey(value);
  if (key) return palette[key];
  return value?.startsWith(PALETTE_PREFIX) ? 'transparent' : value;
};
