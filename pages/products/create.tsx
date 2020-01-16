import { Grid, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import ProductDetailForm from '../../components/Product/ProductDetailForm';
import redirectIfNotAuth from '../../middlewares/redirectIfNotAuth';
import { NextPageContextWithStore } from '../../store/types';

const breadcrumbs = [
    {
        text: 'Products',
        href: '/products',
    },
    {
        text: 'Create',
        href: '/products/create',
    },
];

const title = 'Create new product';

const UserCreatePage: NextPage = () => (
    <DefaultLayout breadcrumbs={breadcrumbs}>
        <Head>
            <title>{title}</title>
        </Head>

        <Typography className="page-title" variant="h2" gutterBottom>{title}</Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <ProductDetailForm />
            </Grid>
        </Grid>
    </DefaultLayout>
);

UserCreatePage.getInitialProps = async (ctx: NextPageContextWithStore) => {
    redirectIfNotAuth(ctx);
    return {};
};

export default UserCreatePage;
