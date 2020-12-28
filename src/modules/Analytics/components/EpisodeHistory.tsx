import { Popover } from 'antd';
import moment from 'moment';
import React from 'react';
import styled from 'react-emotion';
import { connect } from 'react-redux';
import { Td, Tr } from 'react-super-responsive-table';

import { AppState } from 'src/config/appState';
import { color, font } from 'src/styles/variables';

import { AnalyticsEpisode, MonthHostsPlays, TotalMonthPlays } from '../models/analytics';
import { devices, platforms } from '../models/analyticsData';
import {
    getAnalyticsEpisodeMonthlyHostsPlays,
    getAnalyticsEpisodeTotalMonthlyPlays,
} from '../selectors/analyticsSelectors';

const Title = styled(Td)({
    fontSize: font.size.extraSmall,
});

interface TotalPlaysAmountProps {
    showPointer: boolean;
}

const TotalPlaysAmount = styled(Td)<TotalPlaysAmountProps>(
    {
        height: '57px',
        textAlign: 'center',
        cursor: 'default',
    },
    ({ showPointer }) =>
        showPointer && {
            cursor: 'pointer',
            span: {
                transition: 'color 0.2s',
            },

            ':hover': {
                span: {
                    color: color.royalBlue,
                },
            },
        },
);

const HostCategory = styled.div({
    marginBottom: '0.5rem',
});

const HostCategorySecondary = styled(HostCategory)({
    marginTop: '0.5rem',
});

const Host = styled.div({
    display: 'flex',
    justifyContent: 'space-between',

    'span + span': {
        marginLeft: '2rem',
    },
});

interface StateProps {
    monthlyHostsPlays: MonthHostsPlays[];
    totalMonthlyPlays: TotalMonthPlays[];
}

interface Props extends StateProps {
    episode: AnalyticsEpisode;
}

const generateHostsGroup = (hostsPlays: MonthHostsPlays | undefined, group: string[]) => (
    <>
        {hostsPlays &&
            hostsPlays.hostsPlays
                .filter(({ hostname }) => group.includes(hostname))
                .sort((a, b) => b.plays - a.plays)
                .map(({ hostname, plays }) => (
                    <Host key={hostname}>
                        <span>{hostname}</span>
                        <span>{plays}</span>
                    </Host>
                ))}
    </>
);

export const EpisodeHistoryContainer: React.FC<Props> = ({ episode, totalMonthlyPlays, monthlyHostsPlays }) => {
    const generateMonthPopoverContent = (month: string): JSX.Element => {
        const hostsPlays = monthlyHostsPlays.find(monthHostsPlays => monthHostsPlays.month === month);

        return (
            <>
                <HostCategory>Platforms</HostCategory>
                {generateHostsGroup(hostsPlays, platforms)}

                <HostCategorySecondary>Devices</HostCategorySecondary>
                {generateHostsGroup(hostsPlays, devices)}
            </>
        );
    };

    return (
        <Tr>
            <Title>{episode.title}</Title>
            {totalMonthlyPlays.map(monthPlays => (
                <TotalPlaysAmount key={moment(monthPlays.month).format('MMMM')} showPointer={monthPlays.plays > 0}>
                    {monthPlays.plays > 0 && (
                        <Popover title="" content={generateMonthPopoverContent(monthPlays.month)} placement="right">
                            <span>{monthPlays.plays}</span>
                        </Popover>
                    )}
                </TotalPlaysAmount>
            ))}
        </Tr>
    );
};

const mapStateToProps = (state: AppState, ownProps: Props) => ({
    monthlyHostsPlays: getAnalyticsEpisodeMonthlyHostsPlays(state, ownProps.episode.guid),
    totalMonthlyPlays: getAnalyticsEpisodeTotalMonthlyPlays(state, ownProps.episode.guid),
});

export const EpisodeHistory = connect(mapStateToProps)(EpisodeHistoryContainer);
