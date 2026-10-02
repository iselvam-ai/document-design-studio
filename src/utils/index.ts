import type { DesignConfig } from '../types';

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
    return data ? JSON.parse(data) : null;
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
    return JSON.parse(jsonString) as DesignConfig;
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
