import { FontWeight } from 'src/styles/variables';

export const font = (fontWeight: FontWeight) => (fontSize: string) => {
    const fontsWeightMap = new Map([
        [FontWeight.light, 300],
        [FontWeight.normal, 400],
        [FontWeight.bold, 700],
        [FontWeight.black, 900],
    ]);

    return {
        fontSize,
        fontWeight: fontsWeightMap.get(fontWeight) || 400,
    };
};
