export const initialState = {
    isProtectShowPaymentFormVisible: false,
    isPromotePaymentFormVisible: false,
    payment: false,
};

export enum Actions {
    OPEN_PROTECT_FORM,
    OPEN_PROMOTE_FORM,
}

export interface Action {
    type: Actions;
}

export const showReducer = (state: typeof initialState, action: Action) => {
    switch (action.type) {
        case Actions.OPEN_PROTECT_FORM:
            return {
                isPromotePaymentFormVisible: false,
                payment: true,
                isProtectShowPaymentFormVisible: true,
            };
        case Actions.OPEN_PROMOTE_FORM:
            return {
                payment: true,
                isProtectShowPaymentFormVisible: false,
                isPromotePaymentFormVisible: true,
            };
        default:
            return state;
    }
};
