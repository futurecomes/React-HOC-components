/* eslint-disable */
import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Item from './Item';

import container from 'src/containers/editor/Layer';

import { css } from 'src/styles/old';
import styles from './styles';
import { TYPES } from './constants';
import { maximumNumberOfSnippetsInEditor } from 'src/config/settings';

// determine where a new or existing snippet should be placed when dropped
function getDropXOffsetSeconds(props, monitor) {
    const item = monitor.getItem();

    if (monitor.getItemType() === TYPES.RECORDING) {
        const layerX = document.getElementById('timeline_layers').getBoundingClientRect().left; // layer x-coordinate relative to viewport
        const dropPointX = monitor.getClientOffset().x; // drop x-coordinate relative to viewport
        const timelineOffsetPixels = dropPointX - layerX;
        return timelineOffsetPixels / props.pixelsPerSecond;
    }
    if (monitor.getItemType() === TYPES.LAYER_ITEM) {
        const deltaPixels = monitor.getDifferenceFromInitialOffset();
        const deltaTimeSeconds = deltaPixels.x / props.pixelsPerSecond;
        return item.timelineOffset + deltaTimeSeconds;
    }
}

function checkForCollisions(droppedItemRange, droppedItemData, existingItems, hasAlreadySnapped = false, ad) {
    const { x1, x2 } = droppedItemRange;
    const { playDuration, frontendId } = droppedItemData;
    let newOffsetXSeconds = x1;
    let didSnapFlag = false;
    let previousCollisionId = null;
    (ad ? [ad].concat(existingItems) : existingItems).forEach(item => {
        if (item.frontendId !== frontendId) {
            const x1Existing = item.timelineOffset;
            const x2Existing = item.timelineOffset + item.playDuration;
            if ((x1 >= x1Existing && x1 <= x2Existing) || (x1 <= x1Existing && x2 >= x2Existing)) {
                if (!didSnapFlag) {
                    didSnapFlag = true;
                    previousCollisionId = item.frontendId;
                    newOffsetXSeconds =
                        Math.abs(x1 - x1Existing) < Math.abs(x2Existing - x1) ? x1Existing - playDuration : x2Existing; //snap to the closest overlap point
                }
            } else if (x2 >= x1Existing && x2 <= x2Existing) {
                if (!didSnapFlag) {
                    didSnapFlag = true;
                    previousCollisionId = item.frontendId;
                    newOffsetXSeconds =
                        Math.abs(x2 - x1Existing) < Math.abs(x2Existing - x2) ? x1Existing - playDuration : x2Existing;
                }
            }
        }
    });

    const newRange = {
        x1: newOffsetXSeconds,
        x2: newOffsetXSeconds + playDuration,
    };

    if (hasAlreadySnapped && didSnapFlag) {
        // terminate and reject the drop if the first snap results in another collision
        return {
            ...newRange,
            shouldRejectDrop: true,
        };
    } else if (didSnapFlag) {
        return checkForCollisions(
            newRange,
            droppedItemData,
            existingItems.filter(i => i.frontendId !== previousCollisionId),
            true,
            ad,
        ); // recursive call to determine if snap caused another collision
    } else {
        return {
            ...newRange,
            shouldRejectDrop: false,
        };
    }
}

// used by react DND
const layerTarget = {
    canDrop(props, monitor) {
        const leftOffsetSeconds = getDropXOffsetSeconds(props, monitor);
        let item = monitor.getItem();
        item = {
            ...item,
            playDuration: item.playDuration ? item.playDuration : item.duration / 1000, //the case when items are being dragged from the list
        };
        const rightOffsetSeconds = leftOffsetSeconds + item.playDuration;
        const { shouldRejectDrop } = checkForCollisions(
            { x1: leftOffsetSeconds, x2: rightOffsetSeconds },
            item,
            props.recordingSnippets,
            false,
            props.ad,
        );
        const exceededNumberOfSnippets = props.layerRecordings.length + 1 > maximumNumberOfSnippetsInEditor;
        const movingExistingSnippet = !isNaN(item.timelineOffset);
        if (!movingExistingSnippet && exceededNumberOfSnippets && !props.isDropWarningVisible) {
            props.showDropWarning(true);
        }
        return !shouldRejectDrop && (movingExistingSnippet || !exceededNumberOfSnippets);
    },

    drop(props, monitor) {
        let leftOffsetSeconds = getDropXOffsetSeconds(props, monitor);
        const { ad } = props;
        if (ad && leftOffsetSeconds < ad.playDuration) {
            leftOffsetSeconds = Math.abs(ad.playDuration);
        }

        let item = monitor.getItem();
        item = {
            ...item,
            playDuration: item.playDuration ? item.playDuration : item.duration / 1000,
        };
        const movingExistingSnippet = !isNaN(item.timelineOffset);
        if (!movingExistingSnippet) {
            props.logDropSnippet(item.id);
        }
        const rightOffsetSeconds = leftOffsetSeconds + item.playDuration;
        const { x1 } = checkForCollisions(
            { x1: leftOffsetSeconds, x2: rightOffsetSeconds },
            item,
            props.recordingSnippets,
            false,
            props.ad,
        );
        return {
            timelineOffsetSeconds: x1,
            layerId: props.layer.frontendId,
            item: monitor.getItem(),
        };
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

class Layer extends Component {
    render() {
        const { layer, width, recordingSnippets, connectDropTarget } = this.props;

        return connectDropTarget(
            <div className={css(styles.layer)} style={{ width }}>
                {recordingSnippets.map(item => (
                    <Item item={item} key={item.frontendId} audioVolume={layer.audioVolume} />
                ))}
            </div>,
        );
    }
}

export default container(DropTarget([TYPES.LAYER_ITEM, TYPES.RECORDING], layerTarget, collect)(Layer));
