import React from 'react'
import { Field } from 'redux-form'

const FieldCompHOC = (Input, withProps = {}) => props => <Field {...props} component={Input} {...withProps} />

export default FieldCompHOC
