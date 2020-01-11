import { AxiosPromise, AxiosRequestConfig } from 'axios';
import { NextPageContext } from 'next';
import { Action, AnyAction, Store } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { AuthState } from './auth/types';
import { ViewState } from './view/types';

export interface AppState {
    auth: AuthState,
    view: ViewState,
}

export interface CustomStore<S, A extends Action = AnyAction> extends Store {
    dispatch: ThunkDispatch<S, undefined, A>;

    getState(): S
}

export interface CustomNextPageContext<S = any, A extends Action = AnyAction> extends NextPageContext {
    store: CustomStore<S, A>;
    isServer: boolean;
    axios: {
        (config: AxiosRequestConfig): AxiosPromise;
    };
}

export type NextPageContextWithStore = CustomNextPageContext<AppState>;

export type ThunkResult<R = any> = ThunkAction<R, AppState, undefined, Action>;
