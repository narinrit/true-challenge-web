import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme,
    useMediaQuery,
} from '@material-ui/core';
import CategoryIcon from '@material-ui/icons/Category';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import HomeIcon from '@material-ui/icons/Home';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../store/auth/actions';
import { AppState } from '../../store/types';
import { setDrawerOpen } from '../../store/view/actions';

const LinkComponent = React.forwardRef<HTMLAnchorElement, LinkProps>(({ href, children, ...rest }, ref) => (
    <Link href={href}>
        <a ref={ref} {...rest}>
            {children}
        </a>
    </Link>
)) as React.ElementType;

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: '#F4F6F8',
    },
    toolbar: {
        ...theme.mixins.toolbar,
        [theme.breakpoints.down('sm')]: {
            display: 'none',
        },
    },
    listItemRoot: {
        margin: theme.spacing(1, 2),
    },
    listItem: {
        borderRadius: 4,
    },
    listItemIcon: {
        minWidth: 40,
    },
}));

const CoreDrawer: React.FunctionComponent = (props) => {
    const router = useRouter();
    const classes = useStyles(props);
    const dispatch = useDispatch();

    const open = useSelector<AppState, boolean>((state) => state.view.drawerOpen);

    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const items = [];

    items.push({
        text: 'Home',
        href: '/',
        icon: HomeIcon,
    });

    items.push({
        text: 'Products',
        href: '/products',
        icon: CategoryIcon,
    });

    const handleCloseDrawer = () => {
        dispatch(setDrawerOpen(false));
    };

    const onClickLink = () => {
        dispatch(setDrawerOpen(false));
    };

    const handleSignOut = () => {
        dispatch(signOut());
    };

    return (
        <Drawer
            className={classes.drawer}
            variant={isMobile ? 'temporary' : 'permanent'}
            classes={{
                paper: classes.drawerPaper,
            }}
            open={open}
            onClose={handleCloseDrawer}
        >
            <div className={classes.toolbar} />
            {!!items.length && (
                <>
                    <List>
                        {items.map((item) => (
                            <div className={classes.listItemRoot} key={item.href}>
                                <ListItem
                                    className={classes.listItem}
                                    button
                                    component={LinkComponent}
                                    href={item.href}
                                    selected={item.href === router.pathname}
                                    onClick={onClickLink}
                                >
                                    <ListItemIcon className={classes.listItemIcon}>
                                        <item.icon />
                                    </ListItemIcon>
                                    <ListItemText primary={item.text} />
                                </ListItem>
                            </div>
                        ))}
                    </List>
                    <Divider />
                </>
            )}
            <List>
                <div className={classes.listItemRoot}>
                    <ListItem
                        className={classes.listItem}
                        button
                        onClick={handleSignOut}
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Sign Out" />
                    </ListItem>
                </div>
            </List>
        </Drawer>
    );
};

export default CoreDrawer;
