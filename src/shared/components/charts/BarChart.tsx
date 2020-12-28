import React from 'react';
import styled from 'react-emotion';
import { Bar, BarChart as RechartsBarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { color } from 'src/styles/variables';

const StyledBarChart = styled(RechartsBarChart)({
    width: '100%',
    '.recharts-cartesian-grid line': {
        stroke: color.mystic,
    },
    '.recharts-cartesian-axis-line': {
        stroke: color.mystic,
    },
    '.yAxis .recharts-cartesian-axis-line': {
        display: 'none',
    },
    '.recharts-cartesian-axis-tick': {
        line: {
            display: 'none',
        },
        text: {
            fill: color.baliHai,
        },
    },
});

interface Props {
    data: {};
    height?: number;
    xAxisDataKey: string;
    yAxisDataKey: string;
}

const defaultHeight = 250;

export const BarChart: React.FC<Props> = props => (
    <ResponsiveContainer height={props.height || defaultHeight}>
        <StyledBarChart data={props.data}>
            <CartesianGrid vertical={false} />
            <XAxis dataKey={props.xAxisDataKey} />
            <YAxis />
            <Tooltip />
            <Bar dataKey={props.yAxisDataKey} fill={color.blueViolet} />
        </StyledBarChart>
    </ResponsiveContainer>
);
