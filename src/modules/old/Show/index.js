import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Elements } from 'react-stripe-elements';

import styles from 'src/shared/components/old/Podcast/styles';
import Loading from 'src/shared/components/old/activity/LinesIndicator';
import Episode from 'src/shared/components/old/Podcast/Episode';
import { css } from 'src/styles/old';
import * as S from './styled';

import showContainer from './containers/showContainer';
import { NotFound } from './NotFound';
import { SupportShowForm } from './Payment';
import { ShowBox } from './ShowBox';
import { RequireShowAccessForm } from './RequireShowAccessForm';

export class Show extends Component {
    state = {
        isPaymentFormVisible: false,
    };

    togglePaymentForm = () => this.setState(state => ({ isPaymentFormVisible: !state.isPaymentFormVisible }));

    render() {
        const {
            isFetching,
            show,
            episodes,
            onSubscribe,
            isAuth,
            isLoading,
            isPersisted,
        } = this.props;

        for (let i=0; i<episodes.length; i++) {
            episodes[i].no = episodes.length-i;
        }

        /* eslint-disable no-nested-ternary */
        const episodeListWrapperClassName = css(
            styles.episodeListWrapper,
            styles.episodesVisible,
        );
        /* eslint-enable */
        if (isFetching || isLoading || !isPersisted) {
            return <Loading size={75} />;
        }

        if (!show.id) {
            return <NotFound />;
        }

        if (show.displayPreview) {
            return (
                <div className={css(styles.showContainer, styles.topMargin)}>
                    <ShowBox
                        show={show}
                        onSubscribe={onSubscribe}
                        isAuth={isAuth}
                        preview
                    />
                    <RequireShowAccessForm
                        show={show}
                        fetchShow={this.props.fetch}
                        getShowById={this.props.getShowById}
                    />
                </div>
            );
        }

        return (
            <div className={css(styles.showContainer)}>
                <div className={css(styles.showContainerHeader)}>
                    <div className={css(styles.headerButtonWrapper)}>
                        {show.hasExpressAccount && (
                            <S.PaymentButton onClick={this.togglePaymentForm}>
                                Support
                            </S.PaymentButton>
                        )}

                        {isAuth && (
                            <S.SubscribeButton onClick={() => onSubscribe(show.id)}>
                                {`${show.isSubscribed ? 'Unsubscribe' : 'Subscribe'}`}
                            </S.SubscribeButton>
                        )}
                    </div>

                    {this.state.isPaymentFormVisible && (
                        <Elements>
                            <SupportShowForm
                                isAuth={isAuth}
                                token={this.props.token}
                                showId={this.props.show.id}
                                fetchCurrentPlan={this.props.fetchCurrentPlan}
                            />
                        </Elements>
                    )}
                </div>

                <div className={css(styles.showContainerBody)}>

                    <ShowBox
                        show={show}
                        onSubscribe={onSubscribe}
                        isAuth={isAuth}
                    />

                    {!isFetching && episodes.length === 0 && (
                        <div className={css(styles.infoText)}>No episodes created</div>
                    )}


                    <div className={episodeListWrapperClassName}>
                        {episodes.map(episode => (
                            <Episode
                                {...episode}
                                creatorExpanded={[{name: show.creatorName, customUrl: show.customUrl}]}
                                showExpanded={[show]}
                                key={episode.id}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}

Show.defaultProps = {
    show: {
        title: '',
        description: '',
        creatorName: '',
        imageUrl: '',
        customUrl: null,
        explicit: false,
        rssUrl: '',
        itunesUrl: '',
        spotifyUrl: '',
        googleUrl: '',
        patreonUrl: '',
        isSubscribed: false,
        unplayedCount: 0,
    },
    episodes: [],
    showUnplayedCount: false,
    canToggleEpisodes: false,
};

export default withRouter(showContainer(Show));
