import { makeStyles, Theme } from '@material-ui/core';
import React from 'react';
import Breadcrumb from '../Core/Breadcrumb';
import Drawer from '../Core/Drawer';
import Header from '../Core/Header';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    toolbar: theme.mixins.toolbar,
}));

type Props = {
    classes?: any;
    children?: any;
    breadcrumbs?: any[];
};

const DefaultLayout: React.FunctionComponent<Props> = (props) => {
    const { children, breadcrumbs } = props;
    const classes = useStyles(props);

    return (
        <div className={classes.root}>
            <Header />
            <Drawer />
            <div className={classes.content}>
                <div className={classes.toolbar} />

                <Breadcrumb items={breadcrumbs} />

                {children}
            </div>
        </div>
    );
};

export default DefaultLayout;
