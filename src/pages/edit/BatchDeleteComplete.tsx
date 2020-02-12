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
    RouteComponentProps<{ batchId: string }> {
  changePage(id: number): void;
}
const RemoconCreateConplete: React.FC<RemoconCreateConpleteProps> = (
  props: RemoconCreateConpleteProps
) => {
  const classes = styles();
  const [scene, setScene] = useState<"connecting" | "error" | "success">(
    "connecting"
  );

  const batchId = props.match.params.batchId;

  React.useEffect(() => {
    props.changePage(22302);
    Axios.delete(`http://192.168.3.200:3000/api/v1/batches/${batchId}`)
      .then(res => {
        setTimeout(() => {
          setScene("success");
        }, 2000);
      })
      .catch(error => {
        console.log(error);
        setScene("error");
      });
  }, []);

  return (
    <>
      <Container className={classes.container}>
        {scene === "connecting" && (
          <ConnectingScene text={"送信中..."} {...props} />
        )}
        {scene === "error" && (
          <ErrorScene
            text="通信に失敗しました"
            path={`/edit/batches/${batchId}`}
            btnText="一括操作へ"
            {...props}
          />
        )}
        {scene === "success" && (
          <SuccessScene
            text="一括操作削除が完了しました"
            path={`/edit/batches`}
            btnText="一括操作一覧へ"
            {...props}
          />
        )}
      </Container>
    </>
  );
};

export default RemoconCreateConplete;
