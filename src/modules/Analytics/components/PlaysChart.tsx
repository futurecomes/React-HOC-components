import React from 'react';
import { connect } from 'react-redux';
import { AppState } from 'src/config/appState';

import { BarChart } from 'src/shared/components/charts/BarChart';
import { ContentWrapper, SectionWrapper } from 'src/styles/sections';
import { color } from 'src/styles/variables';

import { ChartFormattedTotalMonthPlays } from '../models/analytics';
import { getAnalyticsShowChartTotalMonthlyPlays } from '../selectors/analyticsSelectors';

interface StateProps {
    showTotalMonthlyPlays: ChartFormattedTotalMonthPlays[];
}

interface Props extends StateProps {
    showFullLabels: boolean;
}

const PlaysChartContainer: React.FC<Props> = ({ showTotalMonthlyPlays, showFullLabels }) => (
    <SectionWrapper backgroundColor={color.solitude}>
        <ContentWrapper>
            <BarChart
                data={showTotalMonthlyPlays}
                xAxisDataKey={showFullLabels ? 'month' : 'monthShort'}
                yAxisDataKey="plays"
                height={250}
            />
        </ContentWrapper>
    </SectionWrapper>
);

const mapStateToProps = (state: AppState) => ({
    showTotalMonthlyPlays: getAnalyticsShowChartTotalMonthlyPlays(state),
});

export const PlaysChart = connect(mapStateToProps)(PlaysChartContainer);
