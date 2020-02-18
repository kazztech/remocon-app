import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios, { AxiosRequestConfig } from "axios";
import {
  Container,
  ListItem,
  ListItemText,
  List,
  Divider,
  ListItemSecondaryAction,
  IconButton
} from "@material-ui/core";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";

import useStyles from "./useStyles";
import ErrorScene from "../../../components/ErrorScene";
import ConnectingScene from "../../../components/ConnectingScene";
import useApi from "../../../hooks/useApi";

interface RemoconsProps {
  id: number;
  name: string;
  priority: number;
  widgets: {}[];
}

interface BatchProps {
  changePage(id: number): void;
}

function Batch(props: BatchProps) {
  const classes = useStyles();

  // batchesApi
  const {
    response: batchesResponse,
    status: getBatchesStatus,
    getApi: batchGetApi
  } = useApi({ timeoutLimitMs: 5000, offsetTimeMs: 500 });
  const [batches, setBatches] = useState([]);

  // 赤外線送信
  const { getApi: sendIrApi, status: getIrStatus } = useApi({
    timeoutLimitMs: 5000,
    offsetTimeMs: 500
  });

  function irSendApiExec(batchId: number): void {
    sendIrApi(`/batches/${batchId}/ir-send`, "GET");
  }

  useEffect(() => {
    props.changePage(40001);
    batchGetApi("/batches", "GET");
  }, []);

  useEffect(() => {
    if (batchesResponse !== null) {
      setBatches(batchesResponse.data.content.batches);
    }
  }, [batchesResponse]);

  useEffect(() => {
    //
  }, [getIrStatus]);

  return (
    <>
      <Container className={classes.container}>
        {getBatchesStatus === "loading" && (
          <ConnectingScene text={""} {...props} />
        )}
        {getBatchesStatus === "error" && (
          <ErrorScene
            text="通信に失敗しました"
            path={`/edit`}
            btnText="設定画面へ"
            {...props}
          />
        )}
        {getBatchesStatus === "success" && (
          <List>
            <Divider />
            {batches.map((batch: any, index: any) => (
              <React.Fragment key={index}>
                <ListItem
                  alignItems="flex-start"
                  button
                  onClick={() => {
                    irSendApiExec(batch.id);
                  }}
                >
                  <ListItemText
                    primary={batch.name}
                    secondary={
                      <React.Fragment>
                        {batch.widgets.map((widget: any, index: any) => (
                          <React.Fragment key={index}>
                            {`${index + 1}. ${widget.remocon.name} / ${
                              widget.label.text
                            }`}
                            <br />
                          </React.Fragment>
                        ))}
                      </React.Fragment>
                    }
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      edge="end"
                      component={Link}
                      to={`/edit/batches/${batch.id}`}
                    >
                      <InfoOutlinedIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        )}
      </Container>
    </>
  );
}

export default Batch;
