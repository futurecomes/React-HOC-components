import React from 'react'
import { connect } from 'react-redux'

import { fetchCoachingLessons, editCoachingLesson } from '../actions'

const CoachingContainer = Component =>
    class CoachingContainer extends React.Component {
        componentDidMount() {
            this.props.fetchCoachingLessons()
        }

        render() {
            return <Component {...this.props} />
        }
    }

const mapStateToProps = state => ({
    coaching: state.admin.coaching,
})

export default component =>
    connect(
        mapStateToProps,
        { fetchCoachingLessons, editCoachingLesson },
    )(CoachingContainer(component))
