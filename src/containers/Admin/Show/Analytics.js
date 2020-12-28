import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchShowAnalytics } from 'src/actions/old/admin';

function mapStateToProps({
    admin: {
        analytics: {
            show: { subscriberCount, recorderUsedPercent, editorUsedPercent },
        },
    },
}) {
    return {
        subscriberCount: subscriberCount || 0,
        recorderUsedPercent: recorderUsedPercent || 0,
        editorUsedPercent: editorUsedPercent || 0,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetch: fetchShowAnalytics,
        },
        dispatch,
    );
}

function createContainer(ComposedComponent) {
    class ShowAnalytics extends Component {
        componentDidMount() {
            if (this.props.id !== undefined) {
                this.props.fetch(this.props.id);
            }
        }

        componentWillReceiveProps({ id }) {
            if (id !== this.props.id && id !== undefined) {
                this.props.fetch(id);
            }
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    ShowAnalytics.defaultProps = {
        id: undefined,
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(ShowAnalytics);
}

export default createContainer;
