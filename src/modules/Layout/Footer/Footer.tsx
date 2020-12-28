import { Col, Row } from 'antd';
import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

import logo from 'src/public/img/logo_messy_v1.svg';

import { Community } from 'src/modules/Auth/components/Community';
import { Button } from 'src/shared/components/Button';
import { ContentWrapper, SectionWrapper } from 'src/styles/sections';
import { color, font, media } from 'src/styles/variables';

const siteLinkBaseStyle = {
    color: color.white,
    '&:hover': {
        color: color.white,
        textDecoration: 'underline',
    },
};

const FooterContentWrapper = styled(ContentWrapper)(
    {
        color: color.white,
        a: siteLinkBaseStyle,
    },
    font.light(font.size.base),
);

const Logo = styled.img({
    cursor: 'pointer',
    height: '1.5rem',
    marginBottom: '0.75rem',
});

const Subscribe = styled.div({
    marginBottom: '3rem',
    paddingBottom: '3rem',
    borderBottom: `1px solid ${color.scorpion}`,
    [media.md]: {
        border: 'none',
        margin: 0,
        padding: 0,
    },
});

const SiteLink = styled(Link)(siteLinkBaseStyle, {
    display: 'block',
    marginBottom: '1rem',
});

const Contact = styled.p({
    marginBottom: 0,
});

const Bottom = styled.div(
    {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: '2rem',
        paddingTop: '3rem',
        borderTop: `1px solid ${color.scorpion}`,
        [media.md]: {
            marginTop: '3rem',
            border: 'none',
        },
    },
    font.light(font.size.small),
);

const Copyright = styled.span({
    display: 'block',
});

const BottomLink = styled(Link)(siteLinkBaseStyle, {
    display: 'inline-block',
    marginLeft: '2rem',
});

export const Footer: React.FunctionComponent = () => (
    <SectionWrapper backgroundColor={color.blackPearl}>
        <FooterContentWrapper>
            <Logo src={logo} alt="Messy.fm" />
            <Row type="flex">
                <Col xs={24} md={6}>
                    <Subscribe>
                        <p>
                            Subscribe to our newsletter TheMessy. We share three tips every week: how to have a better
                            show; how to get more listeners; and how to make money with your podcast.
                        </p>
                        <a
                            href="https://messy.us14.list-manage.com/subscribe/post?u=2a705baae62deaa32a22493a2&amp;id=447e9204ef"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <Button small>Subscribe</Button>
                        </a>
                    </Subscribe>
                </Col>
                <Col xs={12} md={{ span: 6, offset: 4 }} xl={{ span: 4, offset: 8 }}>
                    <SiteLink to="/about">About</SiteLink>
                    <SiteLink to="/listen">Listen</SiteLink>
                    <SiteLink to="/pricing">Pricing</SiteLink>
                    <SiteLink to="/faqs">FAQ</SiteLink>
                    <SiteLink to="/how-to-get-started">Get Started</SiteLink>
                </Col>
                <Col xs={{ span: 11, offset: 1 }} md={{ span: 6, offset: 2 }} xl={{ span: 5, offset: 1 }}>
                    <Contact>
                        Contact:
                        <br />
                        <a href="mailto:help@messy.fm">help@messy.fm</a>
                    </Contact>
                    <Community light />
                </Col>
            </Row>
            <Bottom>
                <Copyright>&#9400; {new Date().getFullYear()} MESSY.FM – All rights reserved</Copyright>
                <div>
                    <BottomLink to="terms">Terms of Service</BottomLink>
                    <BottomLink to="privacy">Privacy Policy</BottomLink>
                </div>
            </Bottom>
        </FooterContentWrapper>
    </SectionWrapper>
);
