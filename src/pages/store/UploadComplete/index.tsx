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

import db from "../../../firebase";
import ConnectingScene from "../../../components/ConnectingScene";
import ErrorScene from "../../../components/ErrorScene";
import SuccessScene from "../../../components/SuccessScene";

import { API_BASE_URL } from "../../../utils/vars";

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
  const remoconId = props.match.params.remoconId;

  const [scene, setScene] = useState<"connecting" | "error" | "success">(
    "connecting"
  );

  const getPropState = <T extends unknown>(
    propsState: any | undefined,
    property: string,
    defaultValue: T
  ): T => {
    if (typeof propsState === "undefined") return defaultValue;
    if (typeof propsState[property] === "undefined") return defaultValue;
    return propsState[property];
  };

  // 入力値.製品番号
  const inputProductId = getPropState<string>(
    props.location.state,
    "inputProductId",
    ""
  );
  // 入力値.リモコン説明
  const inputDiscription = getPropState<string>(
    props.location.state,
    "inputDiscription",
    ""
  );

  React.useEffect(() => {
    props.changePage(31004);
    setScene("connecting");
    Axios.get(`${API_BASE_URL}/remocons/${remoconId}`)
      .then(response => {
        db.add({
          productId: inputProductId,
          description: inputDiscription,
          widgets: response.data.content.widgets
        })
          .then(() => {
            setTimeout(() => {
              setScene("success");
            }, 500);
          })
          .catch(() => {
            setScene("error");
          });
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
            text="ウィジェット追加に失敗しました"
            path={`/edit/remocons`}
            btnText="リモコンへ"
            {...props}
          />
        )}
        {scene === "success" && (
          <SuccessScene
            text="ウィジェット追加が完了しました"
            path={`/edit/remocons`}
            btnText="リモコンへ"
            {...props}
          />
        )}
      </Container>
    </>
  );
};

export default RemoconCreateConplete;
