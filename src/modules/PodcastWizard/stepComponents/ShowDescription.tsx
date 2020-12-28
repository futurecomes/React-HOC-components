import { Input } from 'antd';
import React from 'react';
import { connect } from 'react-redux';

import { AppState } from 'src/config/appState';
import { Dispatch } from 'src/config/store';

import { StepButtons } from '../components/StepButtons';
import { PodcastWizardStepsEnum } from '../models/podcastWizard';
import { getShowDescription } from '../selectors/podcastWizardSelectors';
import * as S from './styles';

interface StateProps {
    showDescription: string;
}

type Props = StateProps & ReturnType<typeof mapDispatchToProps>;

class ShowDescriptionContainer extends React.Component<Props> {
    public handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) =>
        this.props.changeShowInfo({ field: 'description', value: e.target.value });

    public render(): JSX.Element {
        return (
            <S.StepWrapper fullWidth>
                <S.HalfScreenContentColumn dark>
                    <S.StepHeader>Write your show description</S.StepHeader>
                    <h4>Here's a format that works:</h4>
                    <p>
                        Turducken cow tongue short loin burgdoggen kielbasa pastrami buffalo brisket drumstick cupim
                        filet mignon. Buffalo short ribs ham andouille bresaola pork shankle bacon ribeye. Chicken
                        sirloin pork loin short ribs tongue ham hock leberkas, andouille tenderloin.
                    </p>
                    <p>
                        Turducken cow tongue short loin burgdoggen kielbasa pastrami buffalo brisket drumstick cupim
                        filet mignon.
                    </p>
                    <p>
                        Turducken cow tongue short loin burgdoggen kielbasa pastrami buffalo brisket drumstick cupim
                        filet mignon. Buffalo short ribs ham andouille bresaola pork shankle bacon ribeye. Chicken
                        sirloin pork loin short ribs tongue ham hock leberkas, andouille tenderloin. Bresaola brisket
                        doner beef kielbasa rump. Kevin tenderloin alcatra beef, picanha spare ribs tail landjaeger cow
                        jerky.
                    </p>
                </S.HalfScreenContentColumn>
                <S.HalfScreenContentColumn contentCentered>
                    <Input.TextArea onChange={this.handleInputChange} value={this.props.showDescription} rows={5} />
                    <StepButtons
                        prevStep={PodcastWizardStepsEnum.ShowCategories}
                        nextStep={PodcastWizardStepsEnum.Recorder}
                        nextDisabled={this.props.showDescription === ''}
                        allowLater
                    />
                </S.HalfScreenContentColumn>
            </S.StepWrapper>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    showDescription: getShowDescription(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    changeShowInfo: dispatch.podcastWizard.changeShowInfo,
});

export const ShowDescription = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShowDescriptionContainer);
