import React from 'react';
import { Redirect } from 'react-router-dom';

import isAuthenticatedHOC from 'src/containers/hoc/isAuthenticated';

export default function requireAuthHOC(toURI = '/', ComposedComponent) {
    const RequireAuth = ({ isAuthenticated, ...props }) =>
        isAuthenticated ? (
            <ComposedComponent {...props} />
        ) : (
            <Redirect to={{ pathname: toURI, state: { goBack: props.location.pathname } }} />
        );

    return isAuthenticatedHOC(RequireAuth);
}
