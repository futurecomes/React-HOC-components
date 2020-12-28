import { notification } from 'antd';

import * as pricingTexts from '../pricingTexts.json';

export const notLoggedInNotification = () =>
    notification['info']({
        message: pricingTexts.common.notifications.notLoggedInNotification.message,
        description: pricingTexts.common.notifications.notLoggedInNotification.description,
    });

export const onSuccessfullTransactionNotification = () =>
    notification['success']({
        message: pricingTexts.common.notifications.onSuccessfullTransaction.message,
        description: pricingTexts.common.notifications.onSuccessfullTransaction.description,
        duration: 10,
    });
