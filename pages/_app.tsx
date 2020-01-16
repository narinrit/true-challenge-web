import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import axios from 'axios';
import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import Head from 'next/head';
import Router from 'next/router';
import React from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import Cookies from 'universal-cookie';
import '../assets/styles.scss';
import CoreSnackbar from '../components/Core/Snackbar';
import makeStore from '../store';
import { authorization } from '../store/auth/actions';
import { pageLoaded, pageLoading } from '../store/view/actions';
import publicRuntimeConfig from '../utils/publicRuntimeConfig';
import theme from '../utils/theme';

const { API_URL } = publicRuntimeConfig;

class MyApp extends App {
    static async getInitialProps({ Component, ctx }) {
        // store, isServer, pathname, asPath, query, req,
        const { store, isServer, req } = ctx;
        const { dispatch } = store;

        // Add axiosSSR function to ctx (Axios with server-side support)
        ctx.axios = (option) => {
            let { headers } = option;

            // Define as object if not available value in option
            headers = headers || {};

            if (isServer) {
                // Forward header from real client request
                if (req.headers.cookie) headers.cookie = req.headers.cookie;
                if (req.headers.referer) headers.referer = req.headers.referer;
                if (req.headers['user-agent']) headers['user-agent'] = req.headers['user-agent'];
                headers['x-forwarded-for'] = req.headers['x-forwarded-for'] || req.connection.remoteAddress;

                // JWT Authorization
                const jwt = new Cookies(req.headers.cookie).get('jwt');
                if (jwt && !headers.Authorization) headers.Authorization = `Bearer ${jwt}`;
            }

            return axios({
                baseURL: API_URL,
                ...option,
                headers,
            }).catch((error) => {
                // eslint-disable-next-line no-console
                console.error(`Axois Error at ${option.url}`, '\n', error.response ? error.response.data : error);
                throw error;
            });
        };

        if (isServer) {
            // Auth on page load
            await dispatch(authorization(isServer, ctx));
        }

        const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};

        return { pageProps };
    }

    constructor(props, context) {
        super(props, context);

        const { store } = props;
        const { dispatch } = store;

        // Add page loading progress on route change

        Router.events.on('routeChangeStart', () => {
            dispatch(pageLoading);
        });
        Router.events.on('routeChangeComplete', () => {
            dispatch(pageLoaded);
        });
        Router.events.on('routeChangeError', () => {
            dispatch(pageLoaded);
        });

        // @ts-ignore
        if (process.browser) {
            // Auth on page load
            dispatch(authorization());
        }
    }

    componentDidMount() {
        // Remove the server-side injected CSS.
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles) {
            jssStyles.parentElement.removeChild(jssStyles);
        }
    }

    render() {
        // @ts-ignore
        const { Component, pageProps, store } = this.props;

        return (
            <>
                <Head>
                    <title>Index</title>
                </Head>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    <ReduxProvider store={store}>
                        <CoreSnackbar />
                        <Component {...pageProps} />
                    </ReduxProvider>
                </ThemeProvider>
            </>
        );
    }
}

export default withRedux(makeStore)(MyApp);
