import { font as _font } from './shared';

const mediaQ = (size: number): string => `@media only screen and (min-width: ${size}px)`;

export const breakPoints = {
    xs: 380,
    sm: 576,
    md: 768,
    lg: 992,
    xl: 1200,
    xxl: 1440,
};

export const media = {
    contentWidth: 1152,
    xs: mediaQ(breakPoints.xs),
    sm: mediaQ(breakPoints.sm),
    md: mediaQ(breakPoints.md),
    lg: mediaQ(breakPoints.lg),
    xl: mediaQ(breakPoints.xl),
    xxl: mediaQ(breakPoints.xxl),
};

export const color = {
    alabaster: '#f8f8f8',
    baliHai: '#8c97b2',
    black: '#000000',
    blackPearl: '#222b36',
    blueViolet: '#654eaf',
    botticelli: '#ebf3ff',
    brightShadow: 'rgba(255,255,255,0.1)',
    coral: '#ff4040',
    danube: '#6c8ad2',
    fog: '#d8e2ff',
    gallery: '#ededed',
    imperialRed: '#ed2939',
    linkWater: '#dae5f7',
    mystic: '#dadfea',
    royalBlueTransparent: '#3c82e725',
    royalBlue: '#3c82e7',
    sail: '#b0c4f9',
    scorpion: '#5a5a5a',
    silverChalice: '#a1a1a1',
    silverSand: '#c7cccc',
    solitude: '#f2f4f9',
    trout: '#535a66',
    tundora: '#434343',
    white: '#ffffff',
    wildSand: '#f5f5f5',
    zumthor: '#ebf3ff',
    darkGray: '#444444',
};

interface FontSize {
    extraSmall: '0.8rem';
    small: '0.85rem';
    base: '1rem';
    medium: '1.25rem';
    mediumLarge: '1.5rem';
    large: '2rem';
    xLarge: '2.5rem';
    extraLarge: '3rem';
}

export enum FontWeight {
    light = 'light',
    normal = 'normal',
    medium = 'medium',
    bold = 'bold',
    black = 'black',
}

interface Font extends Record<FontWeight, (fontSize?: string) => { fontSize: string; fontWeight: number }> {
    size: FontSize;
    weight: Record<FontWeight, number>;
}

export const font: Font = {
    light: _font(FontWeight.light),
    normal: _font(FontWeight.normal),
    medium: _font(FontWeight.medium),
    bold: _font(FontWeight.bold),
    black: _font(FontWeight.black),
    size: {
        extraSmall: '0.8rem',
        small: '0.85rem',
        base: '1rem',
        medium: '1.25rem',
        mediumLarge: '1.5rem',
        large: '2rem',
        xLarge: '2.5rem',
        extraLarge: '3rem',
    },
    weight: {
        light: 300,
        normal: 400,
        medium: 500,
        bold: 700,
        black: 900,
    },
};
