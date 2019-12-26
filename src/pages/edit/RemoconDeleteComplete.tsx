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
    }
}));

interface RemoconDeleteConpleteProps
    extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<{ remoconId: string }> {
    changePage(id: number): void
};
const RemoconDeleteConplete: React.FC<RemoconDeleteConpleteProps> = (props: RemoconDeleteConpleteProps) => {
    const classes = styles();
    const remoconId = props.match.params.remoconId;
    const [scene, setScene] = useState<"connecting" | "error" | "success">("connecting");

    let isDirectAccess = typeof props.location.state === "undefined"

    React.useEffect(() => {
        props.changePage(21302);
        if (!isDirectAccess) {
            Axios.delete(`http://192.168.3.200:3000/api/v1/remocons/${remoconId}`).then((res) => {
                setTimeout(() => {
                    setScene("success");
                }, 2000);
            }).catch(() => {
                setScene("error");
            });
        }
    }, []);


    if (isDirectAccess) return (
        <ErrorScene
            text="アクセス方法が不正です"
            path={`/edit/remocons`}
            btnText="リモコン一覧へ"
            {...props}
        />
    );
    return (
        <>
            <Container className={classes.container}>
                    {scene === "connecting" && (
                        <ConnectingScene text={"送信中..."} {...props} />
                    )}
                    {scene === "error" && (
                        <ErrorScene
                            text="リモコン削除に失敗しました"
                            path={`/edit/remocons`}
                            btnText="リモコン一覧へ"
                            {...props}
                        />
                    )}
                    {scene === "success" && (
                        <SuccessScene
                            text="リモコン削除が完了しました"
                            path={`/edit/remocons`}
                            btnText="リモコン一覧へ"
                            {...props}
                        />
                    )}
            </Container>
        </>
    );
}

export default RemoconDeleteConplete;
