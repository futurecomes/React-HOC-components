import React from 'react'
import { reduxForm } from 'redux-form'

export default Component => props => {
    const FormComponent = reduxForm({
        /*
    ** Sets a random form name to allow multiple components on a page.
    ** This form does not need to be referenced later.
    */
        form: `${Math.floor(Math.random() * 10000)}`,
    })(Component)

    return <FormComponent {...props} />
}
