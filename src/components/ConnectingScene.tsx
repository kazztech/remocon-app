import React from 'react';
import { makeStyles, Container, CircularProgress, Typography } from '@material-ui/core';

const styles = makeStyles(theme => ({
    connectingText: {
        marginTop: theme.spacing(2)
    }
}));

interface ConnectingSceneProps { };
const ConnectingScene: React.FC<ConnectingSceneProps> = (props: ConnectingSceneProps) => {
    const classes = styles();

    return (
        <>
            <CircularProgress />
            <Typography className={classes.connectingText}>送信中...</Typography>
        </>
    );
}

export default ConnectingScene;
