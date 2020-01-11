import {
    Button, colors, makeStyles, TextField, Theme, Typography,
} from '@material-ui/core';
import { NextPage } from 'next';
import Router from 'next/router';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import validate from 'validate.js';
import { signIn } from '../store/auth/actions';
import { NextPageContextWithStore } from '../store/types';
import { openSnackbar } from '../store/view/actions';

const schema = {
    username: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 64,
        },
    },
    password: {
        presence: { allowEmpty: false, message: 'is required' },
        length: {
            maximum: 128,
        },
    },
};

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: '100vh',
    },
    grid: {
        height: '100%',
    },
    content: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    contentBody: {
        flexGrow: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    form: {
        paddingLeft: 100,
        paddingRight: 100,
        paddingBottom: 125,
        flexBasis: 700,
        [theme.breakpoints.down('sm')]: {
            paddingLeft: theme.spacing(2),
            paddingRight: theme.spacing(2),
        },
    },
    title: {
        marginTop: theme.spacing(3),
    },
    failMessage: {
        marginTop: theme.spacing(2),
        color: colors.red[500],
    },
    textField: {
        marginTop: theme.spacing(2),
    },
    signInButton: {
        margin: theme.spacing(2, 0),
    },
}));

type Props = {
    signInAction?: typeof signIn;
    openSnackbarAction?: typeof openSnackbar;
};

const SignInPage: NextPage<Props> = (props) => {
    const classes = useStyles(props);
    const { openSnackbarAction } = props;

    const [formState, setFormState] = useState({
        isValid: false,
        values: {
            username: 'admin',
            password: 'password',
        },
        touched: {},
        errors: {} as any,
    });

    useEffect(() => {
        const errors = validate(formState.values, schema);

        setFormState((oldFormState) => ({
            ...oldFormState,
            isValid: !errors,
            errors: errors || {},
        }));
    }, [formState.values]);

    const handleChange = (event) => {
        event.persist();

        setFormState((oldFormState) => ({
            ...oldFormState,
            values: {
                ...oldFormState.values,
                [event.target.name]:
                    event.target.type === 'checkbox'
                        ? event.target.checked
                        : event.target.value,
            },
            touched: {
                ...oldFormState.touched,
                [event.target.name]: true,
            },
        }));
    };

    const handleSignIn = async (event) => {
        event.preventDefault();

        const isAuth = await props.signInAction(formState.values);
        if (isAuth) {
            Router.push('/');
        } else {
            openSnackbarAction({
                message: 'Username or password is incorrect.',
                color: 'error',
            });
        }
    };

    const hasError = (field) => (!!(formState.touched[field] && formState.errors[field]));
    const errorMessage = (field) => (hasError(field) ? formState.errors[field][0] : null);

    return (
        <div className={classes.root}>
            <div className={classes.content}>
                <div className={classes.contentBody}>
                    <form
                        className={classes.form}
                        onSubmit={handleSignIn}
                    >
                        <Typography
                            className={classes.title}
                            variant="h2"
                        >
                            Sign in
                        </Typography>
                        <TextField
                            className={classes.textField}
                            error={hasError('username')}
                            fullWidth
                            helperText={errorMessage('username')}
                            label="Username"
                            name="username"
                            onChange={handleChange}
                            type="text"
                            value={formState.values.username || ''}
                            variant="outlined"
                        />
                        <TextField
                            className={classes.textField}
                            error={hasError('password')}
                            fullWidth
                            helperText={errorMessage('password')}
                            label="Password"
                            name="password"
                            onChange={handleChange}
                            type="password"
                            value={formState.values.password || ''}
                            variant="outlined"
                        />
                        <Button
                            className={classes.signInButton}
                            color="primary"
                            disabled={!formState.isValid}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                        >
                            Sign in
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

SignInPage.getInitialProps = async ({ store, res }: NextPageContextWithStore) => {
    const { auth } = store.getState();

    if (auth.isAuth) {
        const url = '/';
        if (res) {
            res.writeHead(302, {
                Location: url,
            });
            res.end();
        } else {
            Router.push(url);
        }
    }
    return {};
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
    signInAction: signIn,
    openSnackbarAction: openSnackbar,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(SignInPage);
