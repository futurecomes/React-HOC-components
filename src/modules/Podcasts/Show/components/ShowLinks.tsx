import { Row } from 'antd';
import React from 'react';
import { Elements } from 'react-stripe-elements';

import donateIcon from 'src/public/img/donate.svg';
import patreonIcon from 'src/public/img/patreon.svg';

import { Show } from 'src/modules/Podcasts/models/podcasts';
import { ExternalServices } from 'src/shared/components/ExternalServices';
import { TileLink } from 'src/shared/components/TileLink';
import { TilesContainer } from 'src/shared/styled/tileLinks';

import { SupportShowBox } from './SupportShowBox';

interface Props {
    show: Show;
    isUserLoggedIn: boolean;
    token?: string;
    showPlayOnMessy?: boolean;
}

interface State {
    isPaymentFormVisible: boolean;
}

export class ShowLinks extends React.Component<Props, State> {
    public state: State = {
        isPaymentFormVisible: false,
    };

    private toggleDonation = () => this.setState(state => ({ isPaymentFormVisible: !state.isPaymentFormVisible }));

    public render(): JSX.Element {
        const { show, token, isUserLoggedIn, showPlayOnMessy } = this.props;

        const showSupport = show.hasExpressAccount || show.patreonUrl;

        const areExternalLinksPresent = show.googleUrl || show.itunesUrl || show.spotifyUrl;
        const platformsItems = areExternalLinksPresent
            ? [
                  { title: 'Google Podcasts', icon: 'googlePodcasts', link: show.googleUrl },
                  { title: 'Apple Podcasts', icon: 'applePodcasts', link: show.itunesUrl },
                  { title: 'Spotify', icon: 'spotify', link: show.spotifyUrl },
              ]
            : [];

        return (
            <>
                <Row>
                    <ExternalServices showId={show.id} links={platformsItems} showPlayOnMessy={showPlayOnMessy} />
                </Row>
                {showSupport && (
                    <Row>
                        <h4>Support this show:</h4>
                        <TilesContainer>
                            {show.hasExpressAccount && (
                                <TileLink icon={donateIcon} title={'Tip Jar'} onClick={this.toggleDonation} />
                            )}
                            {show.patreonUrl && <TileLink title="Patreon" icon={patreonIcon} link={show.patreonUrl} />}
                        </TilesContainer>
                    </Row>
                )}
                {this.state.isPaymentFormVisible && (
                    <Elements>
                        <SupportShowBox token={token} showId={show.id} isUserLoggedIn={isUserLoggedIn} />
                    </Elements>
                )}
            </>
        );
    }
}
