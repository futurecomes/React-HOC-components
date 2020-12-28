import React from 'react';
import styled from 'react-emotion';

import { color, font, media } from 'src/styles/variables';

const ExtraFeatureCardWrapper = styled.div({
    padding: '0.5rem',
    [media.md]: {
        flex: '0 0 50%',
    },
    [media.lg]: {
        flex: '0 0 25%',
    },
});

const ExtraFeatureCardContent = styled.div({
    display: 'flex',
    flexDirection: 'row',
    padding: '1rem',
    backgroundColor: color.white,
    [media.md]: {
        height: '100%',
        flexDirection: 'column',
    },
});

const Icon = styled.img({
    width: '3rem',
    height: 'fit-content',
    [media.md]: {
        width: 'fit-content',
        height: '3rem',
    },
});

const TextWrapper = styled.div({
    margin: '0 0 0 1rem',
    [media.md]: {
        margin: '1rem 0 0 0',
    },
});

const Title = styled.h3({
    fontSize: font.size.medium,
});

const Description = styled.p({
    fontSize: font.size.base,
});

export interface ExtraFeatureCardProps {
    title: string;
    description: string;
    icon: string;
}

export const ExtraFeatureCard: React.FC<ExtraFeatureCardProps> = ({ title, description, icon }) => (
    <ExtraFeatureCardWrapper>
        <ExtraFeatureCardContent>
            <Icon src={icon} />
            <TextWrapper>
                <Title>{title}</Title>
                <Description>{description}</Description>
            </TextWrapper>
        </ExtraFeatureCardContent>
    </ExtraFeatureCardWrapper>
);
