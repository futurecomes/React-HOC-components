import * as React from 'react';
import { Link } from 'react-router-dom';

import Pen from 'src/public/img/icons/pen.svg';
import { paths } from 'src/routing/routesPath';
import { Button } from '../ButtonsList/style';

interface Props {
    isPaid: boolean;
    showId: number;
}
export const AnalyticsButton: React.FC<Props> = ({ isPaid, showId }) => (
    <>
        {isPaid ? (
            <Link to={paths.toAnalytics(showId)}>
                <Button image={Pen}>Analytics</Button>
            </Link>
        ) : (
            <Link to={paths.toPricing}>
                <Button image={Pen}>Buy Analytics</Button>
            </Link>
        )}
    </>
);
