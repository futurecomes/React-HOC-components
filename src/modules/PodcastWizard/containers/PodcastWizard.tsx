import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { AppState } from 'src/config/appState';

import { PodcastWizardStepsEnum } from '../models/podcastWizard';
import { podcastWizardStepsData } from '../models/podcastWizardData';
import { getCurrentPodcastWizardStep } from '../selectors/podcastWizardSelectors';

const PodcastWizardWrapper = styled.div({
    minHeight: '50rem',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
});

interface StateProps {
    currentStep: PodcastWizardStepsEnum;
}

class PodcastWizardContainer extends React.Component<StateProps> {
    public render(): JSX.Element | null {
        const currentStepData = podcastWizardStepsData[this.props.currentStep];

        const CurrentStepComponent = currentStepData && currentStepData.component;

        return CurrentStepComponent ? (
            <PodcastWizardWrapper>
                <CurrentStepComponent />
            </PodcastWizardWrapper>
        ) : null;
    }
}

const mapStateToProps = (state: AppState) => ({
    currentStep: getCurrentPodcastWizardStep(state),
});

const PodcastWizard = connect(mapStateToProps)(PodcastWizardContainer);

export default PodcastWizard;
