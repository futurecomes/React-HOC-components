import React from 'react';
import { injectStripe } from 'react-stripe-elements';
import _throttle from 'lodash/throttle';

import ShowAPI from 'src/api/shows';
import { ShowPayment } from './ShowPayment';

class PromoteShowForm extends React.Component {
    state = {
        isLoading: false,
        success: null,
        payButtonDisabled: false,
    };

    promoteShow = async () => {
        this.setState({ payButtonDisabled: true });
        const response = await this.props.stripe.createToken();
        if (!response.token) {
            return;
        }
        this.setState({ isLoading: true });
        ShowAPI.promote(this.props.userToken, this.props.showId, response.token.id).then(() => {
            this.setState({ success: true, isLoading: false });
            this.props.editShow(this.props.showId, { promoted: true });
        });
    };

    promoteThrottled = _throttle(this.promoteShow, 10000, { trailing: false });

    onSubmit = e => {
        e.preventDefault();
        this.promoteThrottled();
    };

    render() {
        return (
            <ShowPayment
                {...this.state}
                onSubmit={this.onSubmit}
                price={7}
                payButtonText="Promote"
                message="This show is now being promoted!"
                description={`This promotion package will feature your podcast under "Can't Miss Shows" on the
            Listen page of Messy.fm for 7 days, starting immediately at the time of purchase.`}
            />
        );
    }
}

export const PromoteShowFormContainer = injectStripe(PromoteShowForm);
