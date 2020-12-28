import styled from 'react-emotion';

import { color, font, media } from 'src/styles/variables';

export const HeaderWrapper = styled.div({
    width: '100%',
    maxWidth: '1250px',
    padding: '2rem 2rem 0 2rem',
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    [media.sm]: {
        flexWrap: 'nowrap',
    },
});
export const Title = styled.h1({
    margin: 0,
    fontSize: font.size.large,
});
export const ButtonWrapper = styled.div({
    width: '100%',
    marginTop: '0.5rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    [media.sm]: {
        width: '400px',
        flexDirection: 'row',
    },
});
const Button = {
    width: '180px',
    height: '36px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3C82E7',
    borderRadius: '5px',
    color: color.white,
    cursor: 'pointer',
    [media.sm]: {
        margin: '0',
    },
};
export const BlueButton = styled.button({
    ...Button,
    marginBottom: '20px',
});
export const PinkButton = styled.button({
    ...Button,
    backgroundColor: '#D4A2F3',
});
