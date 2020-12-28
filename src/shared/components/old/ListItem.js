import React from 'react';
import styled from 'react-emotion';
import { truncate as _truncate } from 'lodash';
import Linkify from 'react-linkify';
import { mobile, tablet, colors, css } from 'src/styles/old';

import { TogglePlayButton } from 'src/modules/Audio/components/TogglePlayButton';
import Link from 'src/shared/components/old/interactive/Link';
import { formatDate } from 'src/shared/helpers/time';
import formatTime from 'src/shared/helpers/formatTime';
import { mapHtmlToString } from 'src/shared/helpers/mapHtmlToString';

import downArrow from './static/svg/down-arrow.svg';
import upArrow from './static/svg/up-arrow.svg';
import styles from './Podcast/styles';

const tabletMax = tablet.high('max-width');
const mobileBP2 = mobile.high('max-width');

const ShowArt = styled.img({
    width: 200,
    height: 200,
    borderRadius: '10px 0 0 10px',
    objectFit: 'cover',

    [mobileBP2]: {
        width: 100,
        height: 100,
        minWidth: 100,
    },
});

const Title = styled.div({
    fontSize: 16,
    [mobileBP2]: {
        marginBottom: 20,
    },
    [tabletMax]: {
        fontSize: 12,
    },
});

const ShowTitle = styled.div({
    color: colors.black54,
    fontWeight: 500,
    fontSize: '0.85rem',
    marginBottom: 10,

    [tabletMax]: {
        fontSize: 10,
    },
});

const DescriptionWrapper = styled.div({
    position: 'relative',
    fontSize: 13,
    [mobileBP2]: {
        display: 'none',
    },
});

const Description = styled.p({});

const Arrow = styled.img({
    cursor: 'pointer',
    position: 'absolute',
    left: '50%',
    transform: 'translateX(-50%)',
    top: '100%',
    marginTop: 3,
    fontSize: 12,
});

class ListItem extends React.PureComponent {
    state = {
        description: mapHtmlToString(this.props.podcast.description),
        title: mapHtmlToString(this.props.podcast.title),
        expanded: false,
    };

    buildCaptionTitle = () => {
        const { creatorName, customUrl, show, showTitle, showUrl } = this.props.podcast;
        const name = creatorName ? _truncate(creatorName, { length: 30 }) : '';
        const creator = customUrl ? (
            <Link to={`/profile/${customUrl}`} alternate>
                {name}
            </Link>
        ) : (
            name
        );
        const isShowUrlValid = showUrl && !/\W/.test(showUrl);
        return (
            <div>
                <Link to={isShowUrlValid ? `/${showUrl}` : `/show/${show}`} alternate>
                    {showTitle}
                </Link>{' '}
                by {creator}
            </div>
        );
    };

    onClick = () => {
        this.setState(state => ({ expanded: !state.expanded }));
    };

    onImageError = e => {
        e.target.src = 'https://s3.amazonaws.com/messybun/Messy+Bun+Pineapple.jpg';
    };

    render() {
        const { podcast } = this.props;
        const { title, description, expanded } = this.state;
        const length = expanded ? description.length : 96;
        const canExpand = description.length > 150;

        return (
            <div
                className={css(styles.listItemContainer)}
                style={expanded ? { height: '100%' } : null}
                css={{
                    boxShadow: '0 5px 10px rgba(0,0,0,0.19), 0 0 3px rgba(0,0,0,0.23)',
                    borderRadius: 10,
                }}
            >
                <ShowArt onError={this.onImageError} src={podcast.imageUrl} alt="show art" />
                <div className={css(styles.liContent)}>
                    <Title>
                        <ShowTitle>{this.buildCaptionTitle()}</ShowTitle>
                        <Link to={`/show/${podcast.show}`} style={styles.title}>
                            {_truncate(title, { length })}
                        </Link>
                    </Title>
                    <Linkify properties={{ target: '_blank' }}>
                        <DescriptionWrapper>
                            <Description>{_truncate(description, { length })} </Description>
                            {canExpand && <Arrow onClick={this.onClick} src={expanded ? upArrow : downArrow} />}
                        </DescriptionWrapper>
                    </Linkify>
                    <span className={css(styles.info)}>
                        <span className={css(styles.infoItem)}>
                            {`Released ${formatDate(podcast.releasedAt || podcast.createdAt)} `}
                        </span>

                        <span className={css(styles.infoItem)}>{`Length ${formatTime(podcast.duration)}`}</span>
                    </span>
                </div>

                <div className={css(styles.actionWrapper)}>
                    <TogglePlayButton
                        podcast={podcast}
                        showId={podcast.show}
                        episodeId={podcast.guid}
                        className={css(styles.btnPlay)}
                    />
                </div>
            </div>
        );
    }
}

export default ListItem;
