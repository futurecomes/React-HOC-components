import React, { Component } from 'react';
import { connect } from 'react-redux';

import { addLayer, setLayerVolume } from 'src/actions/old/editor';
function mapStateToProps({
    editor: {
        present: { layers },
    },
    billing: { currentPlan },
}) {
    return {
        isPremium: currentPlan && /premium/i.test(currentPlan.type),
        layers,
    };
}

function createContainer(ComposedComponent) {
    class Container extends Component {
        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return connect(
        mapStateToProps,
        {
            addLayer,
            setLayerVolume,
        },
    )(Container);
}

export default createContainer;
