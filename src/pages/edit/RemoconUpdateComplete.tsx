import React, { useState } from 'react';
import { makeStyles, Container, Button, Typography, Box, CircularProgress } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';
import Axios from "axios";

const styles = makeStyles(theme => ({
    container: {
        padding: theme.spacing(1)
    },
    sceneContainer: {
        width: "85%",
        textAlign: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    backBtn: {
        marginTop: 12
    },
    connectingText: {
        marginTop: 8
    }
}));

interface RemoconUpdateConpleteProps
    extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<{ remoconId: string }> {
    changePage(id: number): void
};
const RemoconUpdateConplete: React.FC<RemoconUpdateConpleteProps> = (props: RemoconUpdateConpleteProps) => {
    React.useEffect(() => {
        props.changePage(21203);

        Axios.get("http://localhost:3000").then(() => {
            setTimeout(() => {
                setScene("success");
            }, 2000);
        }).catch(() => {
            setScene("error");
        });
    }, []);

    const classes = styles();
    const remoconId = props.match.params.remoconId;

    const [scene, setScene] = useState<"connecting" | "error" | "success">("connecting");

    let inputRemoconName = "";
    let inputRemoconPriority = "";
    if (typeof props.location.state !== "undefined") {
        const propsState = props.location.state;
        inputRemoconName = propsState.inputRemoconName;
        inputRemoconPriority = propsState.inputRemoconPriority;
    } else {
        return (<div>Error!</div>);
    }

    const ConnectingScene = (props: RemoconUpdateConpleteProps) => {
        return (
            <>
                <CircularProgress />
                <Typography className={classes.connectingText}>送信中...</Typography>
            </>
        );
    }

    const ErrorScene = (props: RemoconUpdateConpleteProps) => {
        return (
            <>
                <Typography>送信に失敗しました</Typography>
                <Button
                    className={classes.backBtn}
                    to={`/edit/remocons/${remoconId}`}
                    component={Link}
                    color="primary"
                    variant="contained"
                >戻る</Button>
            </>
        );
    }

    const SuccessScene = (props: RemoconUpdateConpleteProps) => {
        return (
            <>
                <Typography>送信が完了しました</Typography>
                <Button
                    className={classes.backBtn}
                    to={`/edit/remocons/${remoconId}`}
                    component={Link}
                    color="primary"
                    variant="contained"
                >戻る</Button>
            </>
        );
    }

    return (
        <>
            <Container className={classes.container}>
                <Box className={classes.sceneContainer}>
                    {scene === "connecting" && <ConnectingScene {...props} />}
                    {scene === "error" && <ErrorScene {...props} />}
                    {scene === "success" && <SuccessScene {...props} />}
                </Box>
            </Container>
        </>
    );
}

export default RemoconUpdateConplete;
