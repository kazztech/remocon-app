import React, { useState } from 'react';
import { makeStyles, Container, Button, Typography, Box, CircularProgress } from '@material-ui/core';
import { Link, RouteComponentProps } from 'react-router-dom';
import Axios from "axios";

import ConnectingScene from "../../components/ConnectingScene";
import ErrorScene from "../../components/ErrorScene";
import SuccessScene from "../../components/SuccessScene";

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
    }
}));

interface RemoconUpdateConpleteProps
    extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<{ remoconId: string }> {
    changePage(id: number): void
};
const RemoconUpdateConplete: React.FC<RemoconUpdateConpleteProps> = (props: RemoconUpdateConpleteProps) => {
    const classes = styles();
    const remoconId = props.match.params.remoconId;
    const [scene, setScene] = useState<"connecting" | "error" | "success">("connecting");

    let inputRemoconName = "";
    let inputRemoconPriority = "";

    let isDirectAccess = false;
    if (typeof props.location.state !== "undefined") {
        const propsState = props.location.state;
        inputRemoconName = propsState.inputRemoconName;
        inputRemoconPriority = propsState.inputRemoconPriority;
    } else {
        isDirectAccess = true;
    }

    React.useEffect(() => {
        props.changePage(21203);
        Axios.get("http://192.168.3.200:3000/api/v1/remocons").then((res) => {
            setTimeout(() => {
                setScene("success");
                console.log(res);
            }, 2000);
        }).catch(() => {
            setScene("error");
        });
    }, []);


    if (isDirectAccess) return (
        <div>Error!</div>
    );
    return (
        <>
            <Container className={classes.container}>
                <Box className={classes.sceneContainer}>
                    {scene === "connecting" && <ConnectingScene {...props} />}
                    {scene === "error" && (
                        <ErrorScene
                            text="リモコン更新に失敗しました"
                            path={`/edit/remocons/${remoconId}`}
                            btnText="リモコンへ"
                            {...props}
                        />
                    )}
                    {scene === "success" && (
                        <SuccessScene
                            text="リモコン更新が完了しました"
                            path={`/edit/remocons/${remoconId}`}
                            btnText="リモコンへ"
                            {...props}
                        />
                    )}
                </Box>
            </Container>
        </>
    );
}

export default RemoconUpdateConplete;
