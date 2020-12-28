import React from 'react';
import Modal from 'react-responsive-modal';
import Dropzone from 'react-dropzone';
import _omit from 'lodash/omit';
import _noop from 'lodash/noop';
import Spinner from 'react-svg-spinner';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import { mapHtmlToString } from 'src/shared/helpers/mapHtmlToString';
import { fullDateFormat } from 'src/config/constants/dateFormats';

import 'react-datepicker/dist/react-datepicker.css';
import * as S from './styled';

const maxTimeCalc = moment()
    .hours(23)
    .minutes(59);

const minTimeCalc = releasedAt =>
    moment(releasedAt).isSame(Date.now(), 'day')
        ? moment(new Date())
        : moment()
              .hours(0)
              .minutes(0);

export class EditEpisodeModal extends React.Component {
    state = {
        title: this.props.episode.title,
        description: mapHtmlToString(this.props.episode.description),
        releasedAt: this.props.episode.releasedAt,
        file: null,
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onDateChange = date => this.setState({ releasedAt: new Date(date) });

    onSave = () => {
        const { guid, show } = this.props.episode;
        this.props.updateEpisode(guid, show, this.state.file ? this.state : _omit(this.state, 'file'));
    };

    onDrop = acceptedFiles => {
        this.setState({ file: acceptedFiles[0] });
    };

    render() {
        const { episode, editEpisodeForm, closeEditEpisodeModal, isUpdatingEpisode } = this.props;
        const { title, description, releasedAt } = this.state;

        return (
            <Modal
                open={episode.guid === editEpisodeForm.guid}
                onClose={!isUpdatingEpisode ? closeEditEpisodeModal : _noop}
            >
                <S.EditEpisodeWrapper>
                    <S.EditEpisodeRow>
                        <S.Label>Title: </S.Label>
                        <S.EditEpisodeTitle name="title" onChange={this.onChange} value={title} />
                    </S.EditEpisodeRow>
                    <S.EditEpisodeRow>
                        <S.Label>Description:</S.Label>
                        <S.EditEpisodeDescription name="description" onChange={this.onChange} value={description} />
                    </S.EditEpisodeRow>
                    {new Date(episode.releasedAt) > new Date() && (
                        <S.EditEpisodeRow>
                            <S.Label>Release Date:</S.Label>
                            <DatePicker
                                name="releasedAt"
                                dateFormat={fullDateFormat}
                                timeIntervals={15}
                                timeCaption="Time"
                                showTimeSelect
                                minDate={moment()}
                                minTime={minTimeCalc(releasedAt)}
                                maxTime={maxTimeCalc}
                                selected={moment(this.state.releasedAt)}
                                onChange={this.onDateChange}
                                disabledDays={{ before: new Date() }}
                                placeholderText="Select a date"
                            />
                        </S.EditEpisodeRow>
                    )}
                    <S.EditEpisodeRow css={{ cursor: 'pointer' }}>
                        <Dropzone
                            onDrop={this.onDrop}
                            accept="audio/*"
                            style={{ height: 50, border: '2px dashed grey' }}
                            disabled={isUpdatingEpisode}
                        >
                            <p css={{ textAlign: 'center' }}>
                                {!this.state.file ? 'Replace audio file' : this.state.file.name}
                            </p>
                        </Dropzone>
                    </S.EditEpisodeRow>
                    <S.SubmitEditEpisode onClick={!isUpdatingEpisode ? this.onSave : _noop}>
                        {!isUpdatingEpisode ? 'Save' : <Spinner speed="fast" size="32px" color="white" />}
                    </S.SubmitEditEpisode>
                </S.EditEpisodeWrapper>
            </Modal>
        );
    }
}
