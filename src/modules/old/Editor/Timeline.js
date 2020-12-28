/* eslint-disable */
import React from 'react'
import ReactTooltip from 'react-tooltip'
import moment from 'moment'
import _range from 'lodash/range'

import Slider from 'src/shared/components/old/common/Slider'
import container from 'src/containers/editor/Timeline'
import { css } from 'src/styles/old'

import AudioControl from './AudioControl'
import AddLayer from './AddLayer'
import Layers from './Layers'
import styles from './styles'
import TimelinePointer from './TimelinePointer'

const getTimeLabel = (secondsPerSection, section) => {
    return moment()
        .hours(0)
        .minutes(0)
        .seconds(secondsPerSection * section)
        .format('H:mm:ss')
}

const EditorTimeline = ({
    pixelsPerSecond,
    secondsPerSection,
    timelineClick,
    setZoom,
    isTrimMode,
    editorSetTrimMode,
    editorTrimSelections,
    numSections,
    sectionWidth,
    totalWidth,
}) => {
    return (
        <div>
            {isTrimMode && (
                <div className={css(styles.trimModePanel)}>
                    <div>
                        Cut Audio: Click on an audio snippet and drag the arrows underneath it to define the
                        part in red you want to remove.
                        <div>When you are ready, press Cut Selection.</div>
                    </div>

                    <div className={css(styles.trimButtons)}>
                        <div
                            className={css(styles.trimSelection)}
                            onClick={editorTrimSelections}
                            data-for="trim"
                            data-tip="This will remove the selected sections from the tracks"
                        >
                            Cut Selection
                        </div>
                        <div
                            className={css(styles.doneTrimming)}
                            onClick={() => editorSetTrimMode(false)}
                            data-for="trim"
                            data-tip="Exit trim mode"
                        >
                            Done Cutting
                        </div>
                    </div>
                    <ReactTooltip id="trim" effect="solid" className={css(styles.tooltip)} />
                </div>
            )}
            <div className={css(styles.timelineBackground)}>
                <AudioControl />
                <div className={css(styles.timelineCanvas)} id="timeline_canvas">
                    <TimelinePointer width={totalWidth} />
                    {_range(numSections).map(i => (
                        <div
                            key={i}
                            className={css(styles.backgroundLine)}
                            style={{ width: `${sectionWidth}px`, left: `${sectionWidth * i}px` }}
                        >
                            <div className={css(styles.timeLabel)}>{getTimeLabel(secondsPerSection, i)}</div>
                        </div>
                    ))}
                    <div
                        className={css(styles.layers)}
                        id="timeline_layers"
                        onMouseDown={timelineClick}
                        style={{ width: totalWidth }}
                    >
                        <Layers sectionWidth={sectionWidth} numSections={numSections} />
                    </div>
                </div>
                <AddLayer />
            </div>
            <div
                className={css(styles.timelineZoom)}
                data-for="zoom"
                data-tip="Zoom in or out of your audio tracks by moving this."
            >
                {_range(11).map(i => (
                    <div key={i} className={css(styles.zoomLine)} style={{ width: `${i * i}%` }} />
                ))}
                <Slider max={10} min={1} val={pixelsPerSecond} onChange={value => setZoom(value)} />
            </div>
            <p css={{ marginTop: 5, textTransform: 'uppercase', fontSize: 12 }}>Timeline scale</p>
            <ReactTooltip id="zoom" place="right" effect="float" className={css(styles.tooltipRight)} />
        </div>
    )
}

export default container(EditorTimeline)
