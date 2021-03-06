import {
    Button, Card, CardActions, CardContent, Divider, Grid, TextField, Typography,
} from '@material-ui/core';
import axios from 'axios';
import Router from 'next/router';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import validate from 'validate.js';
import { openSnackbar } from '../../store/view/actions';
import publicRuntimeConfig from '../../utils/publicRuntimeConfig';
import ImageGroupManger from './ImageGroupMenager';

const { API_URL } = publicRuntimeConfig;

const schema = {
    name: {
        presence: { allowEmpty: false, message: 'is required' },
    },
    quantity: {
        numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 0,
        },
    },
    price: {
        numericality: {
            greaterThanOrEqualTo: 0,
        },
    },
    shipmentDays: {
        numericality: {
            onlyInteger: true,
            greaterThanOrEqualTo: 0,
        },
    },
};

type Props = {
    data?: any;
};

const ProductDetailForm: React.FunctionComponent<Props> = (props) => {
    const dispatch = useDispatch();

    const { data } = props;

    const [errors, setErrors] = useState(undefined);
    const [values, setValues] = useState({
        id: null,
        name: '',
        description: '',
        quantity: 10,
        price: 99,
        shipmentDays: 3,
        images: [],
        ...data,
    });

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
    };

    const setImages = (newImages) => {
        setValues((oldValue) => ({
            ...oldValue,
            images: newImages,
        }));
    };

    const saveData = () => {
        const method = values.id ? 'put' : 'post';
        const url = values.id ? `/products/${values.id}` : '/products';

        dispatch(openSnackbar({
            color: 'info',
            message: 'Saving...',
        }));

        axios({
            method,
            url,
            baseURL: API_URL,
            data: {
                ...values,
                username: values.email,
                password: values.password ? values.password : undefined,
                passwordConfirmation: undefined,
            },
        }).then((response) => {
            const { code, message } = response.data;
            if (code === '00') {
                dispatch(openSnackbar('Save success.'));
                Router.push('/products');
            } else {
                dispatch(openSnackbar({
                    color: 'warning',
                    message: `Save fail: [${code}] ${message}`,
                }));
            }
        }).catch((error) => {
            const { message } = error.response.data;
            dispatch(openSnackbar({
                message: `Save fail: ${message}`,
                color: 'error',
            }));
        });
    };

    const submit = () => {
        const newError = validate(values, schema);
        setErrors(newError);
        if (newError) return;
        saveData();
    };

    const hasError = (field) => !!errors && !!errors[field];
    const errorMessage = (field) => (hasError(field) ? errors[field][0] : null);

    return (
        <>
            <Card>
                <CardContent>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography variant="subtitle1">
                                General
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                error={hasError('name')}
                                fullWidth
                                helperText={errorMessage('name')}
                                label="Name"
                                margin="dense"
                                name="name"
                                onChange={handleChange}
                                required
                                value={values.name || ''}
                                variant="outlined"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <TextField
                                error={hasError('description')}
                                fullWidth
                                helperText={errorMessage('description')}
                                label="Description"
                                margin="dense"
                                name="description"
                                onChange={handleChange}
                                value={values.description || ''}
                                variant="outlined"
                                multiline
                                rows={3}
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography variant="subtitle1">
                                Sales
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={hasError('quantity')}
                                fullWidth
                                helperText={errorMessage('quantity')}
                                label="Quantity"
                                margin="dense"
                                name="quantity"
                                onChange={handleChange}
                                required
                                value={values.quantity}
                                variant="outlined"
                                type="number"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={hasError('price')}
                                fullWidth
                                helperText={errorMessage('price')}
                                label="Price (THB)"
                                margin="dense"
                                name="price"
                                onChange={handleChange}
                                required
                                value={values.price}
                                variant="outlined"
                                type="number"
                            />
                        </Grid>
                        <Grid
                            item
                            md={6}
                            xs={12}
                        >
                            <TextField
                                error={hasError('shipmentDays')}
                                fullWidth
                                helperText={errorMessage('shipmentDays')}
                                label="Shipment days"
                                margin="dense"
                                name="shipmentDays"
                                onChange={handleChange}
                                required
                                value={values.shipmentDays}
                                variant="outlined"
                                type="number"
                            />
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <Typography variant="subtitle1">
                                Images
                            </Typography>
                        </Grid>
                        <Grid
                            item
                            xs={12}
                        >
                            <ImageGroupManger images={values.images} setImages={setImages} />
                        </Grid>
                    </Grid>
                </CardContent>
                <Divider />
                <CardActions>
                    <div className="spacer" />
                    <Button
                        color="primary"
                        variant="contained"
                        onClick={submit}
                    >
                        Save
                    </Button>
                </CardActions>
            </Card>
        </>
    );
};

export default ProductDetailForm;
