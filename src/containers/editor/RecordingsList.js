import React, { Component } from 'react';
import { connect } from 'react-redux';
import _orderBy from 'lodash/orderBy';

import { fetchSessions, fetchRecordings, fetchFreeMusic } from 'src/actions/old/recording';

import { addLayer } from 'src/actions/old/editor';
import { addMusicLibraryToBasket } from 'src/shared/components/old/Billing/actions';

function mapStateToProps({ recording: { sessions, recordings, freeMusic }, billing, editor, auth }) {
    return {
        token: auth.token,
        isLoading: billing.currentPlan.type === 'free' && !editor.present.layerRecordings.find(e => e.isAd),
        sessions: sessions
            .map(s => ({
                ...s,
                recordings: recordings.filter(({ session }) => session === s.id),
            }))
            .filter(s => s.recordings.length > 0),
        freeMusic: [{ name: 'Messy Music Library', createdAt: null, recordings: _orderBy(freeMusic, 'name') }],
        musicLibraryTotalAccess: auth.user.musicLibraryTotalAccess,
        musicLibraryInBasket: billing.freeMusicBasket.musicLibrary,
    };
}

function createContainer(ComposedComponent) {
    class Container extends Component {
        componentDidMount() {
            this.props.fetchSessions();
            this.props.fetchRecordings();
            this.props.fetchFreeMusic();
        }

        render() {
            return <ComposedComponent {...this.props} />;
        }
    }

    return connect(
        mapStateToProps,
        {
            fetchSessions,
            fetchRecordings,
            addLayer,
            fetchFreeMusic,
            addMusicLibraryToBasket,
        },
    )(Container);
}

export default createContainer;
