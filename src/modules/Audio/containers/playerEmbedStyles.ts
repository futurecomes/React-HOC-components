import styled from 'react-emotion';

import { color, font } from 'src/styles/variables';

export const Wrapper = styled.div({
    fontFamily: 'Roboto, Arial, Helvetica, sans-serif', // to be added to the whole app in the future, only on new pages for now
    background: color.blackPearl,
    padding: '1rem',
    height: 300,
});

export const Top = styled.div({
    display: 'flex',
    position: 'relative',
});

export const TopWrapper = styled.div({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    marginLeft: '1rem',
    color: color.white,
});

export const LogoLink = styled.a({
    position: 'absolute',
    top: 0,
    right: 0,
    transition: 'opacity 0.2s',
    '&:hover': {
        opacity: 0.7,
    },
});

export const ShowTitle = styled.span({
    fontSize: font.size.medium,
});

export const EpisodeTitle = styled.span({
    marginTop: '0.25rem',
    fontSize: font.size.small,
    color: color.silverSand,
});

export const ProgressWrapper = styled.div({
    display: 'flex',
    alignItems: 'center',
    fontSize: font.size.extraSmall,
});

interface ProgressBarProps {
    width: string;
}

export const ProgressBar = styled.div<ProgressBarProps>(({ width }) => ({
    height: 5,
    background: color.trout,
    flex: 1,
    cursor: 'pointer',
    borderRadius: 2,
    margin: '0 0.5rem',
    '&:after': {
        display: 'block',
        content: '""',
        width,
        height: 5,
        borderRadius: 2,
        background: color.silverSand,
    },
}));

export const Show = styled.div({
    display: 'flex',
    flexDirection: 'column',
});

export const TogglePlayButton = styled.button({
    width: '100%',
    backgroundColor: color.royalBlue,
    display: 'flex',
    justifyContent: 'center',
    margin: '1rem 0',
    padding: '0.5rem',
    cursor: 'pointer',
    img: {
        height: '1rem',
    },
});

export const Bottom = styled.div({
    color: 'white',
    overflowY: 'auto',
    maxHeight: 150,
    fontSize: font.size.extraSmall,
    marginRight: '-0.5rem',
});

export const Episode = styled.div({
    padding: '0.5rem',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
    ':hover': {
        backgroundColor: color.trout,
    },
});
