import Router from 'next/router';
import { NextPageContextWithStore } from '../store/types';

export default function redirectIfNotAuth({ store, req, res }: NextPageContextWithStore) {
    const { auth } = store.getState();
    let url;

    if (auth.isAuth) {
        // eslint-disable-next-line no-constant-condition
        if (auth.user.reset_password) {
            url = '/change-password';
        } else {
            return;
        }
    } else {
        url = '/sign-in';
    }

    if (res) {
        if (req.url === url) return;
        res.writeHead(302, {
            Location: url,
        });
        res.end();
    } else {
        Router.push(url);
    }
}
