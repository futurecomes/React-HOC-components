import { Col, Row } from 'antd';
import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { AppState } from 'src/config/appState';
import { Dispatch } from 'src/config/store';
import { fetchCategories } from 'src/modules/Podcasts/actions/oldPodcastsActions';
import { ShowCategory } from 'src/modules/Podcasts/models/podcasts';
import { color } from 'src/styles/variables';

import { StepButtons } from '../components/StepButtons';
import { PodcastWizardStepsEnum } from '../models/podcastWizard';
import { getShowCategories, getShowCategoriesIds } from '../selectors/podcastWizardSelectors';
import * as S from './styles';

const CategoryWrapper = styled(Col)({
    padding: '1rem',
});

interface CategoryProps {
    selected?: boolean;
}

const Category = styled.div<CategoryProps>(
    {
        backgroundColor: color.solitude,
        padding: '1rem',
        textAlign: 'center',
        cursor: 'pointer',
        transition: 'background-color 0.2s, color 0.2s',
        '&:hover': {
            backgroundColor: color.white,
            color: color.royalBlue,
        },
    },
    ({ selected }) =>
        selected && {
            backgroundColor: color.white,
            color: color.royalBlue,
        },
);

interface StateProps {
    possibleCategories: ShowCategory[];
    showCategoriesIds: number[];
}

type Props = StateProps & ReturnType<typeof mapDispatchToProps>;

class ShowCategoriesContainer extends React.Component<Props> {
    public componentDidMount(): void {
        this.props.fetchCategories();
    }

    private handleToggleCategory = (id: number) => () => this.props.toggleShowCategory(id);

    public render(): JSX.Element {
        const { possibleCategories, showCategoriesIds } = this.props;

        return (
            <S.StepWrapper>
                <S.StepHeader>
                    Choose categories <span>(max. 3)</span>
                </S.StepHeader>
                {possibleCategories && (
                    <Row type="flex">
                        {possibleCategories.map(category => (
                            <CategoryWrapper sm={8} key={category.name}>
                                <Category
                                    selected={!!(category.id && showCategoriesIds.includes(category.id))}
                                    onClick={this.handleToggleCategory(category.id)}
                                >
                                    {category.name}
                                </Category>
                            </CategoryWrapper>
                        ))}
                    </Row>
                )}
                <StepButtons
                    prevStep={PodcastWizardStepsEnum.ShowName}
                    nextStep={PodcastWizardStepsEnum.ShowDescription}
                    nextDisabled={showCategoriesIds.length === 0}
                    allowLater
                />
            </S.StepWrapper>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    possibleCategories: getShowCategories(state),
    showCategoriesIds: getShowCategoriesIds(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
    toggleShowCategory: dispatch.podcastWizard.toggleShowCategory,
    fetchCategories: () => dispatch(fetchCategories()),
});

export const ShowCategories = connect(
    mapStateToProps,
    mapDispatchToProps,
)(ShowCategoriesContainer);
