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
import HomeIcon from '@material-ui/icons/Home';
import CategoryIcon from '@material-ui/icons/Category';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Link, { LinkProps } from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { connect } from 'react-redux';
import { signOut } from '../../store/auth/actions';
import { AuthState } from '../../store/auth/types';
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

type Props = {
    auth: AuthState;
    open: boolean;
    setDrawerOpenAction: typeof setDrawerOpen;
    signOutAction: typeof signOut;
};

const CoreDrawer: React.FunctionComponent<Props> = (props) => {
    const router = useRouter();
    const classes = useStyles(props);
    const {
        open, setDrawerOpenAction, signOutAction,
    } = props;

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

    const onClickLink = () => {
        setDrawerOpenAction(false);
    };

    return (
        <Drawer
            className={classes.drawer}
            variant={isMobile ? 'temporary' : 'permanent'}
            classes={{
                paper: classes.drawerPaper,
            }}
            open={open}
            onClose={() => {
                setDrawerOpenAction(false);
            }}
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
                        onClick={signOutAction}
                    >
                        <ListItemIcon className={classes.listItemIcon}>
                            <ExitToAppIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </div>
            </List>
        </Drawer>
    );
};

const mapStateToProps = ({ auth, view }: AppState) => ({ auth, open: view.drawerOpen });

const mapDispatchToProps = {
    setDrawerOpenAction: setDrawerOpen,
    signOutAction: signOut,
};

// @ts-ignore
export default connect(mapStateToProps, mapDispatchToProps)(CoreDrawer);
