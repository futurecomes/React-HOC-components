import moment from 'moment';
import React from 'react';
import styled from 'react-emotion';
import { Table, Tbody, Th, Thead, Tr } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

import { ContentWrapper, SectionWrapper } from 'src/styles/sections';
import { color, font } from 'src/styles/variables';

import { getPrevious7Months } from '../helpers/getPrevious7Months';
import { AnalyticsEpisode } from '../models/analytics';
import { EpisodeHistory } from './EpisodeHistory';

const Header = styled.h2(
    {
        color: color.tundora,
        marginBottom: '2rem',
    },
    font.normal(font.size.medium),
);

const StyledTable = styled(Table)({
    thead: {
        backgroundColor: color.gallery,
    },
    tr: {
        borderBottom: `1px solid ${color.mystic}`,
    },
    th: {
        ':not(:first-child)': {
            fontWeight: font.weight.normal,
        },
    },
    'th, td': {
        padding: '1rem',
    },
    '&.responsiveTable': {
        tbody: {
            tr: {
                padding: 0,
                marginBottom: '1rem',
                borderColor: color.mystic,
            },
            td: {
                '&.pivoted:not(:last-child)': {
                    borderBottom: `1px solid ${color.mystic} !important`, // !important needed to overwrite package's styling :(
                },
                '@media only screen and (max-width: 640px)': {
                    // Different breakpoints than our media queries
                    '&:first-child': {
                        backgroundColor: color.gallery,
                    },
                    '.tdBefore': {
                        fontWeight: font.weight.normal,
                    },
                    '&:not(:first-child) .tdBefore': {
                        color: color.baliHai,
                    },
                },
            },
        },
    },
});

interface Props {
    episodes: AnalyticsEpisode[];
    showFullLabels: boolean;
}

export const EpisodesBreakdown: React.FC<Props> = ({ episodes, showFullLabels }) => (
    <SectionWrapper backgroundColor={color.solitude}>
        <ContentWrapper>
            <Header>Episode Breakdown</Header>
            <StyledTable>
                {/* There are issues with responsiveness, it will probably be easier to rewrite this to a custom table*/}
                <Thead>
                    <Tr>
                        <Th>Episode</Th>
                        {getPrevious7Months().map(month => (
                            <Th key={month}>{moment(month).format(showFullLabels ? 'MMM YYYY' : 'MM/YY')}</Th>
                        ))}
                    </Tr>
                </Thead>
                <Tbody>
                    {episodes.map(episode => (
                        <EpisodeHistory key={episode.guid} episode={episode} />
                    ))}
                </Tbody>
            </StyledTable>
        </ContentWrapper>
    </SectionWrapper>
);
