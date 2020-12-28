import React from 'react'
import { Link } from 'react-router-dom'
import { Elements } from 'react-stripe-elements'

import { css } from 'src/styles/old'

import * as S from './styled'
import styles from './styles'
import { SocialMedia } from './SocialMedia'
import { EpisodesList } from './EpisodesList'
import ShowSettings from './Settings'
import EditShow from './Edit'
import { ShowControl } from './ShowControl'
import { ProtectShowFormContainer } from './ProtectShowForm'
import { PromoteShowFormContainer } from './PromoteShowForm'
import { UnprotectModal } from './UnprotectModal'

const initialState = {
    isProtectShowPaymentFormVisible: false,
    isPromotePaymentFormVisible: false,
    payment: false,
}
export class Show extends React.Component {
    state = Object.assign({}, initialState)
    resetState() {
        this.setState(initialState)
    }
    openForm() {
        this.resetState()
        this.setState({
            payment: true,
        })
    }
    openProtectForm() {
        this.openForm()
        this.setState({
            isProtectShowPaymentFormVisible: true,
        })
    }
    openUnprotectModal() {
        this.props.openUnprotectPodcastModal(this.props.show.id)
    }
    openPromoteForm() {
        this.openForm()
        this.setState({
            isPromotePaymentFormVisible: true,
        })
    }
    newEpisode = () => {
        const {
            editorInitialize,
            selectShow,
            setEpisodeDescription,
            setEpisodeName,
            history,
            show,
        } = this.props
        editorInitialize()
        setEpisodeDescription('')
        setEpisodeName('')
        selectShow(show.id)
        history.push('/create/editor')
    }

    render() {
        const { show, isPaidUser } = this.props
        return (
            <S.Show key={show.id}>
                <div className={css(styles.row, styles.headerRow)}>
                    <img src={show.imageUrl} alt={show.title} className={css(styles.showImage)} />
                    <S.ShowBlock>
                        <div css={{ display: 'flex' }}>
                            <div
                                className={css(styles.column)}
                                css={{ justifyContent: 'space-between', width: '100%' }}
                            >
                                <S.ShowTitle>{show.title}</S.ShowTitle>
                                <div className={css(styles.cardText)}>{show.description}</div>
                            </div>
                            <SocialMedia show={show} />
                        </div>
                        <S.ShowControlWrapper>
                            {!show.isExternal && (
                                <React.Fragment>
                                    <ShowControl onClick={this.newEpisode} text="New Episode" icon="mic" />
                                    <EditShow show={show} />
                                </React.Fragment>
                            )}
                            <ShowControl
                                onClick={
                                    this.props.show.protected
                                        ? this.openUnprotectModal.bind(this)
                                        : this.props.show.protectionPaid
                                        ? this.props.submitProtectPodcast(
                                              this.props.userToken,
                                              this.props.show.id,
                                          )
                                        : this.openProtectForm.bind(this)
                                }
                                text={
                                    this.props.show.protected
                                        ? 'Make Your Podcast Public'
                                        : 'Make Your Podcast Private'
                                }
                                icon={this.props.show.protected ? 'lock_open' : 'lock'}
                            />
                            <UnprotectModal
                                modalShowID={this.props.unprotectPodcastModal.unprotectshowId}
                                open={this.props.unprotectPodcastModal.isUnprotectPodcastModalOpen}
                                onClose={this.props.closeUnprotectPodcastModal}
                                onSubmit={this.props.submitUnprotectPodcast}
                            />
                        </S.ShowControlWrapper>
                        <div css={{ display: 'flex', justifyContent: 'space-around', marginBottom: 10 }}>
                            {!this.props.show.promoted && (
                                <ShowControl
                                    onClick={this.openPromoteForm.bind(this)}
                                    text="Promote"
                                    icon="attach_money"
                                />
                            )}
                            {isPaidUser && (
                                <Link to={`/analytics/show/${show.id}`} css={{ textDecoration: 'none' }}>
                                    <ShowControl icon="bubble_chart" text="Analytics" />
                                </Link>
                            )}
                            <ShowSettings show={show} />{' '}
                        </div>
                    </S.ShowBlock>
                </div>
                {this.state.payment && (
                    <Elements>
                        <S.PaymentWrapper>
                            {this.state.isPromotePaymentFormVisible && (
                                <PromoteShowFormContainer
                                    editShow={this.props.editShow}
                                    userToken={this.props.userToken}
                                    showId={this.props.show.id}
                                />
                            )}
                            {this.state.isProtectShowPaymentFormVisible && (
                                <ProtectShowFormContainer
                                    editShow={this.props.editShow}
                                    userToken={this.props.userToken}
                                    showId={this.props.show.id}
                                    submitForm={this.props.submitProtectPodcast}
                                />
                            )}
                        </S.PaymentWrapper>
                    </Elements>
                )}
                <EpisodesList show={show} isPaidUser={isPaidUser} />
            </S.Show>
        )
    }
}
