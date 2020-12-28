import React from 'react'
import DatePicker from 'react-datepicker'
import moment from 'moment'
import { Input } from 'antd'
import styled from 'react-emotion'

import Dropdown from 'src/shared/components/old/form/DropdownFormless'

const TopWrapper = styled.div({
    display: 'flex',
    alignItems: 'stretch',
    flexDirection: 'column',
})

const ReleaseWrapper = styled.div({
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '2rem',
})

const ReleaseOption = styled.div({
    display: 'flex',
    alignItems: 'center',
    padding: 5,
})

const inputStyles = {
    '&.ant-input': {
        marginBottom: 20,
        width: '100%',
        borderRadius: 0,
    },
}
const StyledInput = styled(Input)(inputStyles)
const StyledTextArea = styled(Input.TextArea)(inputStyles)

export class Top extends React.Component {
    handleNameChange = event => this.props.setEpisodeName(event.target.value)

    handleDescriptionChange = event => this.props.setEpisodeDescription(event.target.value)

    render() {
        return (
            <TopWrapper>
                <StyledInput
                    placeholder="Name this episode"
                    onChange={this.handleNameChange}
                    value={this.props.episodeName}
                    onBlur={this.props.onNameBlur}
                />
                <StyledTextArea
                    placeholder="Episode Description"
                    onChange={this.handleDescriptionChange}
                    value={this.props.episodeDescription}
                    rows={4}
                />
                <ReleaseWrapper>
                    {['now', 'later'].map(option => (
                        <ReleaseOption key={option}>
                            <label htmlFor={option}>Release {option}</label>
                            <input
                                name={option}
                                onChange={this.props.onReleaseChange}
                                type="checkbox"
                                id={option}
                                checked={this.props.release === option}
                            />
                        </ReleaseOption>
                    ))}
                    {this.props.release === 'later' && (
                        <DatePicker
                            dateFormat="LLL"
                            timeIntervals={15}
                            timeCaption="Time"
                            showTimeSelect
                            minDate={moment()}
                            minTime={
                                this.props.isToday
                                    ? moment()
                                    : moment()
                                          .hours(24)
                                          .minutes(0)
                            }
                            maxTime={moment()
                                .hours(23)
                                .minutes(59)}
                            autoFocus
                            selected={this.props.releaseDate}
                            onChange={this.props.onDateChange}
                            disabledDays={{ before: new Date() }}
                            placeholderText="Select a date"
                        />
                    )}
                </ReleaseWrapper>
                <Dropdown
                    label="Show to Publish under (*)"
                    placeholder="Select Show"
                    isOptional={false}
                    values={this.props.shows.map(show => show.title)}
                    value={this.props.selectedShow ? this.props.selectedShow.title : null}
                    onChange={this.props.select}
                />
            </TopWrapper>
        )
    }
}
