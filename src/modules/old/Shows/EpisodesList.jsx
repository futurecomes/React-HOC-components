import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import _orderBy from 'lodash/orderBy'
import styled from 'react-emotion'

import container from 'src/containers/Shows/ShowEpisodes'
import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner'

import { EpisodesListHeader } from './EpisodesListHeader'
import { Episode } from './Episode'
import { EditEpisodeModal } from './EditEpisodeModal'
import * as S from './styled'

const NoEpisodesInfo = styled.p({
    width: '100%',
})

class EpisodesListContainer extends Component {
    componentDidMount() {
        const { fetchShowEpisodes, show } = this.props

        fetchShowEpisodes(show.id)
    }

    getShowEpisodes = () =>
        this.props.episodes[this.props.show.id]
            ? _orderBy(this.props.episodes[this.props.show.id], e => -new Date(e.releasedAt))
            : null

    render() {
        const episodes = this.getShowEpisodes()

        const {
            isPaidUser,
            deletePodcast,
            openEditEpisodeModal,
            editEpisodeForm,
            closeEditEpisodeModal,
            updateEpisode,
        } = this.props

        return episodes ? (
            <React.Fragment>
                <S.EpisodesListRow header>
                    <EpisodesListHeader isPaidUser={isPaidUser} />
                </S.EpisodesListRow>
                <S.EpisodesListRow>
                    {episodes.length ? (
                        episodes.map((episode, i) => (
                            <React.Fragment key={episode.guid}>
                                {episode.guid === editEpisodeForm.guid && (
                                    <EditEpisodeModal
                                        episode={episode}
                                        closeEditEpisodeModal={closeEditEpisodeModal}
                                        editEpisodeForm={editEpisodeForm}
                                        updateEpisode={updateEpisode}
                                        isUpdatingEpisode={this.props.isUpdatingEpisode}
                                    />
                                )}
                                <Episode
                                    index={i + 1}
                                    isExternalShow={this.props.show.isExternal}
                                    deletePodcast={deletePodcast}
                                    updateEpisode={updateEpisode}
                                    episode={episode}
                                    isPaidUser={isPaidUser}
                                    openEditEpisodeModal={openEditEpisodeModal}
                                />
                            </React.Fragment>
                        ))
                    ) : (
                        <NoEpisodesInfo>
                            This show doesn’t have any episodes.&nbsp;Click New Episode to upload or record
                            the first episode
                        </NoEpisodesInfo>
                    )}
                </S.EpisodesListRow>
            </React.Fragment>
        ) : (
            <CenteredSpinner />
        )
    }
}

export const EpisodesList = withRouter(container(EpisodesListContainer))
