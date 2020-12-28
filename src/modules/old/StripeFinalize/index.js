import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { parse } from 'query-string';
import Spinner from 'react-svg-spinner';

import BillingAPI from 'src/api/billing';
import { updateUser } from 'src/modules/Auth/actions/authActions';

import { CircleTickMessage } from './CircleTickMessage';

import * as S from './styled';

class StripeFinalize extends React.Component {
    state = {
        success: null,
    };

    componentDidMount() {
        const { token, location } = this.props;
        const { code } = parse(location.search);
        if (!code) {
            return;
        }
        BillingAPI.finalizeExpressAccount(token, code)
            .then(res => {
                this.props.updateUser({ stripeExpressAccount: res.data.stripeExpressAccount });
                this.setState({ success: true });
            })
            .catch(() => this.setState({ success: false }));
    }

    render() {
        const { success } = this.state;
        if (success === null) {
            return (
                <S.Center>
                    <Spinner size="64px" speed="fast" />
                </S.Center>
            );
        }
        return success ? (
            <CircleTickMessage message="You are ready to get paid!" />
        ) : (
            <S.Center>
                <p>Something went wrong</p>
            </S.Center>
        );
    }
}
export default withRouter(
    connect(
        state => ({ token: state.auth.token }),
        { updateUser },
    )(StripeFinalize),
);
