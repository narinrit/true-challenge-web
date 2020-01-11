import { Grid, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import ProductDetailForm from '../../components/Product/ProductDetailForm';
import redirectIfNotAuth from '../../middlewares/redirectIfNotAuth';
import { NextPageContextWithStore } from '../../store/types';

const UserCreatePage: NextPage = () => (
    <DefaultLayout>
        <Typography className="page-title" variant="h2" gutterBottom>Create new product</Typography>
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
