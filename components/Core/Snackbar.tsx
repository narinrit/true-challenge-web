import {
    colors, IconButton, makeStyles, Snackbar, SnackbarContent, Theme,
} from '@material-ui/core';

import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CloseIcon from '@material-ui/icons/Close';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/types';
import { closeSnackbar } from '../../store/view/actions';
import { ViewState } from '../../store/view/types';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

const useStyles = makeStyles((theme: Theme) => ({
    success: {
        backgroundColor: colors.green[600],
    },
    error: {
        backgroundColor: theme.palette.error.dark,
    },
    info: {
        backgroundColor: theme.palette.primary.main,
    },
    warning: {
        backgroundColor: colors.amber[700],
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing(1),
    },
    message: {
        display: 'flex',
        alignItems: 'center',
    },
}));

type Props = {
    view: ViewState;
    closeSnackbarAction: typeof closeSnackbar;
};

const CoreSnackbar: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles(props);
    const { view, closeSnackbarAction } = props;
    const { open, message, color } = view.snackbar;

    const Icon = variantIcon[color];

    const handleClose = () => {
        closeSnackbarAction();
    };

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
        >
            <SnackbarContent
                className={classes[color]}
                aria-describedby="client-snackbar"
                message={(
                    <span id="client-snackbar" className={classes.message}>
                        <Icon className={clsx(classes.icon, classes.iconVariant)} />
                        {message}
                    </span>
                )}
                action={[
                    <IconButton key="close" color="inherit" onClick={handleClose}>
                        <CloseIcon className={classes.icon} />
                    </IconButton>,
                ]}
            />
        </Snackbar>
    );
};

const mapStateToProps = ({ view }: AppState) => ({ view });

const mapDispatchToProps = {
    closeSnackbarAction: closeSnackbar,
};

export default connect(mapStateToProps, mapDispatchToProps)(CoreSnackbar);
