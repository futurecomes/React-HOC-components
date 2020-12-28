import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { clearMessages } from 'src/actions/old/messages';

function mapStateToProps({ messages }) {
    return {
        messages: {
            errors: messages.form.errors,
            successes: messages.form.successes,
        },
    };
}

const clearFormMessages = clearMessages.bind(null, 'form');

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            clearMessages: clearFormMessages,
        },
        dispatch,
    );
}

export default connect(
    mapStateToProps,
    mapDispatchToProps,
);
