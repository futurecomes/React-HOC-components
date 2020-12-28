import React from 'react'
import moment from 'moment'

import editIcon from 'src/shared/components/old/shared/static/svg/ic_mode_edit.svg'
import deleteIcon from 'src/shared/components/old/shared/static/svg/ic_delete.svg'

import * as S from './styled'

export class Draft extends React.PureComponent {
    onEdit = () => {
        const { draft, draftRehydrate } = this.props
        draftRehydrate(draft)
    }
    render() {
        const { draft } = this.props
        return (
            <S.Row>
                <S.Cell italic={!draft.name}>{draft.name || 'Untitled'}</S.Cell>
                <S.Cell>{draft.showTitle}</S.Cell>
                <S.Cell>{moment(draft.createdAt).format('MM/DD/YY h:mm a')}</S.Cell>
                <S.Cell style={{ textAlign: 'center' }}>
                    <S.Icon
                        onClick={() => this.props.deleteDraft(draft)}
                        src={deleteIcon}
                        alt="Delete draft"
                        title="Delete"
                    />{' '}
                    <S.Icon onClick={this.onEdit} src={editIcon} alt="Edit draft" title="Edit" />
                </S.Cell>
            </S.Row>
        )
    }
}
