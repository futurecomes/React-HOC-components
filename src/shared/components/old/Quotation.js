import React from 'react'

const colors = {
    1: '#059fa2',
    2: '#008694',
    3: '#006d86',
}

export function Quotation(props) {
    return (
        <svg
            id="Layer_1"
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 272.05 194.32"
            width={30}
            height={30}
            css={{
                fill: colors[props.color] || '#b0b0b0',
                margin: '0 auto',
            }}
        >
            <polygon
                className="cls-1"
                points="0 116.59 58.3 116.59 19.43 194.32 77.73 194.32 116.59 116.59 116.59 0 0 0 0 116.59"
            />
            <polygon
                className="cls-1"
                points="155.46 0 155.46 116.59 213.75 116.59 174.89 194.32 233.19 194.32 272.05 116.59 272.05 0 155.46 0"
            />
        </svg>
    )
}
