import { ThunkResult } from '../types';
import {
    PAGE_LOADED, PAGE_LOADING, SET_DRAWER_OPEN, SET_SNACKBAR, SnackbarState,
} from './types';

export const pageLoading = { type: PAGE_LOADING };
export const pageLoaded = { type: PAGE_LOADED };

export const setLoading = (loading): ThunkResult => (dispatch) => {
    if (loading) {
        dispatch(pageLoading);
    } else {
        setTimeout(() => {
            dispatch(pageLoaded);
        }, 500);
    }
};

export const setDrawerOpen = (open: boolean): ThunkResult => (dispatch) => {
    dispatch({ type: SET_DRAWER_OPEN, payload: open });
};

export const closeSnackbar = (): ThunkResult => (dispatch, getState) => {
    const { snackbar } = getState().view;
    dispatch({ type: SET_SNACKBAR, payload: { ...snackbar, open: false } });
};

export const openSnackbar = (payload?: SnackbarState | string): ThunkResult => (dispatch) => {
    dispatch(closeSnackbar());
    setTimeout(() => {
        if (typeof payload === 'string') {
            dispatch({ type: SET_SNACKBAR, payload: { open: true, message: payload } });
        } else {
            dispatch({ type: SET_SNACKBAR, payload: { open: true, ...payload } });
        }
    });
};
