import React, { useState, Fragment, useMemo } from "react";
import {
  makeStyles,
  Container,
  Button,
  Typography,
  Grid,
  Divider,
  Dialog,
  DialogContent,
  DialogActions,
  Box
} from "@material-ui/core";
import EditIcon from "@material-ui/icons/Edit";
import ViewModuleIcon from "@material-ui/icons/ViewModule";
import DeleteIcon from "@material-ui/icons/Delete";
import { Link, RouteComponentProps } from "react-router-dom";
import Axios from "axios";

import ErrorScene from "../../components/ErrorScene";
import ConnectingScene from "../../components/ConnectingScene";
import SuccessScene from "../../components/SuccessScene";
import WidgetButton from "../../components/WidgetButton";
import buttonColor from "../../utils/functions/buttonColor";

import { API_BASE_URL } from "../../utils/vars";

const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1)
  },
  remoconTitle: {
    marginTop: theme.spacing(1)
  },
  divider: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2)
  },
  button: {
    width: "100%",
    borderRadius: 0
  },
  editButtonsGrid: {
    marginTop: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1 / 2)
  }
}));

interface RemoconDetailProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps<{ remoconId: string; batchId: string }> {
  changePage(id: number): void;
}
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
  irPattern: number[];
}

interface RemoconType {
  id: number;
  priority: number;
  name: number;
  widgets: WidgetType[];
}

const RemoconDetail: React.FC<RemoconDetailProps> = (
  props: RemoconDetailProps
) => {
  const classes = styles();
  const remoconId = props.match.params.remoconId;
  const batchId = props.match.params.batchId;
  const [apiState, setApiState] = React.useState<
    "connecting" | "error" | "success"
  >("connecting");
  const [remocon, setRemocon] = React.useState<RemoconType | null>(null);

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectWidgetId, setSelectWidgetId] = useState<number | null>(null);

  const [isDecision, setIsDecision] = useState(false);
  const [isDialogCon, setIsDialogCon] = useState<
    "connecting" | "error" | "success"
  >("connecting");

  const sendAddBatchApi = () => {
    Axios.post(`${API_BASE_URL}/batches/${batchId}/add`, {
      widgetId: selectWidgetId
    })
      .then(response => {
        setTimeout(() => {
          setIsDialogCon("success");
        }, 300);
      })
      .catch(error => {
        setIsDialogCon("error");
      });
  };

  const getWidgetLabelText = (): string => {
    if (remocon && typeof remocon !== "undefined") {
      const widget = remocon.widgets.find(w => w.id === selectWidgetId);
      if (typeof widget !== "undefined") {
        return widget.label.text;
      } else {
        return "";
      }
    } else {
      return "";
    }
  };

  React.useEffect(() => {
    props.changePage(22202);

    Axios.get(`${API_BASE_URL}/remocons/${remoconId}`, {
      timeout: 5000
    })
      .then(response => {
        setTimeout(() => {
          setRemocon(response.data.content);
          setApiState("success");
        }, 300);
      })
      .catch(error => {
        setApiState("error");
      });
  }, []);

  const sortedWidgets = useMemo(() => {
    if (remocon === null) return [];
    const maxLength = 64;
    const result = [];
    for (let i = 0; i < maxLength; i++) {
      const r = remocon.widgets.find(
        (widget: WidgetType) => widget.position.y * 4 + widget.position.x === i
      );
      if (typeof r === "undefined") {
        result.push(null);
      } else {
        result.push(r);
      }
    }
    return result;
  }, [remocon]);

  return (
    <>
      <Container className={classes.container}>
        {apiState === "connecting" && <ConnectingScene text={""} {...props} />}
        {apiState === "error" && (
          <ErrorScene
            text="通信に失敗しました"
            path={`/edit`}
            btnText="設定画面へ"
            {...props}
          />
        )}
        {apiState === "success" &&
          typeof remocon !== "undefined" &&
          remocon !== null && (
            <>
              <Typography className={classes.remoconTitle} variant="h5">
                {remocon.name}
              </Typography>
              <Grid container spacing={1} className={classes.editButtonsGrid}>
                {sortedWidgets.map((widget, index) => (
                  <Grid key={index} item xs={3}>
                    {widget !== null ? (
                      <WidgetButton
                        color={buttonColor(widget.icon.color)}
                        handleClick={() => {
                          setSelectWidgetId(widget.id);
                          setIsOpen(true);
                        }}
                      >
                        {widget.label.text}
                      </WidgetButton>
                    ) : (
                      <Button
                        fullWidth
                        style={{
                          borderRadius: 0,
                          fontSize: 15,
                          height: 56,
                          padding: "4px",
                          lineHeight: 1.5,
                          color: "silver"
                        }}
                        size="large"
                        disabled
                      >
                        &nbsp;
                      </Button>
                    )}
                  </Grid>
                ))}
              </Grid>
            </>
          )}
      </Container>

      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        maxWidth="xs"
        aria-labelledby="confirmation-dialog-title"
        open={isOpen}
      >
        {!isDecision ? (
          <Fragment>
            <DialogContent dividers>
              {selectWidgetId && remocon && (
                <Fragment>
                  リモコン: {remocon.name}
                  <br />
                  ウィジェット: {getWidgetLabelText()}
                </Fragment>
              )}
            </DialogContent>
            <DialogActions>
              <Button
                autoFocus
                onClick={() => {
                  setIsOpen(false);
                }}
                color="default"
              >
                戻る
              </Button>
              <Button
                onClick={() => {
                  setIsDecision(true);
                  sendAddBatchApi();
                }}
                color="primary"
                variant="contained"
              >
                決定
              </Button>
            </DialogActions>
          </Fragment>
        ) : (
          <Fragment>
            {isDialogCon === "connecting" && (
              <Box
                style={{
                  width: 260,
                  height: 220
                }}
              >
                <ConnectingScene text={"通信中"} {...props} />
              </Box>
            )}
            {isDialogCon === "error" && (
              <Box
                style={{
                  width: 260,
                  height: 220
                }}
              >
                <ErrorScene
                  text="通信に失敗しました"
                  path={`/edit`}
                  btnText="設定画面へ"
                  {...props}
                />
              </Box>
            )}
            {isDialogCon === "success" && (
              <Box
                style={{
                  width: 260,
                  height: 220
                }}
              >
                <SuccessScene
                  text="完了しました"
                  path={`/edit/batches/${batchId}`}
                  btnText="一括操作へ"
                  {...props}
                />
              </Box>
            )}
          </Fragment>
        )}
      </Dialog>
    </>
  );
};

export default RemoconDetail;
