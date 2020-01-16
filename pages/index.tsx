import { Typography } from '@material-ui/core';
import { NextPage } from 'next';
import React from 'react';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import redirectIfNotAuth from '../middlewares/redirectIfNotAuth';
import { NextPageContextWithStore } from '../store/types';

const IndexPage: NextPage = () => (
    <DefaultLayout>
        <Typography className="page-title" variant="h2" gutterBottom>True full-stack challenge web admin</Typography>
        <Typography variant="body1">
            This project was created for the challenge:
            <br />
            <a href="https://rightman.true-e-logistics.com/full-stack/fullstack-challenge.html" target="_blank" rel="noopener noreferrer">
                https://rightman.true-e-logistics.com/full-stack/fullstack-challenge.html
            </a>
            <br />
            <br />

            Backend source code:
            <br />
            <a href="https://github.com/narinrit/true-challenge-api" target="_blank" rel="noopener noreferrer">
                https://github.com/narinrit/true-challenge-api
            </a>
            <br />
            <br />

            Frontend source code:
            <br />
            <a href="https://github.com/narinrit/true-challenge-web" target="_blank" rel="noopener noreferrer">
                https://github.com/narinrit/true-challenge-web
            </a>
            <br />
            <br />

            Please click menu on the sidebar.
        </Typography>
    </DefaultLayout>
);

IndexPage.getInitialProps = async (ctx: NextPageContextWithStore) => {
    redirectIfNotAuth(ctx);
    return {};
};

export default IndexPage;
