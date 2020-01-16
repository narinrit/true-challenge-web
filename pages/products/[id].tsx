import { Grid, Typography } from '@material-ui/core';
import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import ProductDetailForm from '../../components/Product/ProductDetailForm';
import redirectIfNotAuth from '../../middlewares/redirectIfNotAuth';
import { NextPageContextWithStore } from '../../store/types';

type Props = {
    data: any;
};

const UserEditPage: NextPage<Props> = (props) => {
    const { data } = props;

    const breadcrumbs = [
        {
            text: 'Products',
            href: '/products',
        },
        {
            text: data.name,
            href: '/products/[id]',
            as: `/products/${data.id}`,
        },
    ];

    const title = `Product "${data.name}"`;

    return (
        <DefaultLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{title}</title>
            </Head>

            <Typography className="page-title" variant="h2" gutterBottom>{title}</Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <ProductDetailForm data={data} />
                </Grid>
            </Grid>
        </DefaultLayout>
    );
};

UserEditPage.getInitialProps = async (ctx: NextPageContextWithStore) => {
    redirectIfNotAuth(ctx);
    const { query } = ctx;

    const data = await ctx.axios({
        method: 'get',
        url: `/products/${query.id}`,
    }).then((response) => response.data);

    return { data };
};

export default UserEditPage;
