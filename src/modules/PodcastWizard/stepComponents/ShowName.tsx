import { Input } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { AppState } from 'src/config/appState';
import { Dispatch } from 'src/config/store';

import { StepButtons } from '../components/StepButtons';
import { PodcastWizardStepsEnum } from '../models/podcastWizard';
import { getShowTitle } from '../selectors/podcastWizardSelectors';
import * as S from './styles';

interface StateProps {
    showTitle: string;
}

type Props = StateProps & ReturnType<typeof mapDispatchToProps>;

class ShowNameContainer extends React.Component<Props> {
    public handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        this.props.changeShowInfo({ field: 'title', value: e.target.value });

    public render(): JSX.Element {
        return (
            <S.StepWrapper>
                <S.StepHeader>Name your show</S.StepHeader>
                <Input onChange={this.handleInputChange} value={this.props.showTitle} />
                <StepButtons
                    nextStep={PodcastWizardStepsEnum.ShowCategories}
                    nextDisabled={this.props.showTitle === ''}
                />
            </S.StepWrapper>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    showTitle: getShowTitle(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeShowInfo: dispatch.podcastWizard.changeShowInfo,
});

export const ShowName = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShowNameContainer);
