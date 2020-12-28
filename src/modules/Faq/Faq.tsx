import React from 'react';
import styled from 'react-emotion';

import standingWomanIcon from 'src/public/img/standing-woman.svg';

import { Cta } from 'src/modules/Homepage/sections/Cta';
import { SectionWrapper } from 'src/shared/styled/styles';
import { ContentWrapper } from 'src/styles/sections';
import { color, font, media } from 'src/styles/variables';

import { FaqSection } from './components/FaqSection';
import { billingQuestions } from './models/billingQuestions';
import { companyQuestions } from './models/companyQuestions';
import { productQuestions } from './models/productQuestions';

const FaqContentWrapper = styled.div({
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif', // to be added to the whole app, only on new pages for now
    position: 'relative',
    maxWidth: '40rem',
    margin: '0 auto',
    backgroundColor: color.white,
    padding: '2rem',
    border: `1px solid ${color.gallery}`,
    borderRadius: '0.25rem',
    boxShadow: `0 0 1rem ${color.gallery}`,
    [media.md]: {
        marginTop: '3rem',
    },
    [media.lg]: {
        maxWidth: '50rem',
    },
});

const Header = styled.h2(
    {
        textAlign: 'center',
        marginBottom: '2rem',
    },
    font.normal(font.size.large),
);

const StandingWomanIcon = styled.img({
    display: 'none',
    position: 'absolute',
    width: '12rem',
    top: '-2rem',
    right: '-9rem',
    zIndex: -1,
    [media.md]: {
        display: 'block',
    },
});

const FAQ: React.FC = () => (
    <>
        <SectionWrapper backgroundColor={color.solitude}>
            <ContentWrapper>
                <FaqContentWrapper>
                    <Header>Frequently Asked Questions</Header>
                    <FaqSection title="Product" questions={productQuestions} />
                    <FaqSection title="Billing" questions={billingQuestions} />
                    <FaqSection title="Company" questions={companyQuestions} />
                    <StandingWomanIcon src={standingWomanIcon} />
                </FaqContentWrapper>
            </ContentWrapper>
        </SectionWrapper>
        <Cta />
    </>
);

export default FAQ;
