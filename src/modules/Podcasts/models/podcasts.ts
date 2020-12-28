export interface ShowCategory {
    id: number;
    name: string;
}

export interface Show {
    id: number;
    title: string;
    description: string;
    categories: Array<number | null>;
    userUrl: string;
    creatorName: string;
    imageUrl?: string;
    customUrl?: string;
    itunesUrl?: string;
    spotifyUrl?: string;
    googleUrl?: string;
    patreonUrl?: string;
    wasTrending: boolean;
    isTrending: boolean;
    promoted: boolean;
    isExternal: boolean;
    isSubscribed?: boolean;
    hasExpressAccount: string;
    showPlaceholder: boolean;
    protected?: boolean;
}

export interface Episode {
    creatorName: string;
    showTitle: string;
    id: string;
    guid: string | number;
    title: string;
    creator: number;
    show: number;
    duration: number;
    description: string;
    recorderUsed: boolean;
    editorUsed: boolean;
    url: string;
    createdAt: string;
    released: boolean;
    releasedAt: string;
    imageUrl?: string;
    showUrl: string;
    customUrl?: string;
    categories: Array<number | null>;
    shortDescription: string;
    shortTitle: string;
    showPlaceholder: boolean;
}

export interface SingleEpisodeData {
    creatorName: string;
    customCreatorName?: string;
    episodeTitle: string;
    episodeDescription: string;
    podcastUrl: string;
    showId: number;
    showCustomUrl?: string;
    showTitle: string;
    episodeGuid: string;
    episodeDuration: number;
    coverUrl: string;
}

export type PodcastItem = Show | Episode;
