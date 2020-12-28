import React from 'react';

import { StepButtons } from '../components/StepButtons';
import { PodcastWizardStepsEnum } from '../models/podcastWizard';
import * as S from './styles';

export class Recorder extends React.Component {
    public render(): JSX.Element {
        return (
            <S.StepWrapper>
                <S.StepHeader>Recorder</S.StepHeader>
                <StepButtons prevStep={PodcastWizardStepsEnum.Recorder} nextStep={PodcastWizardStepsEnum.Editor} />
            </S.StepWrapper>
        );
    }
}
