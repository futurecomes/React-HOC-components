export type ActionCreator<T extends Action<any, any>> = (payload: T['payload']) => T;

export interface Action<T, P = undefined> {
    readonly type: T;
    readonly payload?: P;
}
