import React from 'react';
import { withRouter, Route } from 'react-router-dom';

import HashLinkSwitch from 'src/shared/components/old/common/HashLinkSwitch';
import { RequireUpgrade } from 'src/containers/hoc/requireUpgrade';
import { Loading } from 'src/shared/components/old/Loading';
import { css } from 'src/styles/old';

import styles from './styles';

const edRE = /editor/;

const links = [
    { text: 'Recording Studio', path: '/create/record' },
    { text: 'Editor & Publisher', path: '/create/editor' },
    { text: 'Drafts', path: '/create/drafts' },
];

const Recording = React.lazy(() => import('src/modules/old/Recording'));
const Editor = React.lazy(() => import('src/modules/old/Editor'));
const Drafts = React.lazy(() => import('src/modules/old/Drafts'));

const Create = ({ location: { pathname } }) => (
    <div className={css(styles.container)}>
        <div className={css(styles.linksContainer)}>
            <HashLinkSwitch links={links} />
        </div>
        <RequireUpgrade className={css(styles.body, edRE.test(pathname) && styles.fullWidth)}>
            <React.Suspense fallback={<Loading />}>
                <Route path="/create/record/:id?" component={Recording} />
                <Route path="/create/editor" component={Editor} />
                <Route path="/create/drafts" component={Drafts} />
            </React.Suspense>
        </RequireUpgrade>
    </div>
);

export default withRouter(Create);
