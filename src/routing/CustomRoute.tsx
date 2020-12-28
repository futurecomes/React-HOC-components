import React from 'react';
import { Redirect, Route } from 'react-router-dom';

interface Props {
    component: React.ComponentType<any>;
    redirectTo?: string;
    secured?: boolean;
    loggedInRedirect?: boolean;
    isUserInfoFetched?: boolean;
    isAuthenticated?: boolean;
    adminFeature?: boolean;
    isAdmin?: boolean;
    paidFeature?: boolean;
    hasPaidFeaturesAccess?: boolean;
}

export const CustomRoute: React.FC<Props> = ({
    component: Component,
    isUserInfoFetched,
    secured = false,
    loggedInRedirect = false,
    isAuthenticated,
    paidFeature,
    adminFeature,
    isAdmin,
    hasPaidFeaturesAccess,
    redirectTo = '/my-podcasts',
    // tslint:disable-next-line:trailing-comma
    ...rest
}) => {
    if (secured) {
        redirectTo = '/';
    } else if (adminFeature) {
        redirectTo = '/listen';
    }

    const shouldRedirect =
        (secured && !isAuthenticated) ||
        (paidFeature && !hasPaidFeaturesAccess) ||
        (adminFeature && !isAdmin) ||
        (loggedInRedirect && isAuthenticated);
    return (
        <Route
            {...rest}
            render={props =>
                shouldRedirect && isUserInfoFetched ? <Redirect to={redirectTo} /> : <Component {...props} />
            }
        />
    );
};
