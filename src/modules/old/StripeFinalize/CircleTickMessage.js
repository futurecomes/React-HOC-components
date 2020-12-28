import React from 'react'

import * as S from './styled'

const Tick = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width={30} height={30} viewBox="0 0 13 9">
        <path
            d="M1 4.794L4.456 8 12 1"
            strokeWidth="2"
            stroke="#13B57D"
            fill="none"
            fillRule="evenodd"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
)

export const CircleTickMessage = ({ message }) => (
    <S.CircleTickMessageWrapper>
        <S.Circle>
            <Tick />
        </S.Circle>
        <h2 css={{ color: '#1f5073' }}>{message}</h2>
    </S.CircleTickMessageWrapper>
)
