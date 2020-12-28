import { combineEpics, ofType } from 'redux-observable'
import { mergeMap } from 'rxjs/operators'

import BillingApi from 'src/api/billing'

import * as actions from '../actions'

export function musicLibraryEpicFactory() {
    const buyMusicLibraryItemsEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.BUY_MUSIC_ITEMS),
            mergeMap(action =>
                BillingApi.buyMusicLibraryItems(
                    store.getState().auth.token,
                    action.payload,
                    store.getState().billing.freeMusicBasket.data,
                )
                    .then(res => actions.buyMusicItemsFulfiled(res.data))
                    .catch(res => actions.buyMusiItemsRejected(res.reason)),
            ),
        )

    const buyMusicLibraryTotalAccessEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.BUY_MUSIC_LIBRARY_TOTAL_ACCESS),
            mergeMap(action =>
                BillingApi.buyMusicLibraryTotalAccess(store.getState().auth.token, action.payload)
                    .then(res => actions.buyMusicLibraryTotalAccessFulfilled(res.data))
                    .catch(res => actions.buyMusicLibraryTotalAccessRejected(res.reason)),
            ),
        )

    return combineEpics(buyMusicLibraryItemsEpic, buyMusicLibraryTotalAccessEpic)
}
