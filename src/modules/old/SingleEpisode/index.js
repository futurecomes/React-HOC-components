import React, { Component } from 'react';
import Linkify from 'react-linkify';

import Link from 'src/shared/components/old/interactive/Link';
import { mapHtmlToString } from 'src/shared/helpers/mapHtmlToString';
import { setPageThumbnail } from 'src/shared/helpers/setPageThumbnail';
import { setPageTitle } from 'src/shared/helpers/setPageTitle';
import { TogglePlayButton } from 'src/modules/Audio/components/TogglePlayButton';

import EpisodeContainer from './containers/SingleEpisodeContainer';
import {
    ShowWrapper,
    ShowInteraction,
    ImageWrapper,
    ShowImage,
    InteractionWrapper,
    ShowInfo,
    ShowTitle,
    EpisodeTitle,
    ShowCreator,
    EpisodeDescription,
    ShowContainer,
    EpisodeDescriptionContainer,
} from './styled';

export class Show extends Component {
    componentDidMount() {
        // this needs to be rebuild one day
        setPageThumbnail(this.props.coverUrl);
        setPageTitle(this.props.title);
    }
    render() {
        const {
            creatorName,
            customCreatorName,
            episodeTitle,
            episodeDescription,
            coverUrl,
            podcastUrl,
            showId,
            showCustomUrl,
            episodeGuid,
            episodeDuration,
            showTitle,
        } = this.props;
        return (
            <ShowContainer>
                <ShowWrapper>
                    <ShowInteraction>
                        <ImageWrapper>
                            <ShowImage src={coverUrl} alt="User Profile" />
                        </ImageWrapper>
                    </ShowInteraction>

                    <ShowInfo>
                        <ShowTitle>
                            <Link alternate to={showCustomUrl ? `/${showCustomUrl}` : `/show/${showId}`}>
                                {showTitle}
                            </Link>
                        </ShowTitle>
                        <EpisodeTitle>{episodeTitle}</EpisodeTitle>
                        <ShowCreator>
                            By{' '}
                            {customCreatorName ? (
                                <Link alternate to={`/profile/${customCreatorName}`}>
                                    {creatorName}
                                </Link>
                            ) : (
                                creatorName
                            )}
                        </ShowCreator>
                        <EpisodeDescriptionContainer>
                            <Linkify properties={{ target: '_blank' }}>
                                <EpisodeDescription>{mapHtmlToString(episodeDescription)}</EpisodeDescription>
                            </Linkify>
                        </EpisodeDescriptionContainer>
                    </ShowInfo>

                    <InteractionWrapper>
                        <TogglePlayButton
                            podcast={{
                                show: showId,
                                guid: episodeGuid,
                                episodeTitle,
                                episodeDescription,
                                duration: episodeDuration,
                                url: podcastUrl,
                                creatorName,
                                imageUrl: coverUrl,
                            }}
                        />
                    </InteractionWrapper>
                </ShowWrapper>
            </ShowContainer>
        );
    }
}

export default EpisodeContainer(Show);
