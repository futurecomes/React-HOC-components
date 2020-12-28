import ReactGA from 'react-ga';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

ReactGA.initialize('UA-67550913-4');

history.listen(location => {
    ReactGA.set({ page: location.pathname });
    ReactGA.pageview(location.pathname);
});
