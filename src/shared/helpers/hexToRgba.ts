import { hexToRgb } from './hexToRgb';

export const hexToRgba = (hex: string, alpha: number): string => `rgba(${hexToRgb(hex)}, ${alpha})`;
