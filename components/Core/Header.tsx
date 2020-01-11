import {
    AppBar, Button, IconButton, makeStyles, Theme, Toolbar, Typography,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { AuthState } from '../../store/auth/types';
import { AppState } from '../../store/types';
import { setDrawerOpen } from '../../store/view/actions';
import HeaderProgressBar from './HeaderProgressBar';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        zIndex: theme.zIndex.drawer + 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    title: {
        color: 'white',
    },
}));

type Props = {
    auth: AuthState;
    setDrawerOpenAction: typeof setDrawerOpen;
};

const Header: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles(props);
    const { auth, setDrawerOpenAction } = props;

    return (
        <AppBar position="fixed" className={classes.root} elevation={0}>
            <HeaderProgressBar />
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={() => {
                        setDrawerOpenAction(true);
                    }}
                    className={classes.menuButton}
                >
                    <MenuIcon />
                </IconButton>
                <Link href="/" passHref>
                    <Typography component="a" variant="h4" className={classes.title}>
                        True challenge web admin
                    </Typography>
                </Link>
                <span className="spacer" />
                {auth.isAuth ? (
                    <Button color="inherit">
                        Hi,
                        {' '}
                        {!!auth.user && auth.user.firstName}
                    </Button>
                ) : (
                    <Link href="/sign-in" passHref>
                        <Button color="inherit">Sign In</Button>
                    </Link>
                )}
            </Toolbar>
        </AppBar>
    );
};

const mapStateToProps = ({ auth }: AppState) => ({ auth });

const mapDispatchToProps = {
    setDrawerOpenAction: setDrawerOpen,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
