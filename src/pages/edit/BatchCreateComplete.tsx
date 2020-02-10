import React, { useState } from "react";
import {
  makeStyles,
  Container,
  Button,
  Typography,
  Box,
  CircularProgress
} from "@material-ui/core";
import { Link, RouteComponentProps } from "react-router-dom";
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
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps<{ remoconId: string }> {
  changePage(id: number): void;
}
const RemoconCreateConplete: React.FC<RemoconCreateConpleteProps> = (
  props: RemoconCreateConpleteProps
) => {
  const classes = styles();
  const [remoconId, setRemoconId] = React.useState(1);
  const [scene, setScene] = useState<"connecting" | "error" | "success">(
    "connecting"
  );

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
    props.changePage(21103);
    if (!isDirectAccess) {
      Axios.post(`http://192.168.3.200:3000/api/v1/batches`, {
        name: inputRemoconName,
        priority: inputRemoconPriority
      })
        .then(res => {
          setRemoconId(res.data.content.id);
          setTimeout(() => {
            setScene("success");
          }, 2000);
        })
        .catch(() => {
          setScene("error");
        });
    }
  }, []);

  if (isDirectAccess) {
    return (
      <ErrorScene
        text="アクセス方法が不正です"
        path={`/edit/remocons`}
        btnText="リモコン一覧へ"
        {...props}
      />
    );
  }
  return (
    <>
      <Container className={classes.container}>
        {scene === "connecting" && (
          <ConnectingScene text={"送信中..."} {...props} />
        )}
        {scene === "error" && (
          <ErrorScene
            text="通信に失敗しました"
            path={`/edit/remocons`}
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
      </Container>
    </>
  );
};

export default RemoconCreateConplete;
