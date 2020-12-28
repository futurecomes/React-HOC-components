import { isEmpty } from 'lodash';
import React from 'react';

import applePodcastsIcon from 'src/public/img/apple-podcasts.svg';
import googlePodcastsIcon from 'src/public/img/google-podcasts.svg';
import messyIcon from 'src/public/img/messy.svg';
import spotifyIcon from 'src/public/img/spotify.svg';

import { TilesContainer } from 'src/shared/styled/tileLinks';

import { TileLink } from './TileLink';

const icons = {
    applePodcasts: applePodcastsIcon,
    googlePodcasts: googlePodcastsIcon,
    spotify: spotifyIcon,
};
interface PlatformLink {
    title: string;
    link?: string;
    icon: string;
}

interface Props {
    showId: number;
    links: PlatformLink[];
    showPlayOnMessy?: boolean;
}

export const ExternalServices: React.FC<Props> = ({ showId, links, showPlayOnMessy }) =>
    !isEmpty(links) || showPlayOnMessy ? (
        <>
            <h4>Listen on:</h4>
            <TilesContainer>
                {showPlayOnMessy && <TileLink internal title="Messy" icon={messyIcon} link={`/show/${showId}`} />}
                {links.map(
                    platformItem =>
                        platformItem.link && (
                            <TileLink
                                key={platformItem.title}
                                title={platformItem.title}
                                icon={icons[platformItem.icon]}
                                link={platformItem.link}
                            />
                        ),
                )}
            </TilesContainer>
        </>
    ) : null;
