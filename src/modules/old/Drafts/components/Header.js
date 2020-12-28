import React from 'react'

import * as S from './styled'

export class Header extends React.Component {
    render() {
        return (
            <S.Row>
                <S.Cell>Name</S.Cell>
                <S.Cell>Show</S.Cell>
                <S.Cell>Created at</S.Cell>
                <S.Cell style={{ textAlign: 'center' }}>Actions</S.Cell>
            </S.Row>
        )
    }
}
