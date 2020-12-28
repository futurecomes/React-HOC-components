import React from 'react';

import { StepButtons } from '../components/StepButtons';
import { PodcastWizardStepsEnum } from '../models/podcastWizard';
import * as S from './styles';

export class Editor extends React.Component {
    public render(): JSX.Element {
        return (
            <S.StepWrapper>
                <S.StepHeader>Editor</S.StepHeader>
                <StepButtons prevStep={PodcastWizardStepsEnum.Recorder} />
            </S.StepWrapper>
        );
    }
}
