import React, { Component } from 'react';
import { connect } from 'react-redux';
import _reverse from 'lodash/reverse';

import { addLayer } from 'src/actions/old/editor';

function mapStateToProps({
    editor: {
        present: { layers },
    },
}) {
    return {
        layers: _reverse([...layers]),
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
        },
    )(Container);
}

export default createContainer;
