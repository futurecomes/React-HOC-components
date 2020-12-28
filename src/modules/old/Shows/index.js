import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner'
import container from 'src/containers/MyShows'

import { AlreadyHaveShowBox } from './AlreadyHaveShowBox'
import { CreateShowBox } from './CreateShowBox'
import { Show } from './Show'

class MyShows extends Component {
    render() {
        const {
            shows,
            editorInitialize,
            selectShow,
            setEpisodeDescription,
            setEpisodeName,
            history,
            isPaidUser,
        } = this.props

        if (this.props.isLoadingShows) {
            return <CenteredSpinner size="64px" />
        }

        return (
            <div>
                <div>
                    {shows.map(show => (
                        <Show
                            show={show}
                            key={show.id}
                            selectShow={selectShow}
                            editorInitialize={editorInitialize}
                            setEpisodeDescription={setEpisodeDescription}
                            setEpisodeName={setEpisodeName}
                            history={history}
                            isPaidUser={isPaidUser}
                            userToken={this.props.user.token}
                            editShow={this.props.editShow}
                            unprotectPodcastModal={this.props.unprotectPodcastModal}
                            openUnprotectPodcastModal={this.props.openUnprotectPodcastModal}
                            closeUnprotectPodcastModal={this.props.closeUnprotectPodcastModal}
                            submitProtectPodcast={this.props.submitProtectPodcast}
                            submitUnprotectPodcast={this.props.submitUnprotectPodcast}
                        />
                    ))}
                </div>
                <div>
                    {shows.length ? (
                        <CreateShowBox title="Want to start another show?" />
                    ) : (
                        <CreateShowBox title="My Podcasts" noShows />
                    )}
                    <AlreadyHaveShowBox />
                </div>
            </div>
        )
    }
}

export default withRouter(container(MyShows))
