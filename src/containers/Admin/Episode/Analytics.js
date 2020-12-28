import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

function mapStateToProps({
    admin: {
        episode: { recorderUsed = false, editorUsed = false, totalListens },
    },
}) {
    return {
        totalListens: totalListens || 0,
        recorderUsed,
        editorUsed,
    };
}

function mapDispatchToProps(dispatch, props) {
    return bindActionCreators(
        {
            fetch: function fetch() {}.bind(null, props.episodeId),
        },
        dispatch,
    );
}

const container = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default container;
