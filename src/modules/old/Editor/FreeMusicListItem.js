import React from 'react';
import { truncate } from 'lodash/fp';
import Tooltip from 'react-tooltip';
import { DragSource } from 'react-dnd';

import PlayButton from 'src/shared/components/old/interactive/PlayButton';
import PauseButton from 'src/shared/components/old/interactive/PauseButton';
import { IconFont } from 'src/shared/components/old/IconFont';
import container from 'src/containers/editor/FreeMusicItem';
import { css } from 'src/styles/old';
import { formatTime } from 'src/shared/helpers/time';

import { TYPES } from './constants';
import styles from './styles';

const recordingItemSource = {
    canDrag(props) {
        return props.songPaid;
    },
    beginDrag(props) {
        return props;
    },
    endDrag(props, monitor, component) {
        if (monitor.didDrop()) {
            const { timelineOffsetSeconds, layerId } = monitor.getDropResult();
            if (layerId) {
                const { isPremium, adDuration } = props;
                const isOverlappingAd = !isPremium && timelineOffsetSeconds < adDuration;
                const offset = isOverlappingAd ? adDuration : timelineOffsetSeconds;
                component.props.addFreeMusicSnippet(monitor.getItem(), layerId, offset);
            }
        }
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
        connectDragPreview: connect.dragPreview(),
    };
}

const truncateName = truncate({ length: 18 });

function getDuration(duration) {
    if (!duration) {
        return '';
    }

    return formatTime(duration);
}
export class FreeMusicListItem extends React.Component {
    render() {
        const {
            name,
            duration,
            isPlaying,
            togglePlay,
            timeElapsed,
            connectDragSource,
            connectDragPreview,
            songPaid,
            musicLibraryInBasket,
        } = this.props;

        return (
            <div style={{ display: 'flex', background: songPaid ? 'white' : '#e1e1e1' }}>
                {connectDragSource(
                    <div
                        className={css(
                            styles.accordionItem,
                            styles.row,
                            styles.recording,
                            songPaid && styles.draggable,
                        )}
                    >
                        <ListItemBody
                            isPlaying={isPlaying}
                            timeElapsed={timeElapsed}
                            duration={duration}
                            togglePlay={togglePlay}
                            songPaid={songPaid}
                            name={name}
                            addMusicItemToBasket={this.props.addMusicItemToBasket}
                            musicLibraryInBasket={musicLibraryInBasket}
                            id={this.props.id}
                        />
                    </div>,
                )}
                {connectDragPreview(
                    <div
                        className={css(
                            styles.accordionItem,
                            styles.row,
                            styles.recording,
                            styles.draggable,
                            styles.previewElement,
                        )}
                    >
                        <ListItemBody duration={duration} name={name} songPaid={songPaid} />
                    </div>,
                    {
                        offsetX: -50,
                        offsetY: -50,
                    },
                )}
            </div>
        );
    }
}

const ListItemBody = ({
    isPlaying,
    timeElapsed,
    duration,
    togglePlay,
    songPaid,
    name,
    addMusicItemToBasket,
    id,
    musicLibraryInBasket,
}) => (
    <React.Fragment>
        <span className={css(styles.redDot)} />
        <span className={css(styles.blackText, styles.flex1)} title={name}>
            {truncateName(name)}
        </span>
        {!songPaid && !musicLibraryInBasket && (
            <div
                data-for="buy"
                data-tip="Get this attribution-free, exclusive music clip to use in your podcasts again and again with this one-time fee!"
                onClick={() => addMusicItemToBasket(id)}
                css={{ display: 'flex', alignItems: 'center', marginRight: 20, cursor: 'pointer' }}
            >
                <span>$5</span>
                <IconFont>shopping_cart</IconFont>
                <Tooltip id="buy" />
            </div>
        )}
        <span className={css(styles.blackText, styles.spaceAround)}>
            {isPlaying ? timeElapsed : getDuration(duration)}
        </span>
        {React.createElement(isPlaying ? PauseButton : PlayButton, { onClick: togglePlay, isSmall: true }, null)}
    </React.Fragment>
);

FreeMusicListItem.defaultProps = {
    duration: 0,
};

export default container(DragSource(TYPES.RECORDING, recordingItemSource, collect)(FreeMusicListItem));
