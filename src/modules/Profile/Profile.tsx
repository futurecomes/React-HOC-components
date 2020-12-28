import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';

import { AppState } from 'src/config/appState';
import { fetchAuthoredPodcasts } from 'src/modules/Podcasts/actions/oldPodcastsActions';

import { Show } from '../Podcasts/models/podcasts';
import { getAuthoredShows, getIsPodcastsDataFetching } from '../Podcasts/selectors/podcastsSelectors';
import { fetchUserProfile } from './actions/profileActions';
import { ProfileInfo } from './components/ProfileInfo';
import { UserShows } from './components/UserShows';
import { User } from './models/profile';
import { getIsCurrentUser, getIsProfileFetching, getUser } from './selectors/profileSelectors';

const ProfileWrapper = styled.div({
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif', // to be added to the whole app in the future, only on new pages for now
    width: '100%',
});

interface MatchParams {
    profileId?: string;
}

interface ActionsProps {
    fetchUserProfile: typeof fetchUserProfile;
    fetchAuthoredPodcasts: typeof fetchAuthoredPodcasts;
}

interface StateProps {
    user: User;
    isFetchingProfile: boolean;
    isCurrentUser: boolean;
    userShows: Show[];
    isFetchingShows: boolean;
}

type Props = ActionsProps & StateProps & RouteComponentProps<MatchParams>;

class ProfileContainer extends React.PureComponent<Props> {
    public componentDidMount(): void {
        const { profileId } = this.props.match.params;

        if (profileId) {
            this.props.fetchUserProfile(profileId);
        }
    }

    public componentDidUpdate(prevProps: Props): void {
        // Done not to rewrite epics and actions
        if (prevProps.user.id !== this.props.user.id) {
            this.props.fetchAuthoredPodcasts(this.props.user.id);
        }
    }

    public render(): JSX.Element {
        const { isFetchingProfile, isFetchingShows, isCurrentUser, user, userShows } = this.props;

        return (
            <ProfileWrapper>
                <ProfileInfo
                    isFetching={isFetchingProfile}
                    isCurrentUser={isCurrentUser}
                    name={user.name}
                    bio={user.bio}
                    imageUrl={user.image}
                    facebookUrl={user.fbUrl}
                    instagramUrl={user.igUrl}
                    twitterUrl={user.twUrl}
                    youtubeUrl={user.ytUrl}
                />
                <UserShows shows={userShows} isFetching={isFetchingShows} />
            </ProfileWrapper>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    user: getUser(state),
    isFetchingProfile: getIsProfileFetching(state),
    isCurrentUser: getIsCurrentUser(state),
    userShows: getAuthoredShows(state),
    isFetchingShows: getIsPodcastsDataFetching(state),
});

const Profile = withRouter(
    connect(
        mapStateToProps,
        {
            fetchUserProfile,
            fetchAuthoredPodcasts,
        },
    )(ProfileContainer),
);

export default Profile;
