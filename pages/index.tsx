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
            <a href="https://rightman.true-e-logistics.com/full-stack/fullstack-challenge.html">
                https://rightman.true-e-logistics.com/full-stack/fullstack-challenge.html
            </a>
        </Typography>
        <br />
        <Typography variant="body1">Please click menu on the left.</Typography>
    </DefaultLayout>
);

IndexPage.getInitialProps = async (ctx: NextPageContextWithStore) => {
    redirectIfNotAuth(ctx);
    return {};
};

export default IndexPage;
