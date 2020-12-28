import React from 'react';
import { DragSource } from 'react-dnd';
import Spinner from 'react-svg-spinner';
import Delay from 'react-delay';

import Button from 'src/shared/components/old/interactive/Button';
import container from 'src/containers/editor/LayerItem';
import { css } from 'src/styles/old';
import formatTime from 'src/shared/helpers/formatTime';

import { TYPES } from '../constants';
import { FadeButtons } from './FadeButtons';
import { Polyline } from './Polyline';
import { LoadingCover } from '../styled';
import styles from '../styles';
import TrimHighlight from '../TrimBlock';



// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const layerItemSource = {
    beginDrag(props) {
        return props.item;
    },
    canDrag({ isTrimMode, item }) {
        if (isTrimMode || item.isAd) {
            return false;
        }
        return true;
    },
    endDrag(props, monitor, component) {
        if (component && monitor.didDrop()) {
            const { timelineOffsetSeconds, layerId } = monitor.getDropResult();
            const { isPremium, adDuration } = props;
            const isOverlappingAd = !isPremium && timelineOffsetSeconds < adDuration;
            const offset = isOverlappingAd ? adDuration : timelineOffsetSeconds;
            if (monitor.getItem().layer !== layerId) {
                component.switchItemLayer(monitor.getItem().frontendId, layerId);
                component.moveItem(monitor.getItem(), offset);
            } else {
                component.moveItem(monitor.getItem(), offset);
            }
        }
    },
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

export class Item extends React.Component {

    state = {
        mouseEvent: false
    }

    setTrim = trim => {
        this.props.setTrimX(trim, this.props.item);
    };

    moveItem = (layerItem, newOffsetSeconds) => {
        const newOffset = newOffsetSeconds < 0 ? 0 : newOffsetSeconds;
        this.props.moveRecordingSnippet(layerItem, newOffset);
    };

    switchItemLayer = (snippetId, newLayerId) => {
        this.props.switchRecordingSnippet(snippetId, newLayerId);
    };

    leftResize = (_event, _direction, _refToElement, delta) => {
        const { pixelsPerSecond, item } = this.props;
        if (!item.isAd) {
            const deltaSeconds = (-1 * delta.width) / pixelsPerSecond; // a negative delta width means a positive offset change and vice versa
            this.props.changeStartOffset(item, deltaSeconds);
        }
    };

    rightResize = (_event, _direction, _refToElement, delta) => {
        const { pixelsPerSecond, item } = this.props;
        if (!item.isAd) {
            const deltaSeconds = delta.width / pixelsPerSecond; // negatvie change in width means negative change in play duration
            this.props.changePlayDuration(item, deltaSeconds);
        }
    };

    enableTrim = e => {
        if (e.target === e.currentTarget) {
            return;
        }

        e.persist();
        const { left } = e.currentTarget.getBoundingClientRect();
        const position = e.clientX - left;

        this.props.enableTrim({ position, id: this.props.item.frontendId });
    };

    deleteRecording = () => {
        this.props.deleteRecordingSnippet(this.props.item);
    };


    dragStart = () => {
        this.setState({
            mouseEvent: true
        })
    }
    dragEnd = () => {
        this.setState({
            mouseEvent: false
        })
    }


    render() {
        const {
            fadeRecordingSnippet,
            isTrimMode,
            item,
            xPosition,
            maxWidth,
            canFade,
            width,
            linePoints,
            canTrim,
        } = this.props;

        const {mouseEvent} = this.state;
        return (
            <div
        onDragStart={() => this.dragStart()}
        onDragEnd={() => this.dragEnd()}
        onMouseDown={e => e.stopPropagation()}
        className={css(styles.layerItem, mouseEvent && styles.snapRecord)}
        onClick={isTrimMode ? this.enableTrim : null}
        css={{
            width: `${width}px`,
                maxWidth: `${maxWidth}px`,
                left: `${xPosition}px`,
                display: `${(item.playDuration < 1) ? 'none' : 'block'}`,
        }}
    >
        {this.props.isLoading && (
        <Delay wait={120}>
            <LoadingCover>
            <Spinner
            size={maxWidth / 2 > 32 ? '32px' : `${maxWidth / 2}px`}
            speed="fast"
            color="white"
                />
                </LoadingCover>
                </Delay>
        )}
        {canTrim && (
        <TrimHighlight
            trim={item.trim}
            setTrim={this.setTrim}
            width={width}
            timelineOffset={item.timelineOffset}
            playDuration={item.playDuration}
            pixelsPerSecond={this.props.pixelsPerSecond}
            />
        )}

    <div className={css(styles.layerItemFlex)}>
    <Polyline linePoints={linePoints} />
        {this.props.connectDragSource(
        <div className={css(styles.layerItemResizable)} css={isTrimMode ? { cursor: 'default' } : null}>
            <div
            className={css(styles.layerItemLabel, item.playDuration <= 90 && styles.layerItemSmall)}
        >
            {width > 100 && (
            <div>
            <div>{item.name}</div>
            <div>{formatTime(item.playDuration)}</div>
            </div>
            )}
        <div>
        {!item.isAd && (
        <Button
            className={css(styles.deleteButton)}
            type="white"
            alternate
            onClick={this.deleteRecording}
                >
                X
                </Button>
        )}
            {canFade && (
            <FadeButtons
                fadeIn={item.fadeIn}
                fadeOut={item.fadeOut}
                frontendId={item.frontendId}
                fadeRecordingSnippet={fadeRecordingSnippet}
                />
            )}
        </div>
        </div>
        </div>,
        )}
    </div>
        </div>
    );
    }
}

export default container(DragSource(TYPES.LAYER_ITEM, layerItemSource, collect)(Item));