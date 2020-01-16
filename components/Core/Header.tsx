import {
    AppBar,
    Button,
    IconButton,
    ListItemIcon,
    makeStyles,
    Menu,
    MenuItem,
    Theme,
    Toolbar,
    Typography,
} from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import Link from 'next/link';
import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../store/auth/actions';
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
    menuItem: {
        paddingRight: theme.spacing(4),
    },
    listItemIcon: {
        minWidth: theme.spacing(5),
    },
}));

type Props = {
    auth: AuthState;
    setDrawerOpenAction: typeof setDrawerOpen;
    signOutAction: typeof signOut;
};

const Header: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles(props);
    const { auth, setDrawerOpenAction, signOutAction } = props;

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClickMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

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
                        Web admin
                    </Typography>
                </Link>
                <span className="spacer" />
                {auth.isAuth ? (
                    <div>
                        <Button color="inherit" onClick={handleClickMenu}>
                            Hi,
                            {' '}
                            {!!auth.user && auth.user.firstName}
                        </Button>
                        <Menu
                            anchorEl={anchorEl}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'center',
                            }}
                            open={Boolean(anchorEl)}
                            onClose={handleCloseMenu}
                        >
                            <MenuItem
                                className={classes.menuItem}
                                onClick={() => {
                                    handleCloseMenu();
                                    signOutAction();
                                }}
                            >
                                <ListItemIcon className={classes.listItemIcon}>
                                    <ExitToAppIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography>Sign Out</Typography>
                            </MenuItem>
                        </Menu>
                    </div>
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
    signOutAction: signOut,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
