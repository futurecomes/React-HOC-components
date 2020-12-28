import { Component, createElement } from 'react';
import { connect } from 'react-redux';
import { fetchShowStats, fetchShowLocationStats } from 'src/actions/old/shows';
import { editorInitialize, selectShow, setEpisodeDescription, setEpisodeName } from 'src/actions/old/editor';
import {
    fetchUserShows,
    editShow,
    openUnprotectPodcastModal,
    closeUnprotectPodcastModal,
} from 'src/modules/old/Shows/actions';
import { submitUnprotectPodcast, submitProtectPodcast } from 'src/modules/old/Shows/thunks/api';
import { fetchCategories } from 'src/modules/Podcasts/actions/oldPodcastsActions';

const mapStateToProps = ({
    auth: { user },
    billing: { currentPlan },
    shows: { list, isFetching, stats, locationStats, isLoadingShows },
    editorMeta: { drafts },
    showsReducers: {
        ui: { unprotectPodcastModal },
    },
}) => {
    return {
        isFetching,
        shows: list,
        stats,
        locationStats,
        user,
        isPaidUser: /basic|premium/.test(currentPlan.type),
        drafts,
        isLoadingShows,
        unprotectPodcastModal,
    };
};

const mapDispatchToProps = {
    fetchUserShows,
    fetchShowStats,
    fetchShowLocationStats,
    editorInitialize,
    selectShow,
    setEpisodeDescription,
    setEpisodeName,
    fetchCategories,
    editShow,
    openUnprotectPodcastModal,
    closeUnprotectPodcastModal,
    submitUnprotectPodcast,
    submitProtectPodcast,
};

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

const createContainer = ComposedComponent =>
    container(
        class Container extends Component {
            componentDidMount() {
                this.props.fetchUserShows();
                this.props.fetchCategories();
            }

            render() {
                return createElement(ComposedComponent, this.props, null);
            }
        },
    );

export default createContainer;
