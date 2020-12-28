import _isEmpty from 'lodash/isEmpty';
import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Router as ReactRouter, Switch } from 'react-router-dom';
import { StripeProvider } from 'react-stripe-elements';

import { AppState } from 'src/config/appState';
import { STRIPE_KEY } from 'src/config/settings';
import { fetchUser } from 'src/modules/Auth/actions/auth';
import { Layout } from 'src/modules/Layout/Layout';
import { Loading } from 'src/shared/components/old/Loading';
import { history } from 'src/shared/helpers/history';

import { CustomRoute } from './CustomRoute';
import { redirects } from './redirects';
import { routes } from './routes';
import { ScrollToTop } from './ScrollToTop';

interface StateProps {
    isUserInfoFetched?: boolean;
    isAuthenticated?: boolean;
    isAdmin?: boolean;
    hasPaidFeaturesAccess?: boolean;
}

interface ActionsProps {
    fetchUser: typeof fetchUser;
}

type Props = StateProps & ActionsProps;

export class RouterContainer extends React.Component<Props> {
    public componentDidUpdate(): void {
        // componentDidUpdate (not didMount) for JWT token debugging purposes - otherwise getUser gets fired before rehydrate with old token
        this.props.fetchUser(true);
    }

    public render(): JSX.Element {
        return (
            <ReactRouter history={history}>
                <ScrollToTop>
                    <StripeProvider apiKey={STRIPE_KEY}>
                        <Layout>
                            <React.Suspense fallback={<Loading />}>
                                <Switch>
                                    {redirects.map(route => (
                                        <Redirect key={route.from} from={route.from} to={route.to} />
                                    ))}
                                    {routes.map(route => (
                                        <CustomRoute
                                            key={route.path}
                                            component={route.component}
                                            {...this.props}
                                            {...route}
                                        />
                                    ))}
                                </Switch>
                            </React.Suspense>
                        </Layout>
                    </StripeProvider>
                </ScrollToTop>
            </ReactRouter>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    // TODO: Selectors
    isUserInfoFetched: !state.auth.isFetching && !_isEmpty(state.auth.user),
    isAuthenticated: !!state.auth.token,
    isAdmin: !!state.auth.user.admin,
    hasPaidFeaturesAccess: state.billing.userSubscriptions.some((s: any) => /premium|basic/.test(s.planId)),
});

export const Router = connect(
    mapStateToProps,
    { fetchUser },
)(RouterContainer);
