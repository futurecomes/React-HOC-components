import styled from 'react-emotion'

export const Wheel = styled.div({
    margin: 'auto',
    width: 250,
    height: 250,
    borderRadius: '50%',
    position: 'relative',
    overflow: 'hidden',
    border: '8px solid #fff',
    boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px, rgba(0, 0, 0, 0.05) 0px 3px 0px',
    transform: 'rotate(0deg)',
    '::before': {
        content: '""',
        position: 'absolute',
        border: '4px solid rgba(0, 0, 0, 0.1)',
        width: 242,
        height: 242,
        borderRadius: '50%',
        zIndex: 1000,
    },
})

export const InnerWheel = styled.div(props => ({
    width: '100%',
    height: '100%',
    transition: `all ${props.time}s cubic-bezier(0, 0.99, 0.74, 0.99)`,
}))

export const CirclePart = styled.div(props => ({
    overflow: 'hidden',
    position: 'absolute',
    top: 0,
    right: 0,
    width: '50%',
    height: '50%',
    transformOrigin: '0% 100%',
    transform: `rotate(${props.rotate}deg) skewY(-${props.skewSlice}deg)`,
    background: props.color,
}))

export const Spin = styled.div({
    width: 68,
    height: 68,
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-34px 0 0 -34px',
    borderRadius: '50%',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 3px 0px',
    background: '#fff',
    cursor: 'pointer',
    userSelect: 'none',
    ':after': {
        content: '"SPIN"',
        display: 'block',
        textAlign: 'center',
        lineHeight: '68px',
        color: '#ccc',
        position: 'relative',
        width: 68,
        height: 68,
        zIndex: 1000,
    },
    ':before': {
        content: '""',
        position: 'absolute',
        width: 0,
        height: 0,
        borderStyle: 'solid',
        borderWidth: '0 20px 28px 20px',
        borderColor: 'transparent transparent #ffffff transparent',
        top: -12,
        left: 14,
    },
})

export const InnerSpin = styled.div({
    width: 54,
    height: 54,
    position: 'absolute',
    top: '50%',
    left: '50%',
    margin: '-27px 0 0 -27px',
    borderRadius: '50%',
    zIndex: 999,
    boxShadow: `rgba(255, 255, 255, 1) 0px -2px 0px inset,
      rgba(255, 255, 255, 1) 0px 2px 0px inset, rgba(0, 0, 0, 0.4) 0px 0px 5px`,

    background: 'rgb(255, 255, 255)',
})
