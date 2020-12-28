import { connect } from 'react-redux';

export const AuthContainer = connect(state => ({
    isUserLogged: !!state.auth.token,
}));
