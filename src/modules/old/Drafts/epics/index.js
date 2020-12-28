import { of, merge } from 'rxjs'
import { combineEpics, ofType } from 'redux-observable'
import { mergeMap, tap, ignoreElements, pluck, switchMap, delay, takeUntil, filter } from 'rxjs/operators'

import * as actions from '../actions/actions'
import { requestDrafts, deleteDraft } from 'src/api/editor'
import { history } from 'src/shared/helpers/history'

export function draftsEpicFactory() {
    const fetchDraftsEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.FETCH_DRAFTS),
            filter(() => !store.getState().editorMeta.drafts.fetched),
            mergeMap(() => {
                const { token, user } = store.getState().auth
                return requestDrafts(token, user.id)
                    .then(actions.fetchDraftsFulfilled)
                    .catch(actions.fetchDraftsRejected)
            }),
        )

    const draftRehydrateEpic = action$ =>
        action$.pipe(
            ofType(actions.DRAFT_REHYDRATE),
            tap(() => history.push('/create/editor')),
            ignoreElements(),
        )

    const deleteDraftEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.DELETE_DRAFT),
            pluck('payload'),
            mergeMap(draft =>
                deleteDraft(store.getState().auth.user.token, draft.id)
                    .then(() => actions.deleteDraftFulfilled(draft.id))
                    .catch(actions.deleteDraftRejected),
            ),
        )

    const setLoadingEpic = (action$, store) =>
        action$.pipe(
            ofType(actions.FETCH_DRAFTS),
            filter(() => !store.getState().editorMeta.drafts.fetched),
            switchMap(() =>
                of(actions.startLoadingFetchDrafts()).pipe(
                    delay(300),
                    takeUntil(
                        merge(
                            action$.pipe(ofType(actions.FETCH_DRAFTS_FULFILLED)),
                            action$.pipe(ofType(actions.FETCH_DRAFTS_REJECTED)),
                        ),
                    ),
                ),
            ),
        )

    return combineEpics(fetchDraftsEpic, draftRehydrateEpic, deleteDraftEpic, setLoadingEpic)
}
