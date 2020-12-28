import React, { Component } from 'react'

export default function createAsyncFetch(container) {
    return ComposedComponent => {
        class AsyncFetch extends Component {
            componentDidMount() {
                if (this.props.isRehydrated) {
                    this.props.fetch()
                }
            }

            componentWillReceiveProps({ isRehydrated }) {
                if (isRehydrated && !this.props.isRehydrated) {
                    this.props.fetch()
                }
            }

            render() {
                return <ComposedComponent {...this.props} />
            }
        }

        AsyncFetch.defaultProps = {
            isRehydrated: true,
        }

        return container(AsyncFetch)
    }
}
