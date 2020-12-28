// Legacy used by credit card modal
import { setCreditCardWarning } from 'src/modules/Auth/actions/auth';
import closeSrc from 'src/shared/components/old/common/Modal/static/svg/close.svg';
import commonModalStyles, { modalStyles } from 'src/shared/components/old/common/Modal/styles';
import { css } from 'src/styles/old';

import React from 'react';
import styled from 'react-emotion';
import ReactModal from 'react-modal';
import { connect } from 'react-redux';
import { NavLink, RouteComponentProps, withRouter } from 'react-router-dom';

import logo from 'src/public/img/logo_messy_v1.svg';

import { fetchAudioAds } from 'src/actions/old/ads';
import { AppState } from 'src/config/appState';
import {
    getIsAuthenticatedUserAdmin,
    getShowCreditCardWarning,
    getUserLoginStatus,
} from 'src/modules/Auth/selectors/authSelectors';
import { User } from 'src/modules/Profile/models/profile';
import { getUser } from 'src/modules/Profile/selectors/profileSelectors';
import { Button } from 'src/shared/components/Button';
import { color, media } from 'src/styles/variables';

import { headerHeight } from '../models/layoutData';
import { Menu } from './Menu';

export const HeaderWrapper = styled.div({
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif', // to be added to the whole app, only on new pages for now
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 100,
    backgroundColor: color.blackPearl,
    borderBottom: `1px solid ${color.trout}`,
});

export const HeaderContent = styled.div({
    position: 'relative',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    maxWidth: media.contentWidth,
    height: headerHeight,
    padding: '0 2rem',
    margin: '0 auto',
    [media.md]: {
        padding: '0 4rem',
    },
    [media.xl]: {
        padding: '0 2rem',
    },
});

export const LogoWrapper = styled(NavLink)({
    display: 'block',
    zIndex: 2,
});

export const Logo = styled.img({
    cursor: 'pointer',
    height: '1.5rem',
});

interface StateProps {
    user: User;
    isAuthenticated: boolean;
    isAdmin: boolean;
    showCreditCardWarning: boolean;
}

interface ActionsProps {
    fetchAudioAds: typeof fetchAudioAds;
    setCreditCardWarning: typeof setCreditCardWarning;
}

type Props = StateProps & ActionsProps & RouteComponentProps;

interface State {
    isPageScrolled: boolean;
    isModalOpen: boolean;
    cardChecked: boolean;
}

class HeaderContainer extends React.Component<Props, State> {
    public state: State = {
        isPageScrolled: false,
        isModalOpen: false,
        cardChecked: false,
    };

    public componentDidMount(): void {
        this.props.fetchAudioAds();
        window.addEventListener('scroll', this.handlePageScroll);
    }

    private handlePageScroll = () => this.setState({ isPageScrolled: window.scrollY > 0 });

    public toggleModal = () =>
        this.setState(state => ({
            isModalOpen: !state.isModalOpen,
        }));

    public handleVisitAccount = () => {
        this.props.history.push('/account/personal');
        this.toggleModal();
    };

    private checkUserCreditCard = () => {
        if (this.state.cardChecked) {
            return;
        }

        const { user, showCreditCardWarning } = this.props;

        if (user.cc_declined_at && showCreditCardWarning) {
            this.setState({ cardChecked: true });
            this.props.setCreditCardWarning(false);
            this.toggleModal();
        }
    };

    public render(): JSX.Element {
        this.checkUserCreditCard();

        return (
            <HeaderWrapper>
                <HeaderContent>
                    <LogoWrapper to={'/'}>
                        <Logo src={logo} alt="Messy.fm" />
                    </LogoWrapper>
                    <Menu isAuthenticated={this.props.isAuthenticated} isAdmin={this.props.isAdmin} />
                    {/* This modal is some legacy, didn't ever see it, don't know if it's important so not touching it*/}
                    <ReactModal
                        isOpen={this.state.isModalOpen}
                        style={modalStyles}
                        contentLabel="Renew Credit Card Details"
                    >
                        <button onClick={this.toggleModal} className={css(commonModalStyles.close)}>
                            <img src={closeSrc} alt="Close Modal" />
                        </button>
                        <span className={css(commonModalStyles.title)}>Credit Card: Attention Required</span>
                        <p>
                            <span>It seems your credit card was declined</span>
                            <span>as we tried to process payment on it.</span>
                            <span> Follow the link below to update your card details.</span>
                        </p>
                        <Button onClick={this.handleVisitAccount} type="primary">
                            My Account
                        </Button>
                    </ReactModal>
                </HeaderContent>
            </HeaderWrapper>
        );
    }
}

const mapStateToProps = (state: AppState) => ({
    user: getUser(state),
    isAuthenticated: getUserLoginStatus(state),
    isAdmin: getIsAuthenticatedUserAdmin(state),
    showCreditCardWarning: getShowCreditCardWarning(state),
});

export const Header = withRouter(
    connect(
        mapStateToProps,
        {
            fetchAudioAds,
            setCreditCardWarning,
        },
    )(HeaderContainer),
);
