export const FETCH_COACHING_LESSONS = 'FETCH_COACHING_LESSONS'
export const fetchCoachingLessons = () => ({
    type: FETCH_COACHING_LESSONS,
})

export const FETCH_COACHING_LESSONS_FULFILLED = 'FETCH_COACHING_LESSONS_FULFILLED'
export const fetchCoachingLessonsFulfilled = coachingLessons => ({
    type: FETCH_COACHING_LESSONS_FULFILLED,
    payload: coachingLessons,
})

export const FETCH_COACHING_LESSONS_REJECTED = 'FETCH_COACHING_LESSONS_REJECTED'
export const fetchCoachingLessonsRejected = error => ({
    type: FETCH_COACHING_LESSONS_REJECTED,
    error,
})

export const EDIT_COACHING_LESSON = 'EDIT_COACHING_LESSON'
export const editCoachingLesson = coaching => ({
    type: EDIT_COACHING_LESSON,
    payload: coaching,
})

export const EDIT_COACHING_LESSON_FULFILLED = 'EDIT_COACHING_LESSON_FULFILLED'
export const editCoachingLessonFulfilled = coaching => ({
    type: EDIT_COACHING_LESSON_FULFILLED,
    payload: coaching,
})

export const EDIT_COACHING_LESSON_REJECTED = 'EDIT_COACHING_LESSON_REJECTED'
export const editCoachingLessonRejected = error => ({
    type: EDIT_COACHING_LESSON_REJECTED,
    error,
})
