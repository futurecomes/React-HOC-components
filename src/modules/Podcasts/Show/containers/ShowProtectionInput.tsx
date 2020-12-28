import React, { FunctionComponent, useState } from 'react';
import { connect } from 'react-redux';

import { AppState } from 'src/config/appState';

import { passwordProtectedShowAccessRequest } from '../../actions/podcastsActions';
import { PasswordProtection } from '../components/PasswordProtection';
import { ProtectionStatus } from '../models/show';
import { getShowId, getShowProtection } from '../showSelectors';

interface StateProps {
    showId: number;
    protectionStatus: ProtectionStatus;
}

interface ActionsProps {
    passwordProtectedShowAccessRequest: typeof passwordProtectedShowAccessRequest;
}

interface Props extends StateProps, ActionsProps {
    onAccessGranted?: () => void;
}

const ShowProtectionInputContainer: FunctionComponent<Props> = ({
    showId,
    passwordProtectedShowAccessRequest,
    protectionStatus,
}) => {
    const [inputValue, changeInputValue] = useState('');
    const handleSubmitPasswordRequest = () => passwordProtectedShowAccessRequest({ showId, password: inputValue });
    const isPasswordIncorrect = protectionStatus.hasProceded && !protectionStatus.isAccessGranted;

    return (
        <PasswordProtection
            changePasswordValue={changeInputValue}
            isLoading={protectionStatus.isProcessing}
            onSubmit={handleSubmitPasswordRequest}
            isIncorrect={isPasswordIncorrect}
        />
    );
};

export const ShowProtectionInput = connect(
    (state: AppState) => ({
        showId: getShowId(state),
        protectionStatus: getShowProtection(state),
    }),
    { passwordProtectedShowAccessRequest },
)(ShowProtectionInputContainer);
