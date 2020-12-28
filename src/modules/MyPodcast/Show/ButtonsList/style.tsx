import styled from 'react-emotion';

import { color, font, media } from 'src/styles/variables';

interface ButtonProps {
    image: string;
}

export const ButtonsWrapper = styled.div({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTop: '1px solid lightgray',
});
export const Button = styled.button<ButtonProps>(({ image }) => ({
    width: '25px',
    height: '25px',
    margin: '0.5rem 1rem 0.5rem 0',
    padding: '0.5rem 1rem 0.5rem 1rem',
    transition: 'background .2s',
    cursor: 'pointer',
    backgroundImage: `url(${image})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'contain',
    backgroundPosition: 'center',
    backgroundColor: color.white,
    fontSize: 0,
    [media.sm]: {
        width: 'auto',
        height: 'auto',
        backgroundImage: 'none',
        fontSize: font.size.base,
        '&:hover': {
            backgroundColor: 'lightgray',
        },
    },
}));
export const RelativeWrapper = styled.div({
    position: 'relative',
});
export const AddEpisodeButton = styled.button({
    width: '50px',
    height: '50px',
    margin: '1rem 0 1rem 1rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: '50%',
    backgroundColor: '#6F55C1',
    color: color.white,
    cursor: 'pointer',
});
