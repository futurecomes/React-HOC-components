import React from 'react';
import styled from 'react-emotion';

import downloadIcon from 'src/shared/components/old/shared/static/svg/ic_cloud_download.svg';
import deleteIcon from 'src/shared/components/old/shared/static/svg/ic_delete.svg';
import publishIcon from 'src/shared/components/old/shared/static/png/ic_publish.png';

import { TogglePlayButton } from 'src/modules/Audio/components/TogglePlayButton';
import { IconFont } from 'src/shared/components/old/IconFont';
import formatTime from 'src/shared/helpers/formatTime';
import { formatDate } from 'src/shared/helpers/datetime';

import * as S from './styled';

const ExternalShowImage = styled.img({
    cursor: 'pointer',
});

const EpisodeActionImage = styled.img({
    height: 18,
    cursor: 'pointer',
    margin: '0 0.375rem',
    transform: 'rotate(180deg)',
    filter: 'grayscale(100%)',
});

const DownloadIcon = styled.img({
    margin: '0 0.5rem',
});

export class Episode extends React.PureComponent {
    deletePodcast = () => this.props.deletePodcast(this.props.episode);

    unpublishPodcast = () => {
        const {
            updateEpisode,
            episode: { guid, show, released },
        } = this.props;

        if (window.confirm(`Are you sure you want to ${released ? 'unpublish' : 'publish'} this episode?`)) {
            updateEpisode(guid, show, { released: !released });
        }
    };

    openSettings = () => this.props.openEditEpisodeModal(this.props.episode);

    render() {
        const { episode = {}, index, isPaidUser, isExternalShow } = this.props;

        return (
            <S.Row>
                <S.Cell align="left">{index}</S.Cell>
                <S.Cell flex="3">{episode.title}</S.Cell>
                <S.Cell flex="2" hideOnMobile>
                    {formatTime(episode.duration)}
                </S.Cell>
                {isPaidUser && <S.Cell flex="3">{episode.totalListens}</S.Cell>}
                <S.Cell flex="5" hideOnMobile>
                    {formatDate(episode.releasedAt)}
                </S.Cell>
                <S.Cell flex="4" align="right" manage>
                    <TogglePlayButton podcast={episode} isSmall />
                    <S.Manage>
                        <a href={episode.url} download title="Download episode">
                            <DownloadIcon alt="download" src={downloadIcon} />
                        </a>
                        {!isExternalShow && (
                            <ExternalShowImage
                                alt="delete episode"
                                title="Delete Episode"
                                src={deleteIcon}
                                onClick={this.deletePodcast}
                            />
                        )}
                        <EpisodeActionImage
                            alt="episode action"
                            title={episode.released ? 'Unpublish Episode' : 'Publish Episode'}
                            src={publishIcon}
                            onClick={this.unpublishPodcast}
                        />
                        {!isExternalShow && (
                            <IconFont title="settings" type="azure" onClick={this.openSettings}>
                                settings
                            </IconFont>
                        )}
                    </S.Manage>
                </S.Cell>
            </S.Row>
        );
    }
}
