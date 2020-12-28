import { Row } from 'antd';
import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { UnprotectModal } from 'src/modules/old/Shows/UnprotectModal';
import { ButtonsList } from './ButtonsList';
import { EpisodeList } from './EpisodeList';
import { PaymentView } from './PaymentView';
import { ShowDetails } from './ShowDetails';
import { Actions, initialState, showReducer } from './showReducer';
import { ActionsShowProps } from '../models/actionsShowProps';
import { ShowModel } from '../models';
import { ShowWrapper, ScrollableCol } from './style';

interface Props extends ActionsShowProps, RouteComponentProps {
    show: ShowModel;
    userToken: string;
    isPaidUser: boolean;
}

export const Show: React.FC<Props> = props => {
    const [state, dispatch] = React.useReducer(showReducer, initialState);

    const openPromoteForm = () => dispatch({ type: Actions.OPEN_PROMOTE_FORM });
    const openProtectForm = () => {
        props.show.protected
            ? openUnprotectModal()
            : props.show.protectionPaid
            ? props.submitProtectPodcast(props.userToken, props.show.id)
            : dispatch({ type: Actions.OPEN_PROTECT_FORM });
    };
    const openUnprotectModal = () => props.openUnprotectPodcastModal(props.show.id);

    const newEpisode = () => {
        const { editorInitialize, selectShow, setEpisodeDescription, setEpisodeName, history, show } = props;

        editorInitialize();
        setEpisodeDescription('');
        setEpisodeName('');
        selectShow(show.id);
        history.push('/create/editor');
    };

    return (
        <ShowWrapper>
            <Row>
                <ShowDetails show={props.show} />
                <ScrollableCol md={24} lg={13}>
                    <EpisodeList show={props.show} />
                </ScrollableCol>
            </Row>

            <ButtonsList
                show={props.show}
                isPaidUser={props.isPaidUser}
                openProtectForm={openProtectForm}
                openPromoteForm={openPromoteForm}
                newEpisode={newEpisode}
            />

            {state.payment && (
                <PaymentView
                    isPromotePaymentFormVisible={state.isPromotePaymentFormVisible}
                    isProtectShowPaymentFormVisible={state.isProtectShowPaymentFormVisible}
                    editShow={props.editShow}
                    userToken={props.userToken}
                    showId={props.show.id}
                    submitProtectPodcast={props.submitProtectPodcast}
                />
            )}

            <UnprotectModal
                modalShowID={props.unprotectPodcastModal.unprotectshowId}
                open={props.unprotectPodcastModal.isUnprotectPodcastModalOpen}
                onClose={props.closeUnprotectPodcastModal}
                onSubmit={props.submitUnprotectPodcast}
            />
        </ShowWrapper>
    );
};
