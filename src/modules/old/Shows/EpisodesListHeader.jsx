import React from 'react'

import * as S from './styled'

export const EpisodesListHeader = ({ isPaidUser }) => (
    <S.Row>
        <S.Cell align="left">#</S.Cell>
        <S.Cell flex="3">Title</S.Cell>
        <S.Cell flex="2" hideOnMobile>
            Duration
        </S.Cell>
        {isPaidUser && <S.Cell flex="3">Plays</S.Cell>}
        <S.Cell flex="5" hideOnMobile>
            Released
        </S.Cell>
        <S.Cell flex="4" align="right" manage>
            Manage
        </S.Cell>
    </S.Row>
)
