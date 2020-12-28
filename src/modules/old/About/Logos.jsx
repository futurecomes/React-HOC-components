import React from 'react'
import styled from 'react-emotion'

import { tabletMax } from 'src/styles/old'

import LAT from './static/LAT.png'
import Entreprenur from './static/Entreprenur.jpg'
import Forbes from './static/Forbes.png'
import Mentorbox from './static/Mentorbox.png'
import PodNews from './static/PodNews.jpg'

const StyledLogos = styled.div({
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',

    [tabletMax]: {
        flexDirection: 'column',
    },
})

const Image = styled.img({
    [tabletMax]: {
        margin: '10px 0',
    },
})

export const Logos = () => (
    <StyledLogos>
        <Image height={22} src={Entreprenur} alt="logo" />
        <Image height={20} src={PodNews} alt="logo" />
        <Image height={15} src={Mentorbox} alt="logo" />
        <Image height={17} src={Forbes} alt="logo" />
        <Image height={22} src={LAT} alt="logo" />
    </StyledLogos>
)
