import React from 'react';
import styled from 'react-emotion';

import facebookIconBlack from 'src/public/img/facebook-black.svg';
import facebookIconWhite from 'src/public/img/facebook-circle.svg';
import facebookGroupIconBlack from 'src/public/img/facebook-group-black.svg';
import facebookGroupIconWhite from 'src/public/img/facebook-group.svg';
import instagramIconBlack from 'src/public/img/instagram-black.svg';
import instagramIconWhite from 'src/public/img/instagram-circle.svg';
import linkedInIconBlack from 'src/public/img/linked-in-black.svg';
import linkedInIconWhite from 'src/public/img/linked-in.svg';
import twitterIconBlack from 'src/public/img/twitter-black.svg';
import twitterIconWhite from 'src/public/img/twitter-circle.svg';

import { color, font } from 'src/styles/variables';

interface Props {
    centered?: boolean;
    light?: boolean;
    smallHeader?: boolean;
}

const Header = styled.h3<Props>(
    ({ light }) => ({
        margin: '3rem 0 0.5rem',
        color: light ? color.white : 'inherit',
    }),
    ({ smallHeader }) => (smallHeader ? font.normal(font.size.small) : font.light(font.size.base)),
);

const Links = styled.div<Props>(({ centered }) => ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: centered ? 'center' : 'flex-start',
    margin: '0 -0.5rem',
}));

const Link = styled.a({
    margin: '0 0.5rem 0.75rem',
    width: '1.5rem',
    height: '1.5rem',
});

export const Community: React.FC<Props> = ({ centered, light, smallHeader }) => {
    const communityItems = [
        {
            title: 'Facebook',
            iconSrc: light ? facebookIconWhite : facebookIconBlack,
            link: 'https://www.facebook.com/GetMessyNow',
        },
        {
            title: 'Facebook group',
            iconSrc: light ? facebookGroupIconWhite : facebookGroupIconBlack,
            link: 'https://www.facebook.com/groups/newpodcasters',
        },
        {
            title: 'Instagram',
            iconSrc: light ? instagramIconWhite : instagramIconBlack,
            link: 'https://www.instagram.com/messy.fm',
        },
        {
            title: 'LinkedIn',
            iconSrc: light ? linkedInIconWhite : linkedInIconBlack,
            link: 'https://www.linkedin.com/company/messyfm',
        },
        {
            title: 'Twitter',
            iconSrc: light ? twitterIconWhite : twitterIconBlack,
            link: 'https://twitter.com/messyfm',
        },
    ];

    return (
        <>
            <Header light={light} smallHeader={smallHeader}>
                Community:
            </Header>
            <Links centered={centered}>
                {communityItems.map(({ title, iconSrc, link }) => (
                    <Link key={title} href={link} target="_blank">
                        <img src={iconSrc} alt={title} />
                    </Link>
                ))}
            </Links>
        </>
    );
};
