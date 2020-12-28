import React, { Component } from 'react'
import { connect } from 'react-redux'

import { deletePodcast } from 'src/actions/old/editor'
import { openEditEpisodeModal, closeEditEpisodeModal, updateEpisode } from 'src/modules/old/Shows/actions/episodeEdit'
import { fetchShowEpisodes } from 'src/actions/old'

function mapStateToProps({
    shows: { isFetching },
    podcasts: { episodes, isUpdatingEpisode },
    editorMeta: { drafts },
    forms,
}) {
    return {
        isFetching,
        episodes,
        drafts,
        editEpisodeForm: forms.editEpisodeForm,
        isUpdatingEpisode,
    }
}

const container = connect(
    mapStateToProps,
    {
        fetchShowEpisodes,
        deletePodcast,
        openEditEpisodeModal,
        closeEditEpisodeModal,
        updateEpisode,
    },
)

function createContainer(ComposedComponent) {
    class Container extends Component {
        constructor(props) {
            super(props)
            this.handleDeletePodcast = this.handleDeletePodcast.bind(this)
            this.handleUnpublishPodcast = this.handleUnpublishPodcast.bind(this)
        }

        handleDeletePodcast(podcast) {
            // eslint-disable-next-line no-alert
            if (window.confirm('Are you sure you want to delete this episode?')) {
                this.props.deletePodcast(podcast)
            }
        }

        handleUnpublishPodcast({ guid, show, released }) {
            // eslint-disable-next-line no-alert
            if (
                window.confirm(`Are you sure you want to ${released ? 'unpublish' : 'publish'} this episode?`)
            ) {
                this.props.updateEpisode(guid, {
                    released: !released,
                    show,
                })
            }
        }

        render() {
            return (
                <ComposedComponent
                    {...this.props}
                    unpublishPodcast={this.handleUnpublishPodcast}
                    publishPodcast={this.handlePublishPodcast}
                    deletePodcast={this.handleDeletePodcast}
                />
            )
        }
    }

    return container(Container)
}

export default createContainer
