import { combineEpics, ofType } from 'redux-observable'
import { switchMap } from 'rxjs/operators'

import * as actions from '../actions'
import { CoachingApi } from '../api'

const fetchCoachingLessonsEpic = (action$, store) =>
    action$.pipe(
        ofType(actions.FETCH_COACHING_LESSONS),
        switchMap(() =>
            CoachingApi.getCoachingLessons(store.getState().auth.token)
                .then(actions.fetchCoachingLessonsFulfilled)
                .catch(actions.fetchCoachingLessonsRejected),
        ),
    )

const editCoachingEpic = (action$, store) =>
    action$.pipe(
        ofType(actions.EDIT_COACHING_LESSON),
        switchMap(action =>
            CoachingApi.editCoachingLesson(store.getState().auth.token, action.payload)
                .then(actions.editCoachingLessonFulfilled)
                .catch(actions.editCoachingLessonRejected),
        ),
    )

export const coachingEpic = combineEpics(fetchCoachingLessonsEpic, editCoachingEpic)
