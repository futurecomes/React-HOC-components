import React from 'react';
import styled from 'react-emotion';

import { color, font, media } from 'src/styles/variables';

import * as texts from '../models/aboutTexts.json';

const AboutTextWrapper = styled('div')({
    backgroundColor: color.zumthor,
    height: '100%',
    padding: '1.5rem',
    [media.xl]: {
        padding: '4.5rem',
    },
});

const Header = styled('h2')({
    fontSize: font.size.mediumLarge,
    margin: '1rem 2rem',
    lineHeight: 1.2,
    textAlign: 'center',
    [media.xl]: {
        fontSize: font.size.xLarge,
        margin: '2rem 0',
    },
});

interface ParagraphProps {
    bold?: boolean;
}

const Paragraph = styled.p<ParagraphProps>(({ bold }) => ({
    fontWeight: bold ? font.weight.bold : font.weight.normal,
    fontSize: font.size.base,
    textAlign: 'center',
    [media.md]: {
        textAlign: 'left',
    },
}));

export const AboutText: React.FC = () => (
    <AboutTextWrapper>
        <Header>{texts.about.header}</Header>
        {texts.about.descriptions.map(description => (
            <Paragraph bold={description.bold} key={description.text}>
                {description.text}
            </Paragraph>
        ))}
    </AboutTextWrapper>
);
