import React from 'react';

import { Cta } from '../Homepage/sections/Cta';
import { HtgsSection } from './components/HtgsSection';
import { Intro } from './components/Intro';
import { htgsSections } from './models/htgsSteps';

const HTGS: React.FunctionComponent = () => (
    <>
        <Intro />
        {htgsSections.map((sectionContent, index) => (
            <HtgsSection content={sectionContent} isEven={index % 2 === 0} />
        ))}
        <Cta />
    </>
);

export default HTGS;
