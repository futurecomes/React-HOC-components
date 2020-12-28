import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { Button } from 'src/shared/components/Button';
import { color } from 'src/styles/variables';

import { Dispatch } from 'src/config/store';
import { PodcastWizardStepsEnum } from '../models/podcastWizard';

const Buttons = styled.div({
    display: 'flex',
    marginTop: '1rem',
});

const LaterLink = styled.a({
    display: 'inline-block',
    margin: '1rem auto 0',
    textDecoration: 'underline',
    color: color.scorpion,
    '&:hover': {
        textDecoration: 'underline',
        color: color.royalBlue,
    },
});

interface Props extends ReturnType<typeof mapDispatchToProps> {
    prevStep: PodcastWizardStepsEnum;
    nextStep: PodcastWizardStepsEnum;
    nextDisabled?: boolean;
    allowLater?: boolean;
}

const StepButtonsContainer: React.FC<Props> = ({ changeStep, prevStep, nextStep, nextDisabled, allowLater }) => (
    <>
        <Buttons>
            {prevStep && <Button onClick={() => changeStep(prevStep)}>Back</Button>}
            {nextStep && (
                <Button onClick={() => changeStep(nextStep)} disabled={nextDisabled}>
                    Next
                </Button>
            )}
        </Buttons>
        {allowLater && <LaterLink onClick={() => changeStep(nextStep)}>I'll do it later</LaterLink>}
    </>
);

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeStep: dispatch.podcastWizard.changeStep,
});

export const StepButtons = connect(
    null,
    mapDispatchToProps,
)(StepButtonsContainer);
