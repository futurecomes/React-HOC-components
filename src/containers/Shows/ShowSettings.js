import { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { reduxForm, initialize } from 'redux-form';
import { LANGUAGES } from 'src/config/constants/languages';
import { HOST } from 'src/config/settings';

import { editShow, deleteShow } from 'src/actions/old/shows';

function mapStateToProps({ shows: { isFetching }, billing }) {
    return {
        isFetching,
        isEmbedPodcastActive: billing.isEmbedPodcastActive,
    };
}

const container = connect(
    mapStateToProps,
    {
        editShow,
        deleteShow,
        initializeSettings: initialize,
    },
);

const form = reduxForm({
    form: 'showSettings',
});

function createContainer(ComposedComponent) {
    class Container extends Component {
        render() {
            return createElement(ComposedComponent, { ...this.props, languages: LANGUAGES, host: HOST }, null);
        }
    }

    return compose(
        container,
        form,
    )(Container);
}

export default createContainer;
