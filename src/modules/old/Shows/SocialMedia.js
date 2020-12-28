/* eslint-disable no-restricted-globals */

import React from 'react'
import { FacebookShareButton, TwitterShareButton } from 'react-share'

import * as S from './styled'

export function SocialMedia(props) {
    return (
        <S.ShareButtons>
            {/* picture={show.imageUrl} is deprecated in <FacebookShareButton/> */}
            <FacebookShareButton
                url={`${location.protocol}//${location.host}/show/${props.show.id}`}
                quote={props.show.title}
            />
            <TwitterShareButton
                url={`${location.protocol}//${location.host}/show/${props.show.id}`}
                title={`${props.show.title}: ${location.protocol}//${location.host}/show/${props.show.id}`}
                style={{
                    marginTop: 10,
                }}
            />
        </S.ShareButtons>
    )
}
