import React from 'react'
import Slider from 'react-slick'

import './styled'

const defaultSettings = {
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                infinite: false,
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
    ],
}

export const Carousel = ({ settings, children, ...rest }) => (
    <Slider {...defaultSettings} {...rest} ref={rest.innerRef || null}>
        {children}
    </Slider>
)
