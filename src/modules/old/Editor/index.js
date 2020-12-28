import React from 'react'
import { connect } from 'react-redux'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import ReactTooltip from 'react-tooltip'
import { Elements } from 'react-stripe-elements'

import * as actions from 'src/shared/components/old/Billing/actions'
import { fetchDrafts, closeModalDraft } from 'src/modules/old/Drafts/actions/actions'
import NoRecording from 'src/modules/old/Recording/NoRecording'
import { css } from 'src/styles/old'
import { isMobile } from 'src/shared/helpers/device'
import {isModernBrowser} from '../../../config/settings'
import { clearEpisodeEdition } from './actions'
import { EditorModal } from './Modal'
import RecordingsList from './RecordingsList'
import { getItemsInBasketSelector } from './selectors'
import { ShopWithStripe } from './Shop'
import * as S from './styled'
import styles from './styles'
import EditorTimeline from './Timeline'
import TopRow from './TopRow'

class Editor extends React.PureComponent {
    componentDidMount() {
        this.props.fetchDrafts()
    }

    componentWillUnmount() {
        this.props.clearEpisodeEdition()
    }

    render() {
        const { itemsInBasket, isProcessingPayment, paymentError, musicLibraryInBasket } = this.props
        return (
            <React.Fragment>
                {(musicLibraryInBasket || itemsInBasket.length > 0) && (
                    <Elements>
                        <ShopWithStripe
                            itemsInBasket={itemsInBasket}
                            buyMusicItems={this.props.buyMusicItems}
                            removeMusicItemFromBasket={this.props.removeMusicItemFromBasket}
                            paymentError={paymentError}
                            startMusicLibraryPaymentLoader={this.props.startMusicLibraryPaymentLoader}
                            setMusicLibraryPaymentError={this.props.setMusicLibraryPaymentError}
                            isProcessingPayment={isProcessingPayment}
                            musicLibraryInBasket={musicLibraryInBasket}
                            removeMusicLibraryFromBasket={this.props.removeMusicLibraryFromBasket}
                            buyMusicLibraryTotalAccess={this.props.buyMusicLibraryTotalAccess}
                        />
                    </Elements>
                )}
                <div className={css(styles.container, styles.column)}>
                    <EditorModal
                        isModalOpen={this.props.isDraftModalOpen}
                        description={
                            <p>You have saved drafts. Do you want to start from scratch or using a draft?</p>
                        }
                        options={closeModal => (
                            <React.Fragment>
                                <S.OptionLink to="#" onClick={closeModal}>
                                    Start from scratch
                                </S.OptionLink>
                                <S.OptionLink to="/create/drafts">Start using a draft</S.OptionLink>
                            </React.Fragment>
                        )}
                    />
                    <EditorModal
                        isModalOpen={this.props.isCreateShowModalOpen}
                        description={
                            <p>
                                In order to be able to save and publish your podcast's episodes in our Editor
                                & Publisher, you need to create a show first. Click on "My Podcasts" in the
                                navigation bar, followed by "Create Show". After you have filled in the
                                details about your new show, you can come back here and get to work on your
                                episode!
                            </p>
                        }
                        options={closeModal => (
                            <React.Fragment>
                                <S.OptionLink to="/my-podcasts">Got it</S.OptionLink>
                                <div css={{ display: 'flex', flexDirection: 'column' }}>
                                    <S.OptionLink to="#" onClick={closeModal}>
                                        I'll do it later
                                    </S.OptionLink>
                                    <span css={{ fontSize: 10 }}>
                                        (which I know means I can't save or publish an episode until then)
                                    </span>
                                </div>
                            </React.Fragment>
                        )}
                    />
                    <TopRow isModernBrowser={isModernBrowser}/>
                    {isMobile && <NoRecording isOpen />}
                    <div className={css(styles.row)}>
                        <div className={css(styles.timelineContainer)}>
                            <EditorTimeline />
                        </div>
                        <RecordingsList />
                    </div>
                    <ReactTooltip effect="solid" className={css(styles.tooltip)} />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    isDraftModalOpen: state.editorMeta.drafts.isModalOpen,
    isCreateShowModalOpen: state.shows.fetchedShows && state.shows.list.length === 0,
    itemsInBasket: getItemsInBasketSelector(state),
    isProcessingPayment: state.billing.freeMusicBasket.isLoading,
    paymentError: state.billing.freeMusicBasket.error,
    musicLibraryInBasket: state.billing.freeMusicBasket.musicLibrary,
})

const connectedEditor = connect(
    mapStateToProps,
    {
        fetchDrafts,
        closeModalDraft,
        clearEpisodeEdition,
        buyMusicItems: actions.buyMusicItems,
        removeMusicItemFromBasket: actions.removeMusicItemFromBasket,
        startMusicLibraryPaymentLoader: actions.startMusicLibraryPaymentLoader,
        setMusicLibraryPaymentError: actions.setMusicLibraryPaymentError,
        removeMusicLibraryFromBasket: actions.removeMusicLibraryFromBasket,
        buyMusicLibraryTotalAccess: actions.buyMusicLibraryTotalAccess,
    },
)(Editor)

export default DragDropContext(HTML5Backend)(connectedEditor)
