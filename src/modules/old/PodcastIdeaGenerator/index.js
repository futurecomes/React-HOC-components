import React from 'react'

import { SpinningWheel } from 'src/shared/components/old/SpinningWheel'
import isAuthenticated from 'src/containers/hoc/isAuthenticated'
import { colors } from 'src/styles/old'

import { PODCAST_IDEAS } from './podcastIdeasData'

import * as S from './styled'

class PodcastIdeaGenerator extends React.Component {
    state = {
        idea: '',
        isButtonVisible: false,
    }

    setIdea = () =>
        this.setState({
            idea: PODCAST_IDEAS[Math.floor((Math.random() * 100) % PODCAST_IDEAS.length)],
            isButtonVisible: false,
        })

    showJoinButton = () => this.setState({ isButtonVisible: true })

    render() {
        return (
            <S.Wrapper>
                <h1 css={{ textAlign: 'center', marginTop: 0 }}>Spin the Wheel to Get a Podcast Idea!</h1>
                <SpinningWheel
                    spinTime={5000}
                    onSpinEnd={this.showJoinButton}
                    colors={[
                        colors.mainYellow,
                        colors.toGradient,
                        colors.mainGreen,
                        colors.hotPink,
                        colors.electricViolet,
                        colors.darkBlue,
                    ]}
                    onSpinProgress={this.setIdea}
                />
                <h2 css={{ textAlign: 'center' }}>{this.state.idea || `CLICK ON SPIN`}</h2>
                {this.state.isButtonVisible && (
                    <S.Button to={this.props.isAuthenticated ? '/my-podcasts' : '/join'}>
                        {this.props.isAuthenticated ? 'Start Creating' : 'Join Messy!'}
                    </S.Button>
                )}
            </S.Wrapper>
        )
    }
}

export default isAuthenticated(PodcastIdeaGenerator)
