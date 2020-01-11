import { Grid, Typography } from '@material-ui/core';
import { NextPage } from 'next';
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

    return (
        <DefaultLayout>
            <Typography className="page-title" variant="h2" gutterBottom>
                Product &quot;
                {data.name}
                &quot;
            </Typography>
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
