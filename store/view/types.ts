export interface SnackbarState {
    open?: boolean;
    message?: string;
    color?: 'success' | 'warning' | 'error' | 'info';
}

export interface ViewState {
    loading: boolean;
    drawerOpen: boolean;
    snackbar: SnackbarState;
}

export const PAGE_LOADING = 'PAGE_LOADING';
export const PAGE_LOADED = 'PAGE_LOADED';
export const SET_DRAWER_OPEN = 'SET_DRAWER_OPEN';
export const SET_SNACKBAR = 'SET_SNACKBAR';
