import {
    PAGE_LOADED, PAGE_LOADING, SET_DRAWER_OPEN, SET_SNACKBAR, ViewState,
} from './types';

const initialState: ViewState = {
    loading: false,
    drawerOpen: false,
    snackbar: {
        open: false,
        color: 'success',
        message: 'Success.',
    },
};

export default (state = initialState, action): ViewState => {
    switch (action.type) {
        case PAGE_LOADING:
            return { ...state, loading: true };
        case PAGE_LOADED:
            return { ...state, loading: false };
        case SET_SNACKBAR:
            return { ...state, snackbar: { ...initialState.snackbar, ...action.payload } };
        case SET_DRAWER_OPEN:
            return { ...state, drawerOpen: action.payload };
        default:
            return { ...state };
    }
};
