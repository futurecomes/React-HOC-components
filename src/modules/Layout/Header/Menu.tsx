import { noop } from 'lodash';
import React from 'react';
import styled from 'react-emotion';
import { NavLink } from 'react-router-dom';

import { color, media } from 'src/styles/variables';

import { HeaderRoute } from '../models/layout';
import { adminRoutes, signedIdRoutes, signedOutRoutes } from '../models/layoutData';
import { Hamburger } from './Hamburger';

interface MenuProps {
    isExpanded: boolean;
}

export const MenuWrapper = styled.div<MenuProps>(({ isExpanded }) => ({
    position: 'absolute',
    display: 'flex',
    width: '100vw',
    height: '100vh',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: color.blackPearl,
    opacity: isExpanded ? 1 : 0,
    visibility: isExpanded ? 'visible' : 'hidden',
    transition: 'opacity 0.2s',
    [media.lg]: {
        width: 'fit-content',
        height: '100%',
        position: 'relative',
        backgroundColor: 'transparent',
        flexDirection: 'row',
        top: 0,
        opacity: 1,
        visibility: 'visible',
    },
}));

interface LinkProps {
    islinkactive: number;
}

export const Link = styled(NavLink)<LinkProps>(
    {
        position: 'relative',
        textDecoration: 'none',
        color: color.solitude,
        margin: '0 0 2rem',
        fontSize: 16,
        '&:after': {
            content: '""',
            display: 'block',
            position: 'absolute',
            width: '100%',
            height: 2,
            backgroundColor: color.scorpion,
            bottom: -3,
            left: 0,
            opacity: 0,
            transition: 'opacity 0.2s, bottom 0.2s',
        },
        '&:hover': {
            color: color.solitude,

            '&:after': {
                opacity: 1,
                bottom: -1,
            },
        },
        '&:focus': {
            textDecoration: 'none',
        },
        [media.lg]: {
            margin: '0 1rem',
            '&:last-child': {
                marginRight: 0,
            },
        },
    },
    ({ islinkactive }) =>
        islinkactive && {
            '&:after': {
                opacity: 1,
                bottom: -1,
                backgroundColor: color.royalBlue,
            },
        },
);

interface Props {
    isAuthenticated: boolean;
    isAdmin: boolean;
}

interface State {
    isExpanded: boolean;
}

export class Menu extends React.Component<Props, State> {
    public state: State = {
        isExpanded: false,
    };

    private isLinkActive = (link: string) => location.pathname.includes(link);

    public toggleMenu = () => this.setState(state => ({ isExpanded: !state.isExpanded }));

    public closeMenu = () => this.setState({ isExpanded: false });

    private renderLinks = (routes: HeaderRoute[]) =>
        routes.map(route => (
            <Link
                key={route.title}
                to={route.to}
                islinkactive={this.isLinkActive(route.to) ? 1 : 0} // Throws error in console if boolean
                onClick={this.closeMenu}
            >
                {route.title}
            </Link>
        ));

    public render(): JSX.Element {
        const { isAuthenticated, isAdmin } = this.props;

        return (
            <>
                <MenuWrapper isExpanded={this.state.isExpanded} onClick={this.state.isExpanded ? this.closeMenu : noop}>
                    {this.renderLinks(isAuthenticated ? (isAdmin ? adminRoutes : signedIdRoutes) : signedOutRoutes)}
                </MenuWrapper>
                <Hamburger onClick={this.toggleMenu} isExpanded={this.state.isExpanded} />
            </>
        );
    }
}
