import styled from 'react-emotion';
import { css } from 'glamor';

import { colors } from 'src/styles/old';

css.insert(`.circle-picker > span:last-child > div > span > div {
    border: 1px solid lightgrey;
}`);

export const CreateArtWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
});

export const CircleColorPicker = styled.div({
    marginTop: 10,
});

export const ArtWrapper = styled.div({
    minWidth: 400,
    minHeight: 400,
    maxWidth: 400,
    maxHeight: 400,
    border: '1px solid black',
    overflow: 'hidden',
});

export const Info = styled.span({
    display: 'block',
    marginBottom: 5,
    fontSize: 10,
    color: 'darkslategrey',
});

export const Art = styled.div(props => ({
    position: 'relative',
    height: 400,
    backgroundColor: props.backgroundColor,
}));

export const InputsWrapper = styled.div({
    marginTop: 10,
});

export const Text = styled.div({
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 5,
});

export const Input = styled.input({
    flex: 1,
    padding: 10,
    marginRight: 15,
    fontSize: 14,
});

export const Circle = styled.div(props => ({
    width: props.size || 20,
    height: props.size || 20,
    borderRadius: '50%',
    backgroundColor: props.color,
    cursor: 'pointer',
    border: props.border || 'none',
}));

export const Title = styled.h2({
    color: colors.azure,
    marginTop: 0,
});

export const Button = styled.div({
    width: 150,
    padding: 10,
    textAlign: 'center',
    border: `1px solid ${colors.black38}`,
    margin: '0 auto',
    borderRadius: 5,
    marginTop: 15,
    cursor: 'pointer',
});

export const ArrowWrapper = styled.div({
    position: 'absolute',
    left: 20,
    cursor: 'pointer',
    top: 25,
});

export const CreateBox = styled.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
});
