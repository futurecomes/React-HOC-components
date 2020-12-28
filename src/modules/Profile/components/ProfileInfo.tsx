import { Col, Row } from 'antd';
import React from 'react';
import styled from 'react-emotion';
import { Link } from 'react-router-dom';

import facebookIcon from 'src/public/img/facebook-black.svg';
import instagramIcon from 'src/public/img/instagram-black.svg';
import twitterIcon from 'src/public/img/twitter-black.svg';
import youtubeIcon from 'src/public/img/youtube-black.svg';

import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner';
import { ContentWrapper, SectionWrapper } from 'src/shared/styled/styles';
import { color, font, media } from 'src/styles/variables';

const placeholder = 'https://s3.amazonaws.com/messybun/Messy+Bun+Pineapple.jpg';

const UserImage = styled.img({
    display: 'block',
    width: '100%',
    maxWidth: '10rem',
    marginBottom: '0.5rem',
    [media.sm]: {
        maxWidth: '100%',
        marginBottom: 0,
    },
});

const Name = styled.h2(
    {
        marginBottom: '0.5rem',
        [media.sm]: {
            marginBottom: '1rem',
        },
    },
    font.normal(font.size.large),
);

const SocialLinks = styled.div({
    margin: '0 -0.5rem',
});

const SocialLink = styled.a({
    margin: '0 0.5rem',
    width: '1.5rem',
    height: '1.5rem',
});

interface Props {
    isFetching: boolean;
    isCurrentUser: boolean;
    name: string;
    bio?: string;
    imageUrl?: string;
    facebookUrl?: string;
    instagramUrl?: string;
    twitterUrl?: string;
    youtubeUrl?: string;
}

export const ProfileInfo: React.FC<Props> = props => {
    const socialItems = [
        props.facebookUrl && {
            title: 'Facebook',
            iconSrc: facebookIcon,
            link: `https://facebook.com/${props.facebookUrl}`,
        },
        props.instagramUrl && {
            title: 'Instagram',
            iconSrc: instagramIcon,
            link: `https://instagram.com/${props.instagramUrl}`,
        },
        props.youtubeUrl && {
            title: 'YouTube',
            iconSrc: youtubeIcon,
            link: `https://youtube.com/${props.youtubeUrl}`,
        },
        props.twitterUrl && {
            title: 'Twitter',
            iconSrc: twitterIcon,
            link: `https://twitter.com/${props.twitterUrl}`,
        },
    ];

    return (
        <SectionWrapper backgroundColor={color.botticelli}>
            <ContentWrapper>
                {props.isFetching ? (
                    <CenteredSpinner />
                ) : (
                    <Row>
                        <Col sm={8} md={6}>
                            <UserImage src={props.imageUrl || placeholder} />
                        </Col>
                        <Col sm={{ span: 15, offset: 1 }} md={{ span: 12, offset: 1 }}>
                            <Name>{props.name}</Name>
                            {props.bio && <p>{props.bio}</p>}
                            {props.isCurrentUser && <Link to="/account/personal">Edit</Link>}
                            <SocialLinks>
                                {socialItems.map(
                                    socialItem =>
                                        socialItem && (
                                            <SocialLink key={socialItem.title} href={socialItem.link} target="_blank">
                                                <img src={socialItem.iconSrc} alt={socialItem.title} />
                                            </SocialLink>
                                        ),
                                )}
                            </SocialLinks>
                        </Col>
                    </Row>
                )}
            </ContentWrapper>
        </SectionWrapper>
    );
};
