import React from 'react';
import { makeStyles, Container, CircularProgress, Typography, Box, Button } from '@material-ui/core';

const styles = makeStyles(theme => ({
    connectingText: {
        marginTop: theme.spacing(1)
    },
    sceneContainer: {
        width: "85%",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    }
}));

interface WidgetRemoconProps extends React.Props<{}> {
    text: string;
};
const WidgetRemocon: React.StatelessComponent<WidgetRemoconProps> = (props) => {
    const classes = styles();

    return (
        <Button
            fullWidth
            color="primary"
            variant="contained"
            style={{
                borderRadius: 0,
                fontSize: 15,
                height: 56,
                padding: "4px",
                lineHeight: 1.5,
                textAlign: "center",
                wordBreak: "break-all"
            }}
        >{props.children}{props.text}</Button>
    );
}

export default WidgetRemocon;
