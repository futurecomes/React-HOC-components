import React from 'react';
import { Redirect } from 'react-router-dom';

import isAuthenticatedHOC from 'src/containers/hoc/isAuthenticated';

export default function requireAuthHOC(toURI = '/', ComposedComponent) {
    /* eslint-disable no-nested-ternary */
    const RequireAuth = ({ isAuthenticated, isAdmin, hasUser, ...props }) =>
        !hasUser ? <div /> : isAuthenticated && isAdmin ? <ComposedComponent {...props} /> : <Redirect to={toURI} />;
    /* eslint-enable */

    return isAuthenticatedHOC(RequireAuth);
}
