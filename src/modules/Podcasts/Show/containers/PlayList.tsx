import { Col, Collapse, Row } from 'antd';
import React, { FunctionComponent } from 'react';
import styled from 'react-emotion';
import Linkify from 'react-linkify';
import { connect } from 'react-redux';

import { AppState } from 'src/config/appState';
import { linkToSinglePodcast } from 'src/modules/Podcasts/helpers/helpers';
import { Episode } from 'src/modules/Podcasts/models/podcasts';
import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner';
import { mapHtmlToString } from 'src/shared/helpers/mapHtmlToString';
import { formatTimeWithHiddenLeadingZeroHours } from 'src/shared/helpers/time';
import { color, font } from 'src/styles/variables';

import { EpisodeDetails } from '../components/EpisodeDetails';
import { getCurrentPlayingPodcastGuid, getSingleShowEpisodes, isPodcastsFetching } from '../showSelectors';

interface PanelProps {
    isCurrentlyPlaying: boolean;
}

const Panel = styled(Collapse.Panel)<PanelProps>(({ isCurrentlyPlaying }) => ({
    '&.ant-collapse-item': {
        backgroundColor: isCurrentlyPlaying ? color.botticelli : color.solitude,
        border: 'none',

        '> .ant-collapse-header': {
            paddingBottom: '0.25rem',
        },
        '.ant-collapse-item-active': {
            backgroundColor: 'transparent',
        },
    },
}));

const EpisodeDescription = styled.p({
    whiteSpace: 'pre-line',
    fontSize: font.size.extraSmall,
});

interface StateProps {
    isFetching: boolean;
    currentPlayingPodcastGuid: string;
    episodes: Episode[];
}

export const PlayListContainer: FunctionComponent<StateProps> = ({ isFetching, episodes, currentPlayingPodcastGuid }) =>
    isFetching ? (
        <CenteredSpinner />
    ) : (
        <Collapse bordered={false}>
            {episodes &&
                episodes.map(episode => (
                    // The whole Panel could be different component but when moved it does not work properly with Collapse
                    <Panel
                        key={episode.id}
                        isCurrentlyPlaying={currentPlayingPodcastGuid === episode.guid}
                        showArrow={false}
                        header={
                            <EpisodeDetails
                                isCurrentlyPlaying={currentPlayingPodcastGuid === episode.guid}
                                episode={episode}
                                title={episode.title}
                                duration={formatTimeWithHiddenLeadingZeroHours(episode.duration * 1000)}
                                link={linkToSinglePodcast(episode.guid)}
                            />
                        }
                    >
                        <Row>
                            {/* used columns here so it matches the panel header */}
                            <Col xs={2} />
                            <Col xs={22}>
                                <Linkify properties={{ target: '_blank' }}>
                                    <EpisodeDescription>{mapHtmlToString(episode.description)}</EpisodeDescription>
                                </Linkify>
                            </Col>
                        </Row>
                    </Panel>
                ))}
        </Collapse>
    );

export const PlayList = connect((state: AppState) => ({
    isFetching: isPodcastsFetching(state),
    episodes: getSingleShowEpisodes(state),
    currentPlayingPodcastGuid: getCurrentPlayingPodcastGuid(state),
}))(PlayListContainer);
