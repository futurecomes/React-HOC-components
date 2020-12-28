import styled from 'react-emotion';

import { color, font, media } from 'src/styles/variables';

interface StepWrapperProps {
    fullWidth?: boolean;
}

export const StepWrapper = styled.div<StepWrapperProps>(({ fullWidth }) => ({
    display: 'flex',
    flexDirection: fullWidth ? 'row' : 'column',
    alignItems: 'center',
    maxWidth: fullWidth ? '100%' : media.contentWidth,
    height: fullWidth ? '100%' : 'fit-content',
}));

export const StepHeader = styled.h2({
    marginBottom: '1rem',
    span: {
        color: color.scorpion,
        fontSize: font.size.small,
    },
});

interface HalfScreenContentColumnProps {
    dark?: boolean;
    contentCentered?: boolean;
}

export const HalfScreenContentColumn = styled.div<HalfScreenContentColumnProps>(({ dark, contentCentered }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: contentCentered ? 'center' : 'flex-start',
    width: '50%',
    height: '100%',
    padding: '5rem',
    backgroundColor: dark ? color.gallery : color.alabaster,
}));
