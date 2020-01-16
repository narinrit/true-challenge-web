import { Typography } from '@material-ui/core';
import { NextPage } from 'next';
import React from 'react';
import CoreBreadcrumb from '../components/Core/Breadcrumb';
import DefaultLayout from '../components/Layouts/DefaultLayout';
import redirectIfNotAuth from '../middlewares/redirectIfNotAuth';
import { NextPageContextWithStore } from '../store/types';

const IndexPage: NextPage = () => (
    <DefaultLayout>
        <CoreBreadcrumb />
        <Typography className="page-title" variant="h2" gutterBottom>True full-stack challenge web admin</Typography>
        <Typography variant="body1">Click menu on the left.</Typography>
    </DefaultLayout>
);

IndexPage.getInitialProps = async (ctx: NextPageContextWithStore) => {
    redirectIfNotAuth(ctx);
    return {};
};

export default IndexPage;
