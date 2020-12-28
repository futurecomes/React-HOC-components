/* eslint-disable import/no-named-as-default */
import React from 'react'
import Spinner from 'react-svg-spinner'
import Tooltip from 'react-tooltip'

import Accordion from 'src/shared/components/old/common/Accordion'
import arrowSrc from 'src/shared/components/old/static/svg/down-arrow.svg'
import { IconFont } from 'src/shared/components/old/IconFont'
import container from 'src/containers/editor/RecordingsList'
import { css } from 'src/styles/old'
import { formatDate } from 'src/shared/helpers/time'

// import tempAccordion from './components/tempAccordion'
import FreeMusicListItem from './FreeMusicListItem'
import RecordingListItem from './RecordingListItem'
import folderGreySrc from './static/svg/folder-grey.svg'
import folderPurpleSrc from './static/svg/folder-purple.svg'
import styles from './styles'
import Upload from './Upload'

class RecordingsList extends React.Component {
    buyMusicLibrary = e => {
        e.stopPropagation()
        this.props.addMusicLibraryToBasket()
    }

    render() {
        const { sessions, freeMusic, token, isLoading } = this.props
        return !isLoading ? (
            <div className={css(styles.recordingsContainer)}>
                <div className={css(styles.listHeader, styles.row)}>
                    <div className={css(styles.column)}>
                        <span className={css(styles.blackText)}>My Recordings &amp; Audio</span>
                        <span className={css(styles.greyText)}>Drag and drop to the timeline</span>
                    </div>
                    <Upload />
                </div>

                <div className={css(styles.listWrapper)}>
                    <Accordion
                        list={sessions}
                        className={css(styles.list)}
                        groupClassName={css(styles.accordionGroup)}
                        fetch={this.props.fetchSessions}
                    >
                        {({
                              props: {name, createdAt, recordings},
                              isOpen,
                              toggleOpen,
                              sessionNameEditOpen,
                              sessionNameEditClose,
                              isSessionEdited,
                          }) => ({
                            header: () => (
                                <div
                                    className={css(styles.accordionItem)}
                                    onClick={toggleOpen}
                                    onDoubleClick={sessionNameEditOpen}
                                >
                                    <img
                                        className={css(styles.arrow, isOpen && styles.isOpen)}
                                        src={arrowSrc}
                                        alt={`Expand ${name}`}
                                    />
                                    <img
                                        className={css(styles.spaceAround)}
                                        src={folderGreySrc}
                                        alt={`Expand ${name}`}
                                    />
                                    {isSessionEdited ? (
                                        <input autoFocus onBlur={sessionNameEditClose(token)}/>
                                    ) : (
                                        <span className={css(styles.blackText)}>
                                        {`${name || 'Untitled Session'} - ${formatDate(createdAt)}`}
                                    </span>
                                    )}
                                </div>
                            ),
                            body: () => (
                                <div className={css(styles.list, styles.column)}>
                                    {recordings.map(r => (
                                        <RecordingListItem
                                            {...r}
                                            token={token}
                                            fetch={this.props.fetchRecordings}
                                            key={r.id}
                                        />
                                    ))}
                                </div>
                            ),
                        })}
                    </Accordion>
                    <Accordion
                        list={freeMusic}
                        className={css(styles.list)}
                        groupClassName={css(styles.accordionGroup)}
                    >
                        {({props: {name, recordings}, isOpen, toggleOpen}) => ({
                            header: () => (
                                <div className={css(styles.accordionItem)} onClick={toggleOpen}>
                                    <img
                                        className={css(styles.arrow, isOpen && styles.isOpen)}
                                        src={arrowSrc}
                                        alt={`Expand ${name}`}
                                    />
                                    <img
                                        className={css(styles.spaceAround)}
                                        src={folderPurpleSrc}
                                        alt={`Expand ${name}`}
                                    />
                                    <div
                                        css={{
                                            flex: 1,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                        }}
                                    >
                                    <span className={css(styles.blackText)}>
                                        {name || 'Untitled Session'}
                                    </span>
                                        {!this.props.musicLibraryTotalAccess && !this.props.musicLibraryInBasket && (
                                            <span
                                                className={css(styles.blackText)}
                                                css={{
                                                    cursor: 'pointer',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                }}
                                                data-for="buy"
                                                data-tip="Become a music VIP and get access to our ENTIRE attribution-free library of exclusive music clips with this one-time fee!"
                                                onClick={this.buyMusicLibrary}
                                            >
                                            $20 <IconFont>shopping_cart</IconFont>
                                        </span>
                                        )}
                                        <Tooltip id="buy"/>
                                    </div>
                                </div>
                            ),
                            body: () => (
                                <div className={css(styles.list, styles.column)}>
                                    {recordings.map(r => (
                                        <FreeMusicListItem {...r} freeMusicId={r.id} key={r.id}/>
                                    ))}
                                </div>
                            ),
                        })}
                    </Accordion>
                </div>
            </div>
        ) : (
            <div
                className={css(styles.recordingsContainer)}
                css={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
            >
                <Spinner size="48px" speed="fast" />
            </div>
        )
    }
}

RecordingsList.defaultProps = {
    freeMusic: [],
}

export default container(RecordingsList)
