import React from 'react';
import styled from 'react-emotion';

import { Cta } from './sections/Cta';
import { ExtraFeatures } from './sections/ExtraFeatures/ExtraFeatures';
import { FirstLook } from './sections/FirstLook/FirstLook';
import { MainFeatures } from './sections/MainFeatures/MainFeatures';
import { Testimonials } from './sections/Testimonials';

const HomepageWrapper = styled.div({
    width: '100%',
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif', // to be added to the whole app, only on new pages for now
});

const Homepage: React.FC = () => (
    <HomepageWrapper>
        <FirstLook />
        <MainFeatures />
        <Cta hideOnDesktop />
        <ExtraFeatures />
        <Testimonials />
        <Cta />
    </HomepageWrapper>
);

export default Homepage;
