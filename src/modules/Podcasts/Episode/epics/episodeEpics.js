import { combineEpics, ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';

import SingleEpisodeHTTPRequestsService from '../services/SingleEpisodeHTTPRequestsService';
import { SINGLE_EPISODE_FETCHING_START, singleEpisodeFetchingSucceed } from '../actions/SingleEpisodeActions';

const fetchEpisodeEpic = action$ => {
    return action$.pipe(
        ofType(SINGLE_EPISODE_FETCHING_START),
        switchMap(({ payload: guid }) =>
            SingleEpisodeHTTPRequestsService.getEpisode(guid).then(data => singleEpisodeFetchingSucceed(data)),
        ),
    );
};

export default combineEpics(fetchEpisodeEpic);
