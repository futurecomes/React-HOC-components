import { init } from '@rematch/core';
import { createEpicMiddleware } from 'redux-observable';
import { autoRehydrate, persistStore } from 'redux-persist';
import timerMiddleware from 'redux-timer-middleware';

import audio from '../middlewares/audio';
import editor from '../middlewares/editor';
import fileUpload from '../middlewares/fileUpload';
import thunk from '../middlewares/thunk';
import { reducers } from './reducers';
import { rematchModels, RematchModels } from './rematchModels';
import { rootEpic } from './rootEpic';

const middlewares = [thunk, fileUpload, audio, editor, timerMiddleware, createEpicMiddleware(rootEpic)];

export const store = init({
    models: rematchModels,
    redux: {
        reducers,
        middlewares,
        enhancers: [autoRehydrate() as any],
    },
});

persistStore(store, {
    whitelist: ['auth', 'recording'],
});

export type Store = typeof store;
export type Dispatch = typeof store.dispatch;
export type RootState = RematchModels;
