import * as H from 'history';
import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import arrowLeft from 'src/public/img/icons/slider-arrow-left.svg';

import { color } from 'src/styles/variables';

import { clearSearchPodcasts } from '../actions/listenActions';

const BackButtonWrapper = styled.a({
    display: 'flex',
    width: 'fit-content',
    alignItems: 'center',
    marginBottom: '1.5rem',
    color: color.scorpion,
    transition: 'color 0.2s',

    img: {
        maxHeight: '0.75rem',
        marginRight: '0.75rem',
    },
    '&:hover': {
        color: color.royalBlue,
    },
});

interface ActionsProps {
    clearSearchPodcasts: typeof clearSearchPodcasts;
}

interface Props extends ActionsProps {
    history: H.History;
}

export const BackButtonContainer: React.FC<Props> = props => {
    const goToListen = () => {
        props.clearSearchPodcasts();
        props.history.push('/listen');
    };

    return (
        <BackButtonWrapper onClick={goToListen}>
            <img src={arrowLeft} />
            <span>Back</span>
        </BackButtonWrapper>
    );
};

export const BackButton = connect(
    null,
    {
        clearSearchPodcasts,
    },
)(BackButtonContainer);
