import * as React from 'react';
import { Elements } from 'react-stripe-elements';

import { PromoteShowFormContainer } from '../old/PromoteShowForm';
import { ProtectShowFormContainer } from '../old/ProtectShowForm';
import * as S from '../old/styled';
import { editShow } from 'src/actions/old/shows';
import { submitProtectPodcast } from 'src/modules/old/Shows/thunks/api';

interface PaymentViewActions {
    editShow: typeof editShow;
    submitProtectPodcast: typeof submitProtectPodcast;
}

interface Props extends PaymentViewActions {
    isPromotePaymentFormVisible: boolean;
    isProtectShowPaymentFormVisible: boolean;
    userToken: string;
    showId: number;
}

export const PaymentView: React.FC<Props> = ({
    isPromotePaymentFormVisible,
    isProtectShowPaymentFormVisible,
    editShow,
    userToken,
    showId,
    submitProtectPodcast,
}) => (
    <Elements>
        <S.PaymentWrapper>
            {isPromotePaymentFormVisible && (
                <PromoteShowFormContainer editShow={editShow} userToken={userToken} showId={showId} />
            )}
            {isProtectShowPaymentFormVisible && (
                <ProtectShowFormContainer
                    editShow={editShow}
                    userToken={userToken}
                    showId={showId}
                    submitForm={submitProtectPodcast}
                />
            )}
        </S.PaymentWrapper>
    </Elements>
);
