import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    makeStyles,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Theme,
    Typography,
} from '@material-ui/core';
import axios from 'axios';
import { NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Router, { useRouter } from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import FilterForm from '../../components/FilterForm';
import DefaultLayout from '../../components/Layouts/DefaultLayout';
import redirectIfNotAuth from '../../middlewares/redirectIfNotAuth';
import { NextPageContextWithStore } from '../../store/types';
import { openSnackbar } from '../../store/view/actions';
import publicRuntimeConfig from '../../utils/publicRuntimeConfig';

const { API_URL } = publicRuntimeConfig;

const breadcrumbs = [
    {
        text: 'Products',
        href: '/products',
    },
];

const title = 'Product Management';

const useStyles = makeStyles((theme: Theme) => ({
    button: {
        marginRight: theme.spacing(1),
    },
    paper: {
        width: '100%',
        overflowX: 'auto',
    },
    table: {
        minWidth: 650,
    },
}));

type Order = 'asc' | 'desc';

type Props = {
    data: any;
};

const ProductIndexPage: NextPage<Props> = (props) => {
    const router = useRouter();
    const classes = useStyles(props);
    const dispatch = useDispatch();

    const { data } = props;
    const { data: items } = data;

    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const [deleteId, setDeleteId] = useState(null);

    const handleDelete = (id) => () => {
        setDeleteId(id);
        setDeleteDialogOpen(true);
    };

    const handleCloseDeleteDialog = () => {
        setDeleteDialogOpen(false);
    };

    const handleConfirmDelete = () => {
        axios({
            method: 'delete',
            url: `/products/${deleteId}`,
            baseURL: API_URL,
        }).then((response) => {
            const { code, message } = response.data;
            if (code === '00') {
                dispatch(openSnackbar());
                Router.push({
                    pathname: Router.pathname,
                    query: Router.query,
                }, Router.asPath);
            } else {
                dispatch(openSnackbar({
                    color: 'warning',
                    message: `Cannot delete this product: [${code}] ${message}`,
                }));
            }
        }).catch((error) => {
            const { message } = error.response.data;
            dispatch(openSnackbar({
                message: `Fail to delete: ${message}`,
                color: 'error',
            }));
        }).finally(() => {
            setDeleteDialogOpen(false);
        });
    };

    const handleChangePage = (event: unknown, page: number) => {
        Router.push({
            pathname: Router.pathname,
            query: {
                ...Router.query,
                page,
            },
        });
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        Router.push({
            pathname: Router.pathname,
            query: {
                ...Router.query,
                limit: parseInt(event.target.value, 10),
                page: 0,
            },
        });
    };

    const orderBy = router.query.orderBy as string;
    const order = (router.query.order || 'asc') as Order;

    const handleOrderBy = (name) => () => {
        const isDesc = orderBy === name && order === 'desc';

        Router.push({
            pathname: Router.pathname,
            query: {
                ...Router.query,
                orderBy: name,
                order: isDesc ? 'asc' : 'desc',
            },
        });
    };

    return (
        <DefaultLayout breadcrumbs={breadcrumbs}>
            <Head>
                <title>{title}</title>
            </Head>

            <div className="page-title-warp">
                <Typography className="page-title" variant="h2" gutterBottom>{title}</Typography>
                <span className="spacer" />
                <Link href="/products/create" passHref>
                    <Button
                        color="primary"
                        variant="contained"
                    >
                        Add Product
                    </Button>
                </Link>
            </div>

            <FilterForm />

            <Paper className={classes.paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <TableSortLabel
                                    active={orderBy === 'name'}
                                    direction={order}
                                    onClick={handleOrderBy('name')}
                                >
                                    Name
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === 'quantity'}
                                    direction={order}
                                    onClick={handleOrderBy('quantity')}
                                >
                                    Quantity
                                </TableSortLabel>
                            </TableCell>
                            <TableCell align="right">
                                <TableSortLabel
                                    active={orderBy === 'price'}
                                    direction={order}
                                    onClick={handleOrderBy('price')}
                                >
                                    Price (THB)
                                </TableSortLabel>
                            </TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {!!items && !!items.length && items.map((item) => (
                            <TableRow hover key={item.id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell align="right">{item.quantity}</TableCell>
                                <TableCell align="right">{Number(item.price).toFixed(2)}</TableCell>
                                <TableCell>
                                    <Link href="/products/[id]" as={`/products/${item.id}`} passHref>
                                        <Button
                                            className={classes.button}
                                            variant="outlined"
                                            color="secondary"
                                            size="small"
                                        >
                                            View
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        size="small"
                                        onClick={handleDelete(item.id)}
                                    >
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {!!items && !items.length && (
                            <TableRow>
                                <TableCell colSpan={99} align="center">No data</TableCell>
                            </TableRow>
                        )}
                        {!items && (
                            <TableRow>
                                <TableCell colSpan={99} align="center">Loading...</TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
                <TablePagination
                    component="div"
                    count={data.total}
                    rowsPerPage={data.limit}
                    page={data.page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>

            <Dialog open={deleteDialogOpen} onClose={handleCloseDeleteDialog}>
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent style={{ minWidth: 400 }}>
                    <DialogContentText>
                        Are you sure to delete this product?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteDialog} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirmDelete} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </DefaultLayout>
    );
};

ProductIndexPage.getInitialProps = async (ctx: NextPageContextWithStore) => {
    redirectIfNotAuth(ctx);
    const { query } = ctx;

    const data = await ctx.axios({
        method: 'get',
        url: '/products',
        params: query,
    }).then((response) => response.data);

    return { data };
};

export default ProductIndexPage;
