import { combineEpics, ofType } from 'redux-observable'
import { mergeMap } from 'rxjs/operators'

import request from 'src/api/core'

import * as actions from '../actions'

export function adminShowsEpicFactory() {
    const editShowEpic = action$ =>
        action$.pipe(
            ofType(actions.ADMIN_EDIT_SHOW),
            mergeMap(action => {
                return request
                    .put(`admin/show/${action.payload.showId}`, { rssUrl: action.payload.rssUrl })
                    .then(() => actions.adminEditShowFulfilled(action.payload))
                    .catch(actions.adminEditShowFailure)
            }),
        )

    return combineEpics(editShowEpic)
}
