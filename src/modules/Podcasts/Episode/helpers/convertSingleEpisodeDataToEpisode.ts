import { Episode, SingleEpisodeData } from '../../models/podcasts';

export const convertSingleEpisodeDataToEpisode = (episodeData: SingleEpisodeData): Partial<Episode> => ({
    title: episodeData.episodeTitle,
    description: episodeData.episodeDescription,
    url: episodeData.podcastUrl,
    imageUrl: episodeData.coverUrl,
    showTitle: episodeData.showTitle,
    showUrl: episodeData.showCustomUrl,
    customUrl: episodeData.customCreatorName,
    creatorName: episodeData.creatorName,
    duration: episodeData.episodeDuration,
});
