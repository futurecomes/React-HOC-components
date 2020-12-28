import { Row } from 'antd';
import React from 'react';
import { Elements } from 'react-stripe-elements';

import { Show } from 'src/modules/Podcasts/models/podcasts';
import { ExternalServices } from './ExternalServices';

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

    public render(): JSX.Element {
        const { show, token, isUserLoggedIn, showPlayOnMessy } = this.props;

        const areExternalLinksPresent = show.googleUrl || show.itunesUrl || show.spotifyUrl;
        const platformsItems = areExternalLinksPresent
            ? [
                  { title: '', icon: 'googlePodcasts', link: show.googleUrl },
                  { title: '', icon: 'applePodcasts', link: show.itunesUrl },
                  { title: '', icon: 'spotify', link: show.spotifyUrl },
              ]
            : [];

        return (
            <>
                <Row>
                    <ExternalServices showId={show.id} links={platformsItems} showPlayOnMessy={showPlayOnMessy} />
                </Row>
                {this.state.isPaymentFormVisible && (
                    <Elements>
                        <SupportShowBox token={token} showId={show.id} isUserLoggedIn={isUserLoggedIn} />
                    </Elements>
                )}
            </>
        );
    }
}
