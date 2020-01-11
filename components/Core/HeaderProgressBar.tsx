import { LinearProgress, makeStyles } from '@material-ui/core';
import clsx from 'clsx';
import React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../store/types';

const useStyles = makeStyles({
    root: {
        position: 'fixed',
        width: '100%',
        zIndex: 1099,
        transition: 'opacity 500ms, visibility 500ms',
        opacity: 0,
        visibility: 'hidden',
    },
    show: {
        opacity: 1,
        visibility: 'visible',
    },
});

type Props = {
    loading: boolean;
};

const HeaderProgressBar: React.FunctionComponent<Props> = (props) => {
    const classes = useStyles(props);
    const { loading } = props;

    const className = clsx([
        classes.root,
        (loading ? classes.show : null),
    ]);
    return <LinearProgress className={className} />;
};

const mapStateToProps = ({ view }: AppState) => ({ loading: view.loading });

export default connect(mapStateToProps)(HeaderProgressBar);
