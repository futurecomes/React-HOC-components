import { Col, Input, Row, Select } from 'antd';
import * as H from 'history';
import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';

import { AppState } from 'src/config/appState';
import { media } from 'src/styles/variables';

import { getPodcastsCategories } from '../../selectors/podcastsSelectors';
import {
    changeCurrentCategory,
    changeSearchTerm,
    clearSearchResults,
    searchForPodcasts,
} from '../actions/listenActions';
import { Category } from '../models/listen';
import { getCurrentCategory, getSearchTerm } from '../selectors/listenSelectors';

const ToolbarWrapper = styled(Row)({
    flexDirection: 'column-reverse',
    [media.sm]: {
        flexDirection: 'row',
    },
});

const CategoriesSelect = styled(Select)({
    width: '100%',
    maxWidth: '100%',
    marginTop: '0.5rem',
    [media.sm]: {
        width: '17rem',
        marginTop: 0,
    },
});

const Search = styled(Input.Search)({
    '&&.ant-input-search': {
        input: {
            padding: '0.25rem 0.5rem 0.4rem',
        },
    },
});

interface StateProps {
    searchTerm?: string;
    categories: Category[];
    currentCategory: Category | undefined;
}

interface ActionsProps {
    searchForPodcasts: typeof searchForPodcasts;
    changeCurrentCategory: typeof changeCurrentCategory;
    changeSearchTerm: typeof changeSearchTerm;
    clearSearchResults: typeof clearSearchResults;
}

interface Props extends StateProps, ActionsProps {
    history: H.History;
}

class ToolbarContainer extends React.Component<Props> {
    public handleOnInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.changeSearchTerm(e.target.value);
    };

    private handleOnCategoryChange = (categoryId: number) => {
        const newCurrentCategory = this.props.categories.find(category => category.id === categoryId);

        if (newCurrentCategory) {
            this.setState({ searchTerm: '' });
            this.props.changeCurrentCategory(newCurrentCategory);
            this.props.history.push(`/listen/category/${newCurrentCategory.urlParam}`);
        }
    };

    private handleOnSearch = () => {
        const { searchTerm, history } = this.props;

        this.props.clearSearchResults();

        if (searchTerm && searchTerm !== '') {
            history.push('/listen');
            this.props.searchForPodcasts(0, searchTerm);
        }
    };

    public render(): JSX.Element | null {
        const { categories, currentCategory, searchTerm } = this.props;

        return (
            <ToolbarWrapper type="flex">
                <Col sm={14} lg={16}>
                    <CategoriesSelect
                        value={currentCategory ? currentCategory.id : undefined}
                        placeholder="Categories"
                        onChange={this.handleOnCategoryChange}
                    >
                        {categories.map(category => (
                            <Select.Option key={category.name} value={category.id}>
                                {category.name}
                            </Select.Option>
                        ))}
                    </CategoriesSelect>
                </Col>
                <Col sm={10} lg={8}>
                    <Search
                        value={searchTerm}
                        onChange={this.handleOnInputChange}
                        onPressEnter={this.handleOnSearch}
                        onSearch={this.handleOnSearch}
                        placeholder="Search for Podcasts"
                    />
                </Col>
            </ToolbarWrapper>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    searchTerm: getSearchTerm(state),
    categories: getPodcastsCategories(state),
    currentCategory: getCurrentCategory(state),
});

export const Toolbar = connect(
    mapStateToProps,
    {
        searchForPodcasts,
        changeCurrentCategory,
        changeSearchTerm,
        clearSearchResults,
    },
)(ToolbarContainer);
