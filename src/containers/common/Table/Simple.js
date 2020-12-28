import React, { Component } from 'react'

function createContainer(ComposedComponent) {
    class Container extends Component {
        render() {
            return <ComposedComponent {...this.props} />
        }
    }

    return Container
}

export default createContainer
