import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchUnplayedPodcasts } from 'src/modules/Podcasts/actions/oldPodcastsActions';
import createAsyncFetch from 'src/containers/hoc/AsyncFetch';

function sortEpisodes(episodes) {
    return episodes.reduce((ret, episode) => {
        const key = new Date(episode.createdAt).toLocaleDateString();
        // eslint-disable-next-line no-param-reassign
        if (!ret[key]) ret[key] = [];
        ret[key].push(episode);

        return ret;
    }, {});
}

function mapStateToProps({ podcasts: { isFetching, unplayed }, isPersisted }) {
    return {
        isFetching,
        episodes: sortEpisodes(unplayed),
        isRehydrated: isPersisted,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            fetch: fetchUnplayedPodcasts,
        },
        dispatch,
    );
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default createAsyncFetch(container);
