import {
    Card, CardActionArea, Fab, Grid, makeStyles,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import axios from 'axios';
import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { openSnackbar } from '../../store/view/actions';
import publicRuntimeConfig from '../../utils/publicRuntimeConfig';

const { API_URL } = publicRuntimeConfig;

const useStyles = makeStyles(() => ({
    card: {
        position: 'relative',
        '&:hover $cardContentMenu': {
            display: 'block',
        },
    },
    cardContent: {
        display: 'flex',
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
    },
    cardContentMenu: {
        display: 'none',
        position: 'absolute',
        top: 5,
        right: 5,
    },
    square: {
        flex: '0 0 0px',
        paddingTop: '100%',
    },
    squareContent: {
        flex: '1 0 0px',
        maxWidth: '100%',
    },
    squareImage: {
        width: '100%',
        paddingTop: '100%',
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    },
}));

type Props = {
    classes?: any;
    images: any[];
    setImages: any;
    openSnackbarAction?: typeof openSnackbar;
};

const ImageGroupManger: React.FunctionComponent<Props> = (props) => {
    const { images, setImages, openSnackbarAction } = props;
    const classes = useStyles(props);

    let inputRef = null;

    const uploadFile = (file) => {
        const formData = new FormData();

        formData.append('file', file);

        return axios({
            method: 'post',
            baseURL: API_URL,
            url: '/images/upload',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            data: formData,
        }).then((response) => response.data);
    };

    const handleChangeFile = async () => {
        if (!inputRef.files.length) return;

        openSnackbarAction({
            color: 'info',
            message: 'Uploading...',
        });

        const newImages = [];

        // eslint-disable-next-line no-restricted-syntax
        for await (const file of inputRef.files) {
            const image = await uploadFile(file);
            newImages.push(image);
        }

        setImages([
            ...images,
            ...newImages,
        ]);

        openSnackbarAction('Upload success.');
    };

    const handleDelete = (id) => () => {
        setImages(_.filter(images, (image: any) => image.id !== id));
    };

    return (
        <Grid container spacing={3}>
            {images.map((image) => (
                <Grid
                    key={image}
                    item
                    xs={6}
                    sm={3}
                    md={2}
                >
                    <Card className={classes.card}>
                        <CardActionArea className={classes.cardContent}>
                            <div
                                className={classes.squareImage}
                                style={{
                                    backgroundImage: `url("${image.normalUrl}")`,
                                }}
                            />
                        </CardActionArea>
                        <div className={classes.cardContentMenu}>
                            <Fab
                                size="small"
                                onClick={handleDelete(image.id)}
                            >
                                <DeleteIcon fontSize="small" />
                            </Fab>
                        </div>
                    </Card>
                </Grid>
            ))}

            <Grid
                item
                xs={6}
                sm={3}
                md={2}
            >
                <Card>
                    <CardActionArea
                        className={classes.cardContent}
                        onClick={() => {
                            inputRef.click();
                        }}
                    >
                        <div className={classes.square} />
                        <div className={classes.squareContent}>
                            <AddIcon fontSize="large" color="action" />
                        </div>
                    </CardActionArea>
                </Card>
            </Grid>

            <input
                ref={(c) => {
                    inputRef = c;
                }}
                type="file"
                multiple
                accept="image/*"
                style={{ display: 'none' }}
                onChange={handleChangeFile}
            />
        </Grid>
    );
};

const mapDispatchToProps = {
    openSnackbarAction: openSnackbar,
};

// @ts-ignore
export default connect(null, mapDispatchToProps)(ImageGroupManger);
