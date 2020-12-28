import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import Modal from 'react-modal';
import 'eventsource/lib/eventsource-polyfill';

import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'glamor';
import './styles/old';

import { Router } from './routing/Router';
import { store } from './config/store';
import { fullStory } from './config/fullStory';

fullStory();

Modal.setAppElement('#root');

window.FS = window.FS || { identify: () => {} };

ReactDOM.render(
    <Provider store={store}>
        <Router />
    </Provider>,
    document.getElementById('root'),
);
