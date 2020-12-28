import { Moment } from 'moment';

export interface Plays {
    plays: number;
}

export interface Hostname {
    hostname: string;
}

export interface TotalDayPlays extends Plays {
    day: Moment;
}

export interface TotalMonthPlays extends Plays {
    month: string;
}

export interface ChartFormattedTotalMonthPlays extends TotalMonthPlays {
    monthShort: string;
}

export interface MonthHostsPlays {
    month: string;
    hostsPlays: Array<Hostname & Plays>;
}

export type TimePeriodHistory = Record<string, number>;

export interface HostHistory extends Hostname {
    historyPlays: TotalDayPlays[];
}

export interface AnalyticsEpisode {
    title: string;
    guid: string;
    releasedAt: number;
    hostsHistory: HostHistory[];
}
