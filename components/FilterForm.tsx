import {
    Button, Input, makeStyles, Paper, Theme, Tooltip,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import clsx from 'clsx';
import Router, { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        marginBottom: theme.spacing(3),
    },
    form: {
        display: 'flex',
    },
    paper: {
        borderRadius: '4px',
        alignItems: 'center',
        padding: theme.spacing(1),
        display: 'flex',
        flexBasis: 420,
        marginRight: theme.spacing(2),
    },
    icon: {
        marginRight: theme.spacing(1),
        color: theme.palette.text.secondary,
    },
    input: {
        flexGrow: 1,
        fontSize: '14px',
        lineHeight: '16px',
        letterSpacing: '-0.05px',
        width: 200,
    },
}));

type Props = {
    disableKeyword?: boolean;
};

const FilterForm: React.FunctionComponent<Props> = (props) => {
    const router = useRouter();
    const classes = useStyles(props);

    const initialValues = {
        q: router.query.q || '',
    } as any;

    const [values, setValues] = useState(initialValues);

    useEffect(() => {
        setValues(router.query);
    }, [router.query]);

    const handleChange = (event) => {
        event.persist();

        setValues((old) => ({
            ...old,
            [event.target.name]:
                event.target.type === 'checkbox'
                    ? event.target.checked
                    : event.target.value,
        }));
    };

    const submit = (event) => {
        event.preventDefault();

        Router.push({
            pathname: Router.pathname,
            query: {
                ...Router.query,
                ...values,
                page: 0,
            },
        });
    };

    return (
        <div className={clsx([classes.root, 'no-line'])}>
            <form className={classes.form} onSubmit={submit}>
                <Tooltip placement="top" arrow title="Keyword">
                    <Paper className={classes.paper}>
                        <SearchIcon className={classes.icon} />
                        <Input
                            className={classes.input}
                            disableUnderline
                            placeholder="Keyword"
                            name="q"
                            value={values.q || ''}
                            onChange={handleChange}
                        />
                    </Paper>
                </Tooltip>

                <div className="spacer" />

                <Button
                    type="submit"
                    color="primary"
                    variant="outlined"
                >
                    Search
                </Button>
            </form>
        </div>
    );
};

export default FilterForm;
