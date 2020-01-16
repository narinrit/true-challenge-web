import Router from 'next/router';
import { NextPageContextWithStore } from '../store/types';

export default function redirectIfNotAuth({ store, req, res }: NextPageContextWithStore) {
    const { auth } = store.getState();

    if (auth.isAuth) {
        return;
    }

    const url = '/sign-in';

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
