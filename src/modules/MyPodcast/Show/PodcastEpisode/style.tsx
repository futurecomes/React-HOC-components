import styled from 'react-emotion';

import { color, font, media } from 'src/styles/variables';

export const Container = styled.div({
    width: '100%',
    paddingRight: '0.6rem',
    marginBottom: '1.3rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    [media.lg]: {
        padding: '0 0.5rem 0 2rem',
    },
});
export const Row = styled.div({
    display: 'flex',
    alignItems: 'center',
});
export const EpisodeContent = styled.div({
    maxWidth: '450px',
    height: '100%',
    marginLeft: '1rem',
    display: 'flex',
    flexDirection: 'column',
});
export const PodcastTitle = styled.h6({
    margin: 0,
    color: color.darkGray,
    fontSize: font.size.small,
    fontWeight: 600,
});
export const PodcastNumber = styled.p({
    margin: 0,
    fontWeight: 400,
    fontSize: font.size.small,
});
export const PodcastDuration = styled.p({
    height: '100%',
    margin: '0 0.5rem 0 0',
    color: color.darkGray,
    fontSize: font.size.small,
});
