import React from 'react';
import { connect } from 'react-redux';
import Spinner from 'react-svg-spinner';

import { Draft } from './components/Draft';
import { Header } from './components/Header';
import * as S from './components/styled';

import { fetchDrafts, draftRehydrate, deleteDraft } from './actions/actions';

class Drafts extends React.Component {
    componentDidMount() {
        this.props.fetchDrafts();
    }

    render() {
        const { drafts } = this.props;
        return (
            <div>
                <S.Title>My Drafts</S.Title>

                {drafts.isLoading && (
                    <S.LoadingWrapper>
                        <Spinner size="64px" speed="fast" />
                    </S.LoadingWrapper>
                )}
                {drafts.isEmpty === false && (
                    <S.Table>
                        <Header />
                        {drafts.data.map(draft => (
                            <Draft
                                deleteDraft={this.props.deleteDraft}
                                draftRehydrate={this.props.draftRehydrate}
                                key={draft.id}
                                draft={draft}
                            />
                        ))}
                    </S.Table>
                )}
                {drafts.isEmpty && <p>You don't have any drafts!</p>}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        drafts: state.editorMeta.drafts,
    };
}

export default connect(
    mapStateToProps,
    {
        fetchDrafts,
        draftRehydrate,
        deleteDraft,
    },
)(Drafts);
