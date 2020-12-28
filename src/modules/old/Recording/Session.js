import React from 'react';
import { Prompt } from 'react-router-dom';
import Spinner from 'react-svg-spinner';

import LinesIndicator from 'src/shared/components/old/activity/LinesIndicator';
import { Tip } from 'src/shared/components/old/shared/Tip';
import container from 'src/containers/Recording/Session';
import newSession from 'src/containers/Recording/NewSession';
import { isBrowserWarning } from 'src/config/settings';
import { css } from 'src/styles/old';
import { isMobile } from 'src/shared/helpers/device';

import { RECORDING_TIME_COUNTER, isMediaRecorderAvailable } from './epics/mediaRecorder';
import MicCheck from './MicCheck';
import NoRecording from './NoRecording';
import RecordingListItem from './RecordingListItem';
import { RecordingNotSupported } from './RecordingNotSupported';
import { RecorderHeader } from './RecorderHeader';
import * as S from './styled';
import styles from './styles';
import { TemporaryRecording } from './TemporaryRecording';

const recordingMessage = "You're recording right now, are you sure that you want to leave this page?";
const savingMessage = "You're saving your take right now, are you sure that you want to leave this page?";

class Session extends React.Component {
    renderRecordings = recording => {
        return <RecordingListItem {...recording} key={recording.id} />;
    };

    render() {
        const { recordings, isFetching, isSaving, isRecording, isLoading, timeCounter } = this.props;
        return (
            <React.Fragment>
                <Prompt when={isRecording || isSaving} message={isRecording ? recordingMessage : savingMessage} />
                <div className={css(styles.table)}>
                    {isBrowserWarning && (
                        <Tip text={isBrowserWarning} />
                    )}
                    {isFetching ? (
                        <LinesIndicator size={75} />
                    ) : (
                        <RecorderHeader
                            form={this.props.form}
                            session={this.props.session}
                            onNameChange={this.props.onNameChange}
                            onNameBlur={this.props.onNameBlur}
                            isRecording={isRecording}
                            isSaving={isSaving}
                            stopRecording={this.props.stopRecording}
                            startRecording={this.props.startRecording}
                            error={this.props.error}
                            recordingName={this.props.recording.name}
                            setRecordingName={this.props.setRecordingName}
                            isLoading={this.props.isLoading}
                            timeCounter={timeCounter}
                        />
                    )}
                    <div className={css(styles.waveContainer)}>
                        {this.props.renderOscillator()}
                        <S.LoadingWrapper>
                            {isLoading && <Spinner size="48px" speed="fast" />}
                            {Number.isInteger(timeCounter) && RECORDING_TIME_COUNTER - timeCounter}
                        </S.LoadingWrapper>
                    </div>
                    <div className={css(styles.recordings)}>
                        {!(isRecording || isSaving) && recordings.length === 0 && (
                            <span className={css(styles.info, styles.infoPadding)}>
                                Your recordings will appear here
                            </span>
                        )}
                        {(isRecording || isSaving) && (
                            <TemporaryRecording recording={this.props.recording} isSaving={this.props.isSaving} />
                        )}
                        {recordings.map(this.renderRecordings)}
                    </div>
                    {isMobile ? <NoRecording isOpen /> : <MicCheck />}
                </div>
            </React.Fragment>
        );
    }
}
export default (!navigator.mediaDevices
    ? RecordingNotSupported
    : (isMediaRecorderAvailable ? newSession : container)(Session));
