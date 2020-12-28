import { Col, Row } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter, Redirect } from 'react-router';

import { AppState } from 'src/config/appState';
import { fetchPodcast, fetchPodcastData } from 'src/modules/Podcasts/actions/oldPodcastsActions';
import { ContentWrapper, SectionWrapper } from 'src/shared/styled/styles';
import { color } from 'src/styles/variables';

import { CenteredSpinner } from 'src/shared/components/old/CenteredSpinner';
import { Show } from '../models/podcasts';
import { PlayList } from './containers/PlayList';
import { ShowDetails } from './containers/ShowDetails';
import { ShowProtectionInput } from './containers/ShowProtectionInput';
import { getShow, isAccessGranted, isPasswordProtected, isPodcastsFetching } from './showSelectors';

interface StateProps {
    show: Show;
    isShowPasswordProtected: boolean;
    isAccessGranted: boolean;
    isFetching: boolean;
}

interface ActionsProps {
    fetchPodcast: typeof fetchPodcast;
    fetchPodcastData: typeof fetchPodcastData;
}

type Props = RouteComponentProps<{ id: string }> & StateProps & ActionsProps;

class ShowContainer extends React.Component<Props> {
    public componentDidMount(): void {
        const isCustomizedShowPath = this.props.match.path === '/';

        isCustomizedShowPath
            ? this.props.fetchPodcast(location.pathname.slice(1))
            : this.props.fetchPodcastData(this.props.match.params.id); // sliced from 1 becase pathname contains slash sign
    }

    public render(): JSX.Element {
        if (this.props.isFetching) {
            return <CenteredSpinner />;
        }

        return this.props.show ? (
            <SectionWrapper backgroundColor={color.solitude}>
                <ContentWrapper>
                    <Row type="flex">
                        <Col xs={24} lg={9}>
                            <ShowDetails show={this.props.show} />
                        </Col>
                        <Col xs={24} lg={{ span: 14, offset: 1 }}>
                            {this.props.isShowPasswordProtected && !this.props.isAccessGranted ? (
                                <ShowProtectionInput />
                            ) : (
                                <PlayList />
                            )}
                        </Col>
                    </Row>
                </ContentWrapper>
            </SectionWrapper>
        ) : (
            <Redirect to="/show-not-found" />
        );
    }
}

export default connect(
    (state: AppState) => ({
        show: getShow(state),
        isShowPasswordProtected: isPasswordProtected(state),
        isAccessGranted: isAccessGranted(state),
        isFetching: isPodcastsFetching(state),
    }),
    {
        fetchPodcast,
        fetchPodcastData,
    },
)(withRouter(ShowContainer));
