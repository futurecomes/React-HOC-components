import request from 'src/api/core'

const getCoachingLessons = token =>
    request
        .auth(token)
        .get('admin/coaching')
        .then(({ data }) => data)

const editCoachingLesson = (token, coaching) =>
    request
        .auth(token)
        .put(`admin/coaching/${coaching.id}`, coaching)
        .then(({ data }) => data)

export const CoachingApi = {
    getCoachingLessons,
    editCoachingLesson,
}
