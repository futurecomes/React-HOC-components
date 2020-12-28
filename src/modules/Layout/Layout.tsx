import React from 'react';
import styled from 'react-emotion';

import { PlayBar } from 'src/modules/Audio/containers/PlayBar';
import { routesWithoutFooter } from 'src/routing/routes';
import { color } from 'src/styles/variables';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { headerHeight } from './models/layoutData';

export const LayoutWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
    width: '100%',
    maxWidth: '100vw',
    overflowX: 'hidden',
    backgroundColor: color.wildSand,
});

export const Content = styled.div({
    display: 'flex',
    paddingTop: headerHeight,
    alignItems: 'center',
    flexDirection: 'column',
    flex: '1 0 auto',
});

export const Layout: React.FC = props => {
    const showPlayerWidget = window.location.pathname.includes('/player');

    return showPlayerWidget ? (
        <>{props.children}</>
    ) : (
        <LayoutWrapper>
            <Content>
                <Header />
                {props.children}
                <PlayBar />
            </Content>
            {!routesWithoutFooter.includes(window.location.pathname) && <Footer />}
        </LayoutWrapper>
    );
};
