import React, { useState, useEffect, useMemo } from "react";
import {
  makeStyles,
  Container,
  Button,
  Grid,
  Box,
  Divider,
  Theme,
  Fab
} from "@material-ui/core";

import useApi from "../../hooks/useApi";
import WidgetButton from "../../components/WidgetButton";
import ErrorScene from "../../components/ErrorScene";
import ConnectingScene from "../../components/ConnectingScene";

const styles = makeStyles((theme: Theme) => ({
  container: {
    padding: theme.spacing(1)
  },
  widgetsContainer: {
    marginTop: theme.spacing(1),
    marginBottom: 78
  },
  remoconChipsContainer: {
    width: "100%",
    position: "fixed",
    bottom: 56,
    left: 0,
    backgroundColor: "#303030"
  },
  remoconChipsInner: {
    maxWidth: 586,
    margin: "0 auto",
    padding: `0 ${theme.spacing(1)}px`,
    overflowX: "scroll",
    whiteSpace: "nowrap"
  },
  remoconChip: {
    display: "inline-block",
    margin: `12px 4px`
  }
}));

interface WidgetType {
  id: number;
  label: {
    text: string;
    color: string;
  };
  icon: {
    style: string;
    color: string;
  };
  position: {
    x: number;
    y: number;
  };
}

interface RemoconType {
  id: number;
  priority: number;
  name: number;
  widgets: WidgetType[];
}

interface ControllerProps {
  changePage(id: number): void;
}
const Controller: React.FC<ControllerProps> = (props: ControllerProps) => {
  const classes = styles();

  const {
    response: remoconsResponse,
    status: getRemoconsStatus,
    getApi: getRemoconApi
  } = useApi({ timeoutLimitMs: 5000, offsetTimeMs: 500 });
  const [remocons, setRemocons] = useState<RemoconType[]>([]);
  const [selectRemoconIndex, setSelectRemoconIndex] = React.useState<number>(0);

  const { getApi: getSendIrApi, status: sendIrStatus } = useApi({
    timeoutLimitMs: 5000,
    offsetTimeMs: 500
  });

  const sendIrApi = (widgetId: number) => {
    getSendIrApi(
      `http://192.168.3.200:3000/api/v1/widgets/${widgetId}/ir-send`,
      "GET"
    );
  };

  const sortedWidgets = useMemo(() => {
    if (remocons.length === 0) return [];
    console.log("AAAA");
    const maxLength = Math.max.apply(
      null,
      remocons[selectRemoconIndex].widgets.map(
        (widget: WidgetType) => widget.position.y * 4 + widget.position.x
      )
    );
    const result = [];
    for (let i = 0; i < maxLength + 1; i++) {
      const r = remocons[selectRemoconIndex].widgets.find(
        widget => widget.position.y * 4 + widget.position.x === i
      );
      if (typeof r === "undefined") {
        result.push(null);
      } else {
        result.push(r);
      }
    }
    return result;
  }, [remocons, selectRemoconIndex]);

  useEffect(() => {
    props.changePage(10001);
    getRemoconApi(`http://192.168.3.200:3000/api/v1/remocons`, "GET");
  }, []);

  useEffect(() => {
    if (remoconsResponse !== null) {
      setRemocons(remoconsResponse.data.content.remocons);
    }
  }, [remoconsResponse]);

  useEffect(() => {
    if (sendIrStatus === "error") {
      console.error("ERROR");
    }
    if (sendIrStatus === "success") {
      console.log("SUCCESS");
    }
  }, [sendIrStatus]);

  return (
    <>
      <Container className={classes.container}>
        {getRemoconsStatus === "loading" && (
          <ConnectingScene text={""} {...props} />
        )}
        {getRemoconsStatus === "error" && (
          <ErrorScene
            text="通信に失敗しました"
            path={`/edit`}
            btnText="設定画面へ"
            {...props}
          />
        )}
        {getRemoconsStatus === "success" && (
          <>
            <Box className={classes.widgetsContainer}>
              <Grid container spacing={1}>
                {sortedWidgets.map((widget, index) => (
                  <Grid key={index} item xs={3}>
                    {widget !== null ? (
                      <WidgetButton
                        handleClick={() => {
                          sendIrApi(widget.id);
                        }}
                      >
                        {widget.label.text}
                      </WidgetButton>
                    ) : (
                      <Button
                        fullWidth
                        disabled
                        style={{
                          borderRadius: 0
                        }}
                        size="large"
                      >
                        &nbsp;
                      </Button>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Box>
            <Box className={classes.remoconChipsContainer}>
              <Divider />
              <Box className={classes.remoconChipsInner}>
                {remocons.map((remocon, index) => (
                  <Fab
                    key={index}
                    className={classes.remoconChip}
                    variant="extended"
                    size="medium"
                    color={selectRemoconIndex === index ? "primary" : "default"}
                    onClick={() => {
                      setSelectRemoconIndex(index);
                    }}
                  >
                    {remocon.name}
                  </Fab>
                ))}
              </Box>
            </Box>
          </>
        )}
      </Container>
    </>
  );
};

export default Controller;
