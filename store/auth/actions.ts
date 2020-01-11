import axios from 'axios';
import Router from 'next/router';
import Cookies from 'universal-cookie';
import publicRuntimeConfig from '../../utils/publicRuntimeConfig';
import { ThunkResult } from '../types';
import { setLoading } from '../view/actions';
import { SIGN_OUT, SIGNED_IN } from './types';

const { API_URL } = publicRuntimeConfig;

const afterSignedInOut = () => {
    // Reload page
    Router.push('/');
};

export const signOut = () => (dispatch) => {
    dispatch({ type: SIGN_OUT });

    // Cookie
    const cookies = new Cookies();
    const option = { path: '/' };

    cookies.remove('jwt', option);
    cookies.remove('remember', option);

    // Axios
    delete axios.defaults.headers.common.Authorization;

    afterSignedInOut();
};

function setJWT(jwt, remember) {
    // Cookie
    const cookies = new Cookies();
    const option = {
        path: '/',
        maxAge: undefined,
    };
    if (remember) option.maxAge = 60 * 60 * 24 * 365 * 20;

    cookies.set('jwt', jwt, option);
    cookies.set('remember', remember ? 1 : 0, option);

    // Axios
    axios.defaults.headers.common.Authorization = `Bearer ${jwt}`;
}

/**
 * @param isServer {boolean} Dispatch on server or browser
 * @param ctx {Object} Object of next ctx
 * @param force
 * @returns {Function} Dispatch this will return authorization status {boolean}
 */
export const authorization = (isServer = false, ctx = undefined, force = false): ThunkResult<Promise<boolean>> => async (dispatch, getState) => {
    /** JWT reset time * */
    const cookies = new Cookies(ctx ? ctx.req.headers.cookie : undefined);

    const jwt = cookies.get('jwt');
    const remember = cookies.get('remember') === '1';

    if (jwt) {
        // Set cookie and axios header in browser
        if (!isServer) setJWT(jwt, remember);
    }
    /** End JWT reset time * */

    /** Get auth user form api * */
    const { isAuth } = getState().auth;

    if ((!isAuth && jwt) || force) {
        const authUser = await axios({
            method: 'get',
            url: '/auth/me',
            baseURL: API_URL,
            headers: { Authorization: `Bearer ${jwt}` },
        }).then(async (response) => {
            const user = response.data;
            if (user) {
                dispatch({ type: SIGNED_IN, payload: user });
            }
            return user;
        }).catch(() => {
            // Sign out when any error
            if (!isServer) dispatch(signOut());
            return null;
        });

        return Boolean(authUser);
    }

    return isAuth;
};

export const signIn = ({ username, password, remember = null }): ThunkResult<Promise<boolean>> => async (dispatch) => {
    dispatch(setLoading(true));
    return axios({
        method: 'post',
        url: '/auth/login',
        baseURL: API_URL,
        data: {
            username,
            password,
        },
    }).then(async (response) => {
        const { token } = response.data;

        if (token) {
            setJWT(token, remember);
            const isAuth = await dispatch(authorization());
            if (isAuth) afterSignedInOut();
            return isAuth;
        }

        return false;
    }).catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
        return false;
    }).finally(() => {
        dispatch(setLoading(false));
    });
};
