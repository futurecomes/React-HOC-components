import React, { Component } from 'react'
import styles from '../styles'
import RecordingListItem from '../RecordingListItem'
import arrowSrc from 'src/shared/components/old/static/svg/down-arrow.svg'
import folderGreySrc from '../static/svg/folder-grey.svg'
import { formatDate } from 'src/shared/helpers/time'

import AnimateHeight from 'react-animate-height'
import { css } from 'glamor'

// class AccordionGroup extends Component {
//     constructor(...args) {
//         super(...args)

//         this.state = {
//             isOpen: false,
//             isEditing: false,
//         }

//         // this.open = this.open.bind(this)
//         // this.close = this.close.bind(this)
//         // this.toggle = this.toggle.bind(this)
//         this.toggleEdit.bind(this)
//         this.toggleOpen.bind(this)
//     }

//     // openEdit() {
//     //     this.setState(state => ({ ...state, isEditing: true }))
//     // }

//     // closeEdit() {
//     //     this.setState(state => ({ ...state, isEditing: false }))
//     // }

//     toggleEdit() {
//         this.setState(state => ({ ...state, isEditing: !this.state.isEditing }))
//     }

//     // open() {
//     //     this.setState(state => ({ ...state, isOpen: true }))
//     // }

//     // close() {
//     //     this.setState(state => ({ ...state, isOpen: false }))
//     // }

//     toggleOpen() {
//         this.setState(state => ({ ...state, isOpen: !this.state.isOpen }))
//     }

//     render() {
//         const { header, body } = this.props.render({
//             props: this.props.group,
//             isOpen: this.state.isOpen,
//             toggleOpen: this.state.toggleOpen,
//             isEditing: this.state.isEditing,
//             toggleEdit: this.toggleEdit,

//             // openGroup: this.open,
//             // closeGroup: this.close,
//             // toggleGroup: this.toggle,
//         })

//         return (
//             <div }>
//                 <button
//                     onClick={this.toggleOpen}
//                     onDoubleClick={this.toggleEdit}
//                     className={this.props.triggerClassName}
//                 >
//                     {header()}
//                 </button>
//                 <AnimateHeight height={this.state.isOpen ? 'auto' : 0}>{body()}</AnimateHeight>
//             </div>
//         )
//     }
// }

// export default AccordionGroup

export default class Accordion extends React.Component {
    isOpen = false
    isEditing = false
    render() {
        return (
            <div>
                <button
                    onClick={this.onClick}
                    onDoubleClick={this.onDoubleClick}
                    className={css(styles.accordionItem)}
                >
                    <div className={css(styles.row)}>
                        <img
                            className={css(styles.arrow, this.isOpen && styles.isOpen)}
                            src={arrowSrc}
                            alt="expand"
                        />
                        <img className={css(styles.spaceAround)} src={folderGreySrc} alt="expand" />
                        {this.isEditing ? (
                            <input autoFocus onBlur={this.toggleEdit} />
                        ) : (
                            <span className={css(styles.blackText)}>
                                {this.props.title}
                                {/* {`${this.props.name || 'Untitled Session'} - ${formatDate(createdAt)}`} */}
                            </span>
                        )}
                    </div>
                </button>
                <AnimateHeight>
                    <div className={css(styles.list, styles.column)}>
                        {/* {this.recordings.map(r => (
                            <RecordingListItem {...r} key={r.id} />
                        ))} */}
                    </div>
                </AnimateHeight>
            </div>
        )
    }
}
