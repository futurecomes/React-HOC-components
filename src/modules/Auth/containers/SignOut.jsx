// Legacy
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { signOut } from 'src/modules/Auth/actions/auth';
import Loading from 'src/shared/components/old/activity/LinesIndicator';

class SignOutContainer extends Component {
    constructor(props) {
        super(props);
        this.doSignOut = this.doSignOut.bind(this);
    }

    componentDidMount() {
        this.doSignOut();
    }

    componentWillReceiveProps() {
        this.doSignOut();
    }

    doSignOut() {
        const { isPersisted } = this.props;
        if (isPersisted && !this.hasRun) {
            this.props.signOut();
            this.hasRun = true;
        }
    }

    render() {
        const {
            auth: { token },
        } = this.props;
        return token ? <Loading size={70} /> : <Redirect to="/signin" />;
    }
}

function mapStateToProps({ auth, isPersisted }) {
    return {
        auth,
        isPersisted,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            signOut,
        },
        dispatch,
    );
}

const SignOut = connect(
    mapStateToProps,
    mapDispatchToProps,
)(SignOutContainer);

export default SignOut;
