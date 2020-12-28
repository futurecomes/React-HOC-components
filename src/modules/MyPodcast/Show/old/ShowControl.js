import React from 'react'

import { IconFont } from 'src/shared/components/old/IconFont'

import * as S from './styled'

export function ShowControl(props) {
    return (
        <S.IconWrapper onClick={props.onClick}>
            <IconFont fontSize={14} color="white" width={24}>
                {props.icon}
            </IconFont>
            <S.IconAction>{props.text}</S.IconAction>
        </S.IconWrapper>
    )
}
