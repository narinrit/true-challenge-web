import { Breadcrumbs, makeStyles, Theme } from '@material-ui/core';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.spacing(2),
    },
}));

type Props = {
    items?: any[];
};

const CoreBreadcrumb: React.FunctionComponent<Props> = (props) => {
    const { items = [] } = props;
    const classes = useStyles(props);

    return (
        <Breadcrumbs className={classes.root}>
            <Link href="/">
                <a>Home</a>
            </Link>
            {items.map((item) => (
                <Link
                    key={item.href}
                    href={item.href}
                    as={item.as}
                >
                    <a>{item.text}</a>
                </Link>
            ))}
        </Breadcrumbs>
    );
};

export default CoreBreadcrumb;
