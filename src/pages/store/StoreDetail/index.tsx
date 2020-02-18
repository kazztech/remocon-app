import React, { useState, Fragment, useMemo, useCallback } from "react";
import {
  makeStyles,
  Container,
  List,
  Divider,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Typography,
  Grid,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  TextField,
  MenuItem
} from "@material-ui/core";
import { RouteComponentProps } from "react-router";
import GetAppIcon from "@material-ui/icons/GetApp";

import WidgetButton from "../../../components/WidgetButton";
import buttonColor from "../../../utils/functions/buttonColor";
import db from "../../../firebase";
import ConnectingScene from "../../../components/ConnectingScene";
import ErrorScene from "../../../components/ErrorScene";
import { API_BASE_URL } from "../../../utils/vars";
import Axios from "axios";

const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1)
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
  irPattern: number[];
}

interface StoreProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps<{ storeId: string }> {
  changePage(id: number): void;
}
const Store: React.FC<StoreProps> = (props: StoreProps) => {
  const storeId = props.match.params.storeId;
  const classes = styles();
  const [storeConState, setStoreConState] = React.useState<
    "connecting" | "error" | "success"
  >("connecting");
  const [remocon, setRemocon] = useState<any>(null);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogState, setDialogState] = useState<
    "input" | "calling" | "error" | "success"
  >("input");

  const [remoconName, setRemoconName] = useState("");
  const [remoconPriority, setRemoconPriority] = useState("3");

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

  const sendApi = () => {
    Axios.post(`${API_BASE_URL}/remocons/download`, {
      name: remoconName,
      priority: remoconPriority,
      widgets: remocon.widgets
    })
      .then(res => {
        setTimeout(() => {
          setDialogState("success");
        }, 1000);
      })
      .catch(error => {
        setDialogState("error");
      });
  };

  const isDownloadButtonDisabled = useMemo(() => {
    return !(1 <= remoconName.length && remoconName.length <= 6);
  }, [remoconName, remoconPriority]);

  React.useEffect(() => {
    props.changePage(30002);
    db.doc(storeId)
      .get()
      .then(d => {
        setTimeout(() => {
          setRemocon(d.data());
          console.log(d.data());
          setStoreConState("success");
        }, 300);
      })
      .catch(error => {
        setStoreConState("error");
      });
  }, []);

  return (
    <>
      <Container className={classes.container}>
        {storeConState === "connecting" && (
          <ConnectingScene text={""} {...props} />
        )}
        {storeConState === "error" && (
          <ErrorScene
            text="通信に失敗しました"
            path={`/edit`}
            btnText="設定画面へ"
            {...props}
          />
        )}
        {storeConState === "success" && (
          <>
            <Grid container spacing={1} className={classes.editButtonsGrid}>
              <Grid item xs={12}>
                <Typography variant="h5">{remocon.productId}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {remocon.description}
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ textAlign: "right" }}>
                <Button
                  color="primary"
                  variant="contained"
                  size="small"
                  style={{ marginTop: 4, marginBottom: 4 }}
                  onClick={() => {
                    setIsDialogOpen(true);
                  }}
                >
                  &nbsp;{"ダウンロード"}
                  <GetAppIcon />
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Divider style={{ marginBottom: 8 }} />
                <Typography variant="body2" color="textSecondary">
                  ウィジェット一覧
                </Typography>
              </Grid>
              {sortedWidgets.map((widget, index) => (
                <Grid key={index} item xs={3}>
                  {widget !== null ? (
                    <WidgetButton
                      color={buttonColor(widget.icon.color)}
                      handleClick={() => {}}
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
        open={isDialogOpen}
        onClose={() => {
          setIsDialogOpen(false);
        }}
      >
        <DialogTitle>リモコンダウンロード</DialogTitle>
        {dialogState === "input" && (
          <>
            <DialogContent>
              <DialogContentText variant="body2">
                任意のリモコンの表示名と表示優先度を入力してください。
              </DialogContentText>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    label="登録リモコン名"
                    variant="outlined"
                    value={remoconName}
                    onChange={e => setRemoconName(e.target.value)}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    select
                    label="表示優先度"
                    value={remoconPriority}
                    onChange={e => setRemoconPriority(e.target.value)}
                    variant="outlined"
                    fullWidth
                  >
                    {[...Array(5)]
                      .map((_, index) => index + 1)
                      .map((value, index) => (
                        <MenuItem key={index} value={value}>
                          {value}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setIsDialogOpen(false);
                }}
                color="primary"
              >
                閉じる
              </Button>
              <Button
                onClick={() => {
                  setDialogState("calling");
                  sendApi();
                }}
                color="primary"
                autoFocus
                variant="contained"
                disabled={isDownloadButtonDisabled}
              >
                ダウンロード開始
              </Button>
            </DialogActions>
          </>
        )}
        {dialogState === "calling" && (
          <>
            <DialogContent style={{ textAlign: "center", margin: "16px 0" }}>
              <CircularProgress style={{ marginBottom: 4 }} />
              <Typography color="textSecondary">ダウンロード中</Typography>
            </DialogContent>
          </>
        )}
        {dialogState === "success" && (
          <>
            <DialogContent style={{ textAlign: "center" }}>
              <Typography color="textSecondary">ダウンロード完了</Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setIsDialogOpen(false);
                }}
                color="primary"
              >
                閉じる
              </Button>
            </DialogActions>
          </>
        )}
        {dialogState === "error" && (
          <>
            <DialogContent style={{ textAlign: "center" }}>
              <Typography color="textSecondary">
                ダウンロードに失敗しました。
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  setIsDialogOpen(false);
                }}
                color="primary"
              >
                閉じる
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default Store;
