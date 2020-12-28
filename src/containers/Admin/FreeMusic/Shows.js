import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchFreeMusicShows } from 'src/actions/old/admin';

function mapStateToProps({
    admin: {
        freeMusicShows: { data, totalCount },
    },
}) {
    return {
        freeMusic: data,
        totalCount,
    };
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetch: fetchFreeMusicShows.bind(null, props.id),
        },
        dispatch,
    );
}

function createContainer(ComposedComponent) {
    class FreeMusicShows extends Component {
        componentDidMount() {
            this.props.fetch();
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(FreeMusicShows);
}

export default createContainer;
