import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import HashLinkSwitch from 'src/shared/components/old/common/HashLinkSwitch';
import { Orders } from 'src/modules/old/Orders/containers';
import { css } from 'src/styles/old';

import { Billing } from '../Billing';
import { Personal } from './Personal';
import { Password } from './Password';
import styles from './styles';

const links = [
    { text: 'Personal Info', path: '/account/personal' },
    { text: 'Password', path: '/account/password' },
    { text: 'Orders', path: '/account/orders' },
    { text: 'Listener Support', path: '/account/listener-support' },
];

const AccountPage = () => (
    <div className={css(styles.pageWrapper, styles.accountWrapper)} css={{ flex: 1 }}>
        <h2 css={{ fontSize: '36px', marginTop: '50px' }}> My Account </h2>
        <HashLinkSwitch links={links} />
        <Route path="/account/personal" component={Personal} />
        <Route path="/account/password" component={Password} />
        <Route path="/account/orders" component={Orders} />
        <Route path="/account/listener-support" component={Billing} />
    </div>
);

export default withRouter(AccountPage);
