import React from 'react'

import Link from 'src/shared/components/old/interactive/Link'
import { css } from 'src/styles/old'
import formatTime from 'src/shared/helpers/formatTime'

import trashSrc from './static/svg/trash.svg'
import styles from './styles'

function formatDate(ts) {
    const date = new Date(ts)

    const month = (date.getMonth() + 1).toString()
    const day = date.getDate()
    const year = date
        .getFullYear()
        .toString()
        .slice(2, 4)

    return `${month.length === 2 ? month : `0${month}`}/${day}/${year}`
}

export class SessionsTable extends React.PureComponent {
    componentDidMount() {
        this.props.fetchSessions()
    }

    render() {
        const { sessions, openSession, deleteSession } = this.props
        return (
            <div className={css(styles.table)}>
                <div className={css(styles.header)}>
                    <div className={css(styles.flex1)}>Date Modified</div>
                    <div className={css(styles.flex3)}>Session Name</div>
                    <div className={css(styles.flex1)}>Total Time</div>
                    <div className={css(styles.flex1)}>Recordings</div>
                </div>
                <div className={css(styles.body)}>
                    {sessions.length === 0 ? (
                        <span className={css(styles.info, styles.infoPadding)}>
                            Your Recording Sessions will appear here.
                        </span>
                    ) : (
                        sessions.map(({ createdAt, updatedAt, totalDuration, name, id }) => (
                            <div className={css(styles.sessionRow, styles.rowFont)} key={id}>
                                <div className={css(styles.flex1)}>{formatDate(updatedAt || createdAt)}</div>
                                <Link
                                    alternate
                                    to={`/create/record/${id}`}
                                    onClick={() => openSession(id)}
                                    style={[styles.flex3, styles.alignStart, styles.rowFont]}
                                >
                                    {name || 'Untitled Session'}
                                </Link>
                                <div className={css(styles.flex1)}>{formatTime(totalDuration / 1000)}</div>
                                <div className={css(styles.flex1, styles.trashDiv)}>
                                    Recordings
                                    <button onClick={() => deleteSession(id)} className={css(styles.trash)}>
                                        <img src={trashSrc} alt={`Delete ${name}`} />
                                    </button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        )
    }
}
