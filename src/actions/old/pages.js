import PagesApi from 'src/api/pages';

export const PAGES_IS_FETCHING = 'PAGES_IS_FETCHING';
export const PAGES_FETCHED = 'PAGES_FETCHED';
export function fetchPages() {
    return (dispatch, getStore) => {
        const {
            auth: { token },
        } = getStore();

        dispatch({
            type: PAGES_IS_FETCHING,
        });

        return PagesApi.fetchPages(token).then(res =>
            dispatch({
                type: PAGES_FETCHED,
                payload: res,
            }),
        );
    };
}
