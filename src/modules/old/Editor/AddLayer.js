import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';

import { Overlay } from 'src/shared/components/old/shared/Overlay';
import container from 'src/containers/editor/AddLayer';
import { maximumNumberOfSnippetsInEditor } from 'src/config/settings';
import { css } from 'src/styles/old';

import { TYPES } from './constants';
import styles from './styles';

const layerTarget = {
    canDrop(props, monitor) {
        const movingExistingSnippet = !isNaN(monitor.getItem().timelineOffset);
        const exceededNumberOfSnippets = props.layerRecordings.length + 1 > maximumNumberOfSnippetsInEditor;
        if (!movingExistingSnippet && exceededNumberOfSnippets && !props.isDropWarningVisible) {
            props.showDropWarning(true);
        }
        return movingExistingSnippet || !exceededNumberOfSnippets;
    },
    drop(props, monitor, component) {
        const item = Object.assign({}, monitor.getItem());
        const { ad } = props;
        const movingExistingSnippet = !isNaN(monitor.getItem().timelineOffset);
        if (!movingExistingSnippet) {
            props.logDropSnippet(item.id);
        }
        if (ad) {
            item.timelineOffset = ad.playDuration;
        }
        component.addLayer(item);
    },
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

class AddLayer extends Component {
    componentDidUpdate(prevProps) {
        if (prevProps.isOver && !this.props.isOver) {
            this.props.showDropWarning(false);
        }
    }
    addLayer = recording => {
        this.props.addLayer(recording);
    };

    render() {
        const { connectDropTarget, isDropWarningVisible, numberOfLayers } = this.props;
        return connectDropTarget(
            <div className={css(styles.layer, styles.addLayer)}>
                <div className={css(styles.layerAudio, styles.addLayerAudio)}>
                    <div className={css(styles.layerAudioBox, styles.muted)}>
                        <div className={css(styles.layerAudioLabel)}>New Layer</div>
                    </div>
                </div>
                <div className={css(styles.addLayerText)}>
                    <div>Drag and drop a recording here to add a layer</div>
                </div>
                {isDropWarningVisible && (
                    <Overlay top={-(numberOfLayers * 150 + 50)}>
                        You have exceeded maximum number of snippets (30)
                    </Overlay>
                )}
            </div>,
        );
    }
}

export default container(DropTarget([TYPES.RECORDING, TYPES.LAYER_ITEM], layerTarget, collect)(AddLayer));
