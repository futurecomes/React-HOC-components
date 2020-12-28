import { Col } from 'antd';
import styled from 'react-emotion';

import { color, media } from 'src/styles/variables';

export const ShowWrapper = styled.div({
    maxWidth: '1200px',
    width: '95%',
    margin: '2rem',
    padding: '1.5rem 1.5rem 0 1.5rem',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: color.white,
    [media.sm]: {
        padding: '3rem 3rem 0rem 3rem',
    },
});
export const ScrollableCol = styled(Col)({
    height: '220px',
    marginBottom: '2rem',
    overflow: 'auto',
    [media.lg]: {
        height: '500px',
        borderLeft: '1px solid lightgray',
    },
});
