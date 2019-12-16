import React from 'react';
import { makeStyles, Container, CircularProgress, Typography, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

const styles = makeStyles(theme => ({
    backBtn: {
        marginTop: 12
    }
}));

interface ConnectingSceneProps {
    text: string;
    path: string;
    btnText: string;
};
const ConnectingScene: React.FC<ConnectingSceneProps> = (props: ConnectingSceneProps) => {
    const classes = styles();

    return (
        <>
            <Typography>{props.text}</Typography>
            <Button
                className={classes.backBtn}
                to={props.path}
                component={Link}
                color="primary"
                variant="contained"
            >{props.btnText}</Button>
        </>
    );
}

export default ConnectingScene;
