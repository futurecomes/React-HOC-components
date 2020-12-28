import * as React from 'react';
import { connect } from 'react-redux';
import { initialize } from 'redux-form';

import { toggleModal } from 'src/actions/old/shows';
import { BlueButton } from './style';

interface Props {
    isOpen: boolean;
    toggleModal: typeof toggleModal;
    initialize: typeof initialize;
}

export const CreateShowButtonPure: React.FC<Props> = ({ toggleModal, initialize }) => {
    const open = () => {
        initialize('createShow', {}, false);
        toggleModal({ type: 'create' });
    };

    return <BlueButton onClick={open}>Create Show</BlueButton>;
};

export const CreateShowButton = connect(
    null,
    { toggleModal, initialize },
)(CreateShowButtonPure);
