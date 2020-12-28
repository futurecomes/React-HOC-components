import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { reduxForm } from 'redux-form'

function mapStateToProps() {
    return {}
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({}, dispatch)
}

function createContainer(Component) {
    const FormContainer = reduxForm({
        form: 'SearchBar',
    })(Component)

    return connect(mapStateToProps, mapDispatchToProps)(FormContainer)
}

export default createContainer
