import styled from 'react-emotion';

import { color, font, media } from 'src/styles/variables';

export const StyledRow = styled.div({
    display: 'flex',
    flexWrap: 'wrap',
    [media.sm]: {
        flexWrap: 'nowrap',
    },
});
export const Image = styled.img({
    width: '190px',
    height: '190px',
    margin: '0 1.5rem 1rem 0',
});
export const StyledColumn = styled.div({
    paddingTop: '1rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
});
export const ShowTitle = styled.h3({
    marginBottom: '0.3rem',
    fontSize: font.size.medium,
});
export const Author = styled.p({
    fontSize: font.size.base,
});
export const Badge = styled.div({
    borderRadius: '0.25rem',
    backgroundColor: color.linkWater,
    padding: '0.5rem',
    marginBottom: '1rem',
});
export const Description = styled.p({
    margin: '0 2rem 2.5rem 0',
    color: color.darkGray,
});
