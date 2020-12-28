import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import Link from 'src/shared/components/old/interactive/Link'
import { css } from 'src/styles/old'

import styles from './styles'

function hasMatch(pathname, links) {
    return links.some(({ path }) => new RegExp(path).test(pathname))
}

class HashLinkSwitch extends Component {
    componentWillMount() {
        if (!hasMatch(this.props.location.pathname, this.props.links) && this.props.links.length > 0) {
            this.props.history.replace({
                ...this.props.location,
                pathname: this.props.links[0].path,
            })
        }
    }

    render() {
        const { links, location } = this.props

        return (
            <div className={css(styles.container)}>
                {links.map(({ text, path }) => (
                    <Link
                        to={path}
                        style={[styles.link, new RegExp(path).test(location.pathname) && styles.activeLink]}
                        key={path}
                    >
                        {text}
                    </Link>
                ))}
            </div>
        )
    }
}

export default withRouter(HashLinkSwitch)
