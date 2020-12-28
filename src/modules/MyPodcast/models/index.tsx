export interface ShowModel {
    categories: number[];
    creatorName: string;
    customUrl: string;
    description: string;
    googleUrl: string;
    hasExpressAccount: string;
    id: number;
    imageUrl: string;
    isExternal: boolean;
    isTrending: boolean;
    itunesUrl: string;
    patreonUrl: string;
    promoted: boolean;
    spotifyUrl: string;
    title: string;
    userUrl: string;
    wasTrending: boolean;
    protected?: boolean;
    protectionPaid?: boolean;
    showPlaceholder: any;
}

export interface EpisodeModel {
    ad: any;
    createdBy: number;
    creator: number;
    creatorName: string;
    description: string;
    duration: number;
    editorUsed: boolean;
    frontendId: number | null;
    guid: string;
    id: string;
    imageUrl: string;
    recorderUsed: boolean;
    released: boolean;
    releasedAt: string;
    show: number;
    showTitle: string;
    title: string;
    totalExternalListens: number;
    totalListens: number;
    url: string;
}
