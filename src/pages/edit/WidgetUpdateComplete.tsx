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

interface RemoconCreateConpleteProps
    extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps<{ remoconId: string, widgetId: string }> {
    changePage(id: number): void
};
const RemoconCreateConplete: React.FC<RemoconCreateConpleteProps> = (props: RemoconCreateConpleteProps) => {
    const classes = styles();
    const [scene, setScene] = useState<"connecting" | "error" | "success">("connecting");

    const remoconId = props.match.params.remoconId;
    const widgetId = props.match.params.widgetId;

    let inputWidgetLabelText = "";
    let inputWidgetIconColor = "";
    let inputWidgetIconStyle = "";
    let selectPositionX: number | null = null;
    let selectPositionY: number | null = null;
    let irPattern: number[] | null = null;
    let isDirectAccess = false;
    if (typeof props.location.state !== "undefined") {
        const propsState = props.location.state;
        inputWidgetLabelText = propsState.inputWidgetLabelText;
        inputWidgetIconColor = propsState.inputWidgetIconColor;
        inputWidgetIconStyle = propsState.inputWidgetIconStyle;
        selectPositionX = propsState.selectPosition % 4;
        selectPositionY = Math.floor(propsState.selectPosition / 4);
        irPattern = propsState.irPattern;
    } else {
        isDirectAccess = true;
    }

    React.useEffect(() => {
        props.changePage(21503);
        console.log(irPattern)
        if (!isDirectAccess) {
            Axios.put(`http://192.168.3.200:3000/api/v1/remocons/${remoconId}/widgets/${widgetId}`, {
                label: {
                    text: inputWidgetLabelText,
                    color: "white"
                },
                icon: {
                    style: inputWidgetIconStyle,
                    color: inputWidgetIconColor
                },
                position: {
                    x: selectPositionX,
                    y: selectPositionY
                },
                irPattern: irPattern
            }).then((res) => {
                setTimeout(() => {
                    setScene("success");
                }, 2000);
            }).catch((error) => {
                console.log(error);
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
                        text="ウィジェット追加に失敗しました"
                        path={`/edit/remocons`}
                        btnText="リモコンへ"
                        {...props}
                    />
                )}
                {scene === "success" && (
                    <SuccessScene
                        text="ウィジェット追加が完了しました"
                        path={`/edit/remocons/${remoconId}`}
                        btnText="リモコンへ"
                        {...props}
                    />
                )}
            </Container>
        </>
    );
}

export default RemoconCreateConplete;
