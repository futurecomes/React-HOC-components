import styled from 'react-emotion';
import { css } from 'glamor';
import { Link } from 'react-router-dom';

import { colors } from 'src/styles/old';
import { bounceAnimation } from 'src/styles/animations';

/* unfortunately I couldn't find a way to override styles from react-datepicker */
css.global('ul.react-datepicker__time-list', { padding: '0 !important' });
css.global('.react-datepicker__input-container > input', { padding: 5 });

export const Title = styled.h1({
    marginTop: 0,
    color: colors.fromGradient,
});

export const ModalWrapper = styled.div({
    width: 500,
    textAlign: 'center',
});

export const Buttons = styled.div({
    display: 'flex',
    justifyContent: 'space-around',
});

export const LoadingCover = styled.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    background: 'grey',
});

export const TimeDisplay = styled.div({
    flex: 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: colors.toGradient,
});

export const TrimTime = styled.span(props => ({
    position: 'absolute',
    [props.position]: -30,
    top: 5,
    fontSize: 12,
    color: 'black',
    pointerEvents: 'none',
}));

export const Shop = styled.div({
    display: 'flex',
    width: 700,
    margin: '0px auto 10px',
    animation: `${bounceAnimation} 0.5s ease`,
});

export const ItemInBasket = styled.div({
    display: 'flex',
    justifyContent: 'space-between',
    width: 150,
    padding: 5,
    margin: 5,
    background: 'white',
    borderRadius: 5,
    animation: `${bounceAnimation} 0.5s ease`,
});

export const OptionLink = styled(Link)({
    padding: 10,
    borderRadius: 15,
    color: 'white',
    background: colors.toGradient,
    textDecoration: 'none',
});
