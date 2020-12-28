/* eslint-disable */
import React from 'react';
import Modal from 'react-modal';
import _isEmpty from 'lodash/isEmpty';

import Button from 'src/shared/components/old/interactive/Button';
import { Tip } from 'src/shared/components/old/shared/Tip';
import container from 'src/containers/editor/TopRow';
import { isModernBrowser } from 'src/config/settings';
import { isBrowserWarning } from 'src/config/settings';
import { css, modalStyles } from 'src/styles/old';

import { secondsToMinutes } from './helpers';
import Publish from './Publish';
import styles from './styles';
import SaveDraft from './SaveDraft.js';
import Play from './static/svg/ic_play.svg';
import Pause from './static/svg/ic_pause.svg';
import Back from './static/svg/ic_skip_previous.svg';
import Cut from './static/svg/ic-content-cut.svg';
import Undo from './static/svg/ic-undo.svg';
import Redo from './static/svg/ic-redo.svg';
import * as S from './styled';

class TopRow extends React.Component {
    state = {
        showExplainer: false,
    };

    componentWillUnmount() {
        this.props.editorSetStop();
    }

    showExplainer = () => {
        this.setState({ showExplainer: true });
    };

    hideExplainer = () => {
        this.setState({ showExplainer: false });
    };

    select = showName => {
        const show = this.props.shows.find(show => show.title === showName);
        this.props.onShowChange(show.id);
    };

    onEpisodeNameChange = e => {
        e.persist();
        this.props.onNameChange(e.target.value);
    };

    undo = () => {
        if (!this.props.isOnlyAd) {
            this.props.undo();
        }
    };

    render() {
        const {
            name,
            editorSetPlay,
            editorSetPause,
            editorSetStop,
            editorSetTrimMode,
            redo,
            playerStatus,
            isTrimMode,
            isTooLong,
            currentTimelineTime,
        } = this.props;

        return (
            <div>
                {isTooLong && (
                    <div
                        className={css(styles.topRow, styles.row, styles.error)}
                        css={{
                            justifyContent: 'space-between',
                            paddingBottom: '5px',
                            paddingTop: '5px',
                            alignItems: 'baseline',
                        }}
                    >
                        Maximum Length Exceeded — Please Reduce to 2:00:00
                    </div>
                )}
                {isBrowserWarning && (
                    <div css={{ display: 'flex', justifyContent: 'center' }}>
                        <Tip text={isBrowserWarning} />
                    </div>
                )}

                <div className={css(styles.topRow, styles.row)}>
                    <div
                        className={css(styles.row, styles.flex1, styles.verticalCenter)}
                        style={{ flexDirection: 'column', alignItems: 'flex-start' }}
                    >
                        <input
                            className={css(styles.episodeName, name === '' && styles.empty)}
                            onChange={this.onEpisodeNameChange}
                            value={name}
                            placeholder="Name this episode"
                        />
                        <div className={css(styles.helpPopup)}>
                            Need help? Read this &nbsp;
                            <u onClick={this.showExplainer} style={{ cursor: 'pointer' }}>
                                quick explainer
                            </u>
                        </div>
                    </div>
                    <S.TimeDisplay>{secondsToMinutes(currentTimelineTime)}</S.TimeDisplay>
                    <div className={css(styles.row)} style={{ marginRight: '10px' }}>
                        <Button type="white" onClick={this.undo} alternate tooltip="Undo">
                            <img src={Undo} />
                        </Button>
                        <Button type="white" onClick={() => redo()} alternate tooltip="Redo">
                            <img src={Redo} />
                        </Button>
                        <Button
                            type={isTrimMode ? 'purple' : 'white'}
                            onClick={() => editorSetTrimMode(!isTrimMode)}
                            alternate
                            tooltip="Cut Audio"
                        >
                            <img src={Cut} />
                        </Button>
                        <Button type="white" onClick={() => editorSetStop()} alternate tooltip="Reset">
                            <img src={Back} />
                        </Button>
                        {playerStatus !== 'play' && (
                            <Button type="white" onClick={() => editorSetPlay()} alternate tooltip="Play">
                                <img src={Play} />
                            </Button>
                        )}
                        {playerStatus === 'play' && (
                            <Button type="white" onClick={() => editorSetPause()} alternate tooltip="Pause">
                                <img src={Pause} />
                            </Button>
                        )}
                    </div>
                    <div>
                        <SaveDraft />
                    </div>
                    {/* Publish won't render sometimes because of discrepancies between stripe and DB premium account info*/}
                    <div>{!_isEmpty(this.props.audioAds) && <Publish isDisabled={isTooLong} />}</div>
                </div>
                <Modal isOpen={this.state.showExplainer} style={modalStyles} contentLabel="publishepisode">
                    <div className={css(styles.modalPadding)}>
                        <div className={css(styles.modalTop)}>
                            <h2 className={css(styles.blueTitle)}>Editing 101</h2>
                        </div>
                        <div className={css(styles.modalContent)}>
                            <p className={css(styles.paragraph)}>
                                If this seems daunting in anyway, fear not. It&rsquo;s actually a lot simplier than
                                you&rsquo;d expect.
                            </p>
                            <p className={css(styles.paragraph)}>
                                You&rsquo;ve got the left side that&rsquo;s devoted to your episode and the right side
                                that shows all your recordings. You can drag your recordings into the editor and move
                                them around in the layers on the timeline.
                            </p>
                            <h4 className={css(styles.subHeader)}>What are layers?</h4>
                            <p className={css(styles.paragraph)}>
                                It&rsquo;s a way for you to have more than one piece of audio playing at once. So you
                                could throw music on a layer and the talking on another.
                            </p>
                            <h4 className={css(styles.subHeader)}>Got audio to upload from your computer?</h4>
                            <p className={css(styles.paragraph)}>
                                You can select files to upload by clicking on the Upload button in the top-right of the
                                recordings list
                            </p>
                            <h4 className={css(styles.subHeader)}>Got something that needs cutting?</h4>
                            <p className={css(styles.paragraph)}>
                                You can either grab left or right of and audio snippet and drag to shorten it. Or you
                                can enable Trim mode by clicking on the scissors icon. Click twice on an audio snippet
                                to highlight an area to cut out, or click once to select a split point. Once you're
                                satisfied, click Trim Selection to trim your selected audio. You can undo this operation
                                using the undo button in the editor controls.
                            </p>
                            <h4 className={css(styles.subHeader)}>Want to save your progress?</h4>
                            <p className={css(styles.paragraph)}>
                                Click on Save for Later to save a snapshot of the editor - you can resume editing from
                                this point at a later stage
                            </p>
                            <h4 className={css(styles.subHeader)}>Need to change the scale of the timeline?</h4>
                            <p className={css(styles.paragraph)}>
                                You can zoom in and out to your hearts content with the Zoom Scale in the bottom left
                                corner.
                            </p>

                            <h4 className={css(styles.subHeader)}>Want to fade in or fade out of a segment?</h4>
                            <p className={css(styles.paragraph)}>
                                You can fade sound in for the first five seconds or fade sound out for the last five
                                seconds of a clip by hitting the "bar graph" type icons on the clip you want to fade.
                                You can only fade the audio on a clip that is at least 5 seconds long.
                            </p>

                            <div className={css(styles.modalButtons)}>
                                <Button type="blue" onClick={this.hideExplainer}>
                                    Back to Editor
                                </Button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        );
    }
}

export default container(TopRow);
