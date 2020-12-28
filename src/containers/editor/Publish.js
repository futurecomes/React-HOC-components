import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Howl } from 'howler'
import _sample from 'lodash/sample'

import * as actions from 'src/actions/old/editor'
import { onDateChange, onReleaseChange } from 'src/modules/old/Editor/actions'
import { fetchUserShows } from 'src/modules/old/Shows/actions'

function mapStateToProps({
    shows: { list },
    ads: { audioAds },
    billing: { currentPlan, userSubscriptions, fetchedSubscriptions },
    editorMeta,
    editor: { present },
}) {
    const hasPremium = /premium/.test(currentPlan.type)
    const adRemovalSubscription = userSubscriptions.find(s => s.planId.startsWith('ad_removal'))
    const isAdRemovalSubscriptionActive = adRemovalSubscription && adRemovalSubscription.status === 'active'

    const adRemoval = hasPremium || isAdRemovalSubscriptionActive

    return {
        shows: list
            .filter(l => !l.sourceUrl || !l.imported)
            .map(show => ({
                ...show,
                isUsingDefaultArt:
                    show.imageUrl === 'https://s3.amazonaws.com/messybun/Messy+Bun+Pineapple.jpg',
            })),
        episodeName: editorMeta.episodeName,
        episodeDescription: editorMeta.episodeDescription,
        showIdx: editorMeta.showIdx,
        isPublishing: editorMeta.isPublishing,
        didPublish: editorMeta.didPublish,
        errorMessage: editorMeta.errorMessage,
        progress: editorMeta.progress,
        release: editorMeta.release,
        releaseDate: editorMeta.releaseDate,
        canPublish: present.canPublish,
        present,
        currentPlan,
        audioAds,
        isEpisodeTooShort: present.latestSnippetTime < 60,
        adRemoval,
        fetchedSubscriptions,
    }
}

function createContainer(ComposedComponent) {
    class Container extends Component {
        componentWillMount() {
            this.props.fetchUserShows()
            this.processAudioAd()
        }

        componentWillUnmount() {
            this.props.resetPublish()
        }

        processAudioAd = () => {
            const { audioAds, adRemoval } = this.props
            if (Array.isArray(audioAds)) {
                const ad = _sample(audioAds)
                if (ad && !adRemoval) {
                    this.adUrl = ad.url
                    this.audioAd = new Howl({
                        src: [this.adUrl],
                        preload: true,
                        onload: this.onLoad,
                        onloaderror: this.onLoadError,
                    })
                }
            }
        }

        onLoad = () => {
            const {
                present: {
                    layers: [layer],
                },
            } = this.props
            const duration = this.audioAd.duration() * 1000

            this.props.addAdRecordingSnippet(
                {
                    name: 'Messy Bun Ad',
                    duration,
                    url: this.adUrl,
                    isAd: true,
                },
                layer.frontendId,
                0,
            )
        }

        onLoadError = () => {
            this.processAudioAd()
        }

        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return connect(
        mapStateToProps,
        {
            editorPublish: actions.editorPublish,
            addRecordingSnippet: actions.addRecordingSnippet,
            setEpisodeName: actions.setEpisodeName,
            setEpisodeDescription: actions.setEpisodeDescription,
            selectShow: actions.selectShow,
            resetPublish: actions.resetPublish,
            editorSetError: actions.editorSetError,
            addAdRecordingSnippet: actions.addAdRecordingSnippet,
            fetchUserShows,
            onDateChange,
            onReleaseChange,
        },
    )(props => (props.fetchedSubscriptions ? <Container {...props} /> : null))
}

export default createContainer
