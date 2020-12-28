import { Icon } from 'antd';
import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { AppState } from 'src/config/appState';
import { getUserLoginStatus, getUserToken } from 'src/modules/Auth/selectors/authSelectors';
import { subscribe } from 'src/modules/Podcasts/actions/oldPodcastsActions';
import { Show } from 'src/modules/Podcasts/models/podcasts';
import { setPageThumbnail } from 'src/shared/helpers/setPageThumbnail';
import { setPageTitle } from 'src/shared/helpers/setPageTitle';
import { linkStyles } from 'src/shared/styled/tileLinks';
import { color, font, media } from 'src/styles/variables';

import { ShowLinks } from '../components/ShowLinks';

const ShowDetailsWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '5rem',
    [media.lg]: {
        alignItems: 'start',
    },
});

const Image = styled.img({
    width: '10rem',
    height: '10rem',
    objectFit: 'cover',
});

const Title = styled.h2({
    color: color.tundora,
    fontSize: font.size.mediumLarge,
    textAlign: 'center',
    [media.lg]: {
        marginBottom: 0,
        textAlign: 'left',
        fontSize: font.size.large,
    },
});

const Author = styled.h3({
    color: color.tundora,
    fontSize: font.size.base,
    textAlign: 'center',
    [media.lg]: {
        marginBottom: '1rem',
        textAlign: 'left',
        fontSize: font.size.medium,
    },
});

const AuthorName = styled.span({
    textDecoration: 'underline',
});

const SubscribeButton = styled.button(linkStyles, {
    margin: '0 0 0.5rem 0',
    i: {
        marginRight: '0.5rem',
    },
});

const Description = styled.p({
    color: color.tundora,
    lineHeight: 1.75,
    fontSize: font.size.small,
    textAlign: 'center',
    [media.lg]: {
        textAlign: 'left',
    },
});

const Badge = styled.div({
    borderRadius: '0.25rem',
    backgroundColor: color.linkWater,
    padding: '0.5rem',
    marginBottom: '0.5rem',
    [media.lg]: {
        marginBottom: '1rem',
    },
});

interface StateProps {
    token: string;
    isUserLoggedIn: boolean;
}

interface ActionsProps {
    subscribe: typeof subscribe;
}

interface Props extends StateProps, ActionsProps {
    show: Show;
}

export const ShowDetailsContainer: React.FC<Props> = ({ show, isUserLoggedIn, token, subscribe }) => {
    const [initialized, setInitialized] = React.useState(false);
    React.useEffect(() => {
        if (!initialized) {
            setPageThumbnail(show.imageUrl);
            setPageTitle(show.title);
            setInitialized(true);
        }
    });

    const handleSubscribe = () => subscribe(show.id);

    return (
        <ShowDetailsWrapper>
            <Image alt={show.title} src={show.imageUrl} />
            <Title>{show.title}</Title>
            <Author>
                By{' '}
                {show.userUrl ? (
                    <Link to={`/profile/${show.userUrl}`}>
                        <AuthorName>{show.creatorName}</AuthorName>
                    </Link>
                ) : (
                    show.creatorName
                )}
            </Author>
            {(show.isTrending && <Badge>Is Trending Now</Badge>) ||
                (show.wasTrending && <Badge>Previously Top &amp; Trending</Badge>)}
            {isUserLoggedIn && (
                <SubscribeButton onClick={handleSubscribe}>
                    <Icon type={show.isSubscribed ? 'minus-circle' : 'plus-circle'} />
                    {show.isSubscribed ? 'Unsubscribe' : 'Subscribe'}
                </SubscribeButton>
            )}
            <Description>{show.description}</Description>
            <ShowLinks show={show} token={token} isUserLoggedIn={isUserLoggedIn} />
        </ShowDetailsWrapper>
    );
};

export const ShowDetails = connect(
    (state: AppState) => ({
        isUserLoggedIn: getUserLoginStatus(state),
        token: getUserToken(state),
    }),
    {
        subscribe,
    },
)(ShowDetailsContainer);
