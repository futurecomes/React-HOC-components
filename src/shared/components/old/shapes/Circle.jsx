import React from 'react';

export const Circle = ({ r, fill }) => (
    <svg height={r * 2} width={r * 2}>
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'violet' }} />
                <stop offset="100%" style={{ stopColor: 'pink' }} />
            </linearGradient>
        </defs>
        <circle cx={r} cy={r} r={r} fill={fill || "url('#grad1')"} />
    </svg>
);
