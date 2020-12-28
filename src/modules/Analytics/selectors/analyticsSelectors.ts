import moment from 'moment';
import { createSelector } from 'reselect';
import { AppState } from 'src/config/appState';

import { getPrevious7Months } from '../helpers/getPrevious7Months';
import {
    AnalyticsEpisode,
    ChartFormattedTotalMonthPlays,
    MonthHostsPlays,
    TimePeriodHistory,
    TotalDayPlays,
    TotalMonthPlays,
} from '../models/analytics';
import { devices, platforms } from '../models/analyticsData';

export const getAnalytics = (state: AppState) => state.analytics;

export const getAnalyticsShowEpisodes = (state: AppState) => getAnalytics(state).episodes;

export const getIsAnalyticsFetching = (state: AppState) => getAnalytics(state).isFetching;

const getAllEpisodesHostsHistories = (episodes: AnalyticsEpisode[]) =>
    episodes.reduce((acc, episode) => [...acc, ...episode.hostsHistory], []);

const sumHistoryPlaysForEachDay = (historyPlays: TotalDayPlays[]): TimePeriodHistory =>
    historyPlays.reduce((acc, historyPlay) => {
        const day = historyPlay.day.toString();

        return {
            ...acc,
            [day]: acc[day] ? acc[day] + historyPlay.plays : historyPlay.plays,
        };
    }, {});

export const getAnalyticsShowTotalPlays = createSelector(
    getAnalyticsShowEpisodes,
    (episodes?: AnalyticsEpisode[]): number => {
        if (!episodes) {
            return 0;
        }

        const allHostsHistories = getAllEpisodesHostsHistories(episodes);

        return allHostsHistories.reduce(
            (acc, hostHistory) =>
                acc + hostHistory.historyPlays.reduce((sum, historyPlay) => sum + historyPlay.plays, 0),
            0,
        );
    },
);

export const getAnalyticsShowDailyHistory = createSelector(
    getAnalyticsShowEpisodes,
    (episodes?: AnalyticsEpisode[]): TimePeriodHistory | undefined => {
        if (!episodes) {
            return;
        }

        const allHistoryPlays = getAllEpisodesHostsHistories(episodes).reduce(
            (acc, hostHistory) => [...acc, ...hostHistory.historyPlays],
            [],
        );

        return sumHistoryPlaysForEachDay(allHistoryPlays);
    },
);

export const getAnalyticsShowChartTotalMonthlyPlays = createSelector(
    getAnalyticsShowDailyHistory,
    (dailyHistory): ChartFormattedTotalMonthPlays[] | undefined => {
        if (!dailyHistory) {
            return;
        }

        return getPrevious7Months().reduce((monthsAcc, month) => {
            const monthTimestamp = moment(month);

            const playsInMonth = Object.keys(dailyHistory).reduce((monthPlaysAcc, day) => {
                const dayTimestamp = moment(day);

                return monthTimestamp.year() === dayTimestamp.year() && monthTimestamp.month() === dayTimestamp.month()
                    ? monthPlaysAcc + dailyHistory[day]
                    : monthPlaysAcc;
            }, 0);

            return [
                ...monthsAcc,
                {
                    month: moment(monthTimestamp).format('MMM YYYY'),
                    monthShort: moment(monthTimestamp).format('MM/YY'),
                    plays: playsInMonth,
                },
            ];
        }, []);
    },
);

export const extractEpisodeId = (_state: AppState, id: string) => id;

export const getAnalyticsEpisode = createSelector(
    getAnalyticsShowEpisodes,
    extractEpisodeId,
    (episodes: AnalyticsEpisode[], id: string): AnalyticsEpisode | undefined =>
        episodes && episodes.find(episode => episode.guid === id),
);

export const getAnalyticsEpisodeMonthlyHostsPlays = createSelector(
    getAnalyticsEpisode,
    (episode: AnalyticsEpisode): MonthHostsPlays[] | undefined =>
        getPrevious7Months().reduce((monthsAcc, month) => {
            const monthTimestamp = moment(month);

            const hostsPlays = episode.hostsHistory.reduce(
                (hostsPlaysAcc, hostPlay) => [
                    ...hostsPlaysAcc,
                    {
                        hostname: hostPlay.hostname,
                        plays: hostPlay.historyPlays.reduce((historyPlaysAcc, historyPlay) => {
                            const dayTimestamp = moment(historyPlay.day);

                            const sameMonthAndYear =
                                dayTimestamp.month() === monthTimestamp.month() &&
                                dayTimestamp.year() === monthTimestamp.year();

                            return sameMonthAndYear ? historyPlaysAcc + historyPlay.plays : historyPlaysAcc;
                        }, 0),
                    },
                ],
                [],
            );

            const groups = [...platforms, ...devices];

            const hosts = hostsPlays.filter(host => groups.includes(host.hostname));
            const otherHosts = hostsPlays
                .filter(host => !groups.includes(host.hostname))
                .reduce((playsAcc, { plays }) => playsAcc + plays, 0);

            const filteredHosts = [...hosts, { hostname: 'Others', plays: otherHosts }];

            return [
                ...monthsAcc,
                {
                    month: monthTimestamp.toString(),
                    hostsPlays: filteredHosts,
                },
            ];
        }, []),
);

export const getAnalyticsEpisodeTotalMonthlyPlays = createSelector(
    getAnalyticsEpisodeMonthlyHostsPlays,
    (monthlyHostsPlays: MonthHostsPlays[]): TotalMonthPlays[] | undefined =>
        monthlyHostsPlays.reduce(
            (monthlyHostsPlaysAcc, monthHostsPlays) => [
                ...monthlyHostsPlaysAcc,
                {
                    month: monthHostsPlays.month,
                    plays: monthHostsPlays.hostsPlays.reduce(
                        (hostsPlaysAcc, hostPlays) => hostsPlaysAcc + hostPlays.plays,
                        0,
                    ),
                },
            ],
            [],
        ),
);
