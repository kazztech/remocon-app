import React, { useState } from "react";
import {
  makeStyles,
  Container,
  TextField,
  Typography,
  Box,
  MenuItem,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  CircularProgress,
  Divider
} from "@material-ui/core";
import { Link, RouteComponentProps } from "react-router-dom";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Axios from "axios";
import CheckBoxIcon from "@material-ui/icons/CheckBox";

import WidgetButton from "../../components/WidgetButton";
import buttonColor from "../../utils/functions/buttonColor";
import ConnectingScene from "../../components/ConnectingScene";
import ErrorScene from "../../components/ErrorScene";
import SuccessScene from "../../components/SuccessScene";

import { API_BASE_URL } from "../../utils/vars";

const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1)
  },
  form: {
    marginBottom: theme.spacing(1)
  },
  formSubmit: {
    textAlign: "right"
  }
}));

const LayoutDialog = (props: {
  open: boolean;
  onClose: () => void;
  selectButton: number | null;
  setSelectButton: (position: number | null) => void;
}) => {
  const classes = styles();
  const theme = useTheme();
  const { onClose, open } = props;
  const { selectButton, setSelectButton } = props;

  return (
    <Dialog
      fullScreen={useMediaQuery(theme.breakpoints.down("xs"))}
      open={open}
      keepMounted
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {"レイアウト選択"}
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={1}>
          {Array.from(Array(64).keys()).map((v, i) => (
            <Grid key={i} item xs={3}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                color={v === selectButton ? "primary" : "default"}
                onClick={() => {
                  setSelectButton(v);
                }}
              >
                {v}
              </Button>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const IrReadDialog = (props: {
  open: boolean;
  onClose: () => void;
  irPattern: number[] | null;
  setIrPattern: (irPattern: number[] | null) => void;
}) => {
  const classes = styles();
  const theme = useTheme();
  const { onClose, open } = props;
  const { irPattern, setIrPattern } = props;

  const [scene, setScene] = useState<"connecting" | "error" | "success">(
    "connecting"
  );
  const [isReading, setIsReading] = React.useState(false);

  const handleClose = () => {
    setIsReading(false);
    setScene("connecting");
    onClose();
  };

  const irReadApiSending = () => {
    setIsReading(true);
    setScene("connecting");
    Axios.get(`${API_BASE_URL}/ir-read`, { timeout: 10000 })
      .then(response => {
        setTimeout(() => {
          setIrPattern(response.data.content.irPattern);
          setScene("success");
        }, 300);
      })
      .catch(error => {
        setScene("error");
      });
  };

  return (
    <Dialog
      open={open}
      keepMounted
      disableBackdropClick
      onClose={handleClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title">
        {"赤外線データ受信"}
      </DialogTitle>
      <DialogContent>
        {!isReading && (
          <Button
            onClick={() => {
              irReadApiSending();
            }}
          >
            赤外線受信開始
          </Button>
        )}
        <Box style={{ textAlign: "center" }}>
          {isReading && scene === "connecting" && (
            <>
              <CircularProgress />
              <Typography>送ってね</Typography>
            </>
          )}
          {isReading && scene === "error" && (
            <>
              <Typography>通信エラー</Typography>
              <Button
                onClick={() => {
                  irReadApiSending();
                }}
              >
                再設定
              </Button>
            </>
          )}
          {isReading && scene === "success" && (
            <>
              <Typography>送信完了</Typography>
              <Button
                onClick={() => {
                  irReadApiSending();
                }}
              >
                再設定
              </Button>
            </>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
};

interface WidgetCreateInputProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps<{ remoconId: string }> {
  changePage(id: number): void;
}
const WidgetCreateInput: React.FC<WidgetCreateInputProps> = (
  props: WidgetCreateInputProps
) => {
  const classes = styles();

  const propsState = props.location.state;
  const remoconId = props.match.params.remoconId;

  const [layoutDialogOpen, setLayoutDialogOpen] = React.useState(false);
  const [irReadDialogOpen, setIrReadDialogOpen] = React.useState(false);

  const getPropState = <T extends unknown>(
    propsState: any | undefined,
    property: string,
    defaultValue: T
  ): T => {
    if (typeof propsState === "undefined") return defaultValue;
    if (typeof propsState[property] === "undefined") return defaultValue;
    return propsState[property];
  };

  // 入力値.ラベルテキスト
  const [inputWidgetLabelText, setInputWidgetLabelText] = useState<string>(
    getPropState<string>(propsState, "inputWidgetLabelText", "")
  );
  const handleInputWidgetLabelText = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputWidgetLabelText(e.target.value);
  };

  // 入力値.アイコンカラー
  const [inputWidgetIconColor, setInputWidgetIconColor] = useState<string>(
    getPropState<string>(propsState, "inputWidgetIconColor", "black")
  );
  const handleInputWidgetIconColor = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputWidgetIconColor(e.target.value);
  };

  // 入力値.アイコンスタイル
  const [inputWidgetIconStyle, setInputWidgetIconStyle] = useState<string>(
    getPropState<string>(propsState, "inputWidgetIconColor", "rectangle")
  );
  const handleInputWidgetIconStyle = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputWidgetIconStyle(e.target.value);
  };

  // 入力値.レイアウト設定
  const [selectPosition, setSelectPosition] = React.useState<number | null>(
    getPropState<null | number>(propsState, "selectPosition", null)
  );

  // 入力値.赤外線データ
  const [irPattern, setIrPattern] = React.useState<number[] | null>(
    getPropState<null | number[]>(propsState, "irPattern", null)
  );
  console.log(irPattern);

  React.useEffect(() => {
    props.changePage(21401);
  }, []);

  return (
    <>
      <Container className={classes.container}>
        <Grid className={classes.form} container spacing={2}>
          <Grid item xs={12}>
            <TextField
              label="ラベルテキスト"
              variant="outlined"
              value={inputWidgetLabelText}
              onChange={handleInputWidgetLabelText}
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="アイコンカラー"
              value={inputWidgetIconColor}
              onChange={handleInputWidgetIconColor}
              variant="outlined"
              fullWidth
            >
              {[
                { name: "black", display: "黒色" },
                { name: "red", display: "赤色" },
                { name: "yellow", display: "黄色" },
                { name: "green", display: "緑色" },
                { name: "blue", display: "青色" }
              ].map((value, index) => (
                <MenuItem key={index} value={value.name}>
                  {value.display}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField
              select
              label="アイコンスタイル"
              value={inputWidgetIconStyle}
              onChange={handleInputWidgetIconStyle}
              variant="outlined"
              fullWidth
            >
              {[
                { name: "rectangle", display: "長方形" },
                { name: "circle", display: "円形" }
              ].map((value, index) => (
                <MenuItem key={index} value={value.name}>
                  {value.display}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setLayoutDialogOpen(true);
              }}
            >
              レイアウト設定：
              {selectPosition === null ? "未選択" : selectPosition}
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              fullWidth
              onClick={() => {
                setIrReadDialogOpen(true);
              }}
            >
              赤外線データ：
              {irPattern === null ? (
                "未設定"
              ) : (
                <>
                  設定済
                  <CheckBoxIcon />
                </>
              )}
            </Button>
          </Grid>
          <Grid item xs={12} style={{ textAlign: "center" }}>
            <Divider style={{ margin: "10px 0" }} />
            <Typography variant="caption" display="block" gutterBottom>
              プレビュー
            </Typography>
            <Grid container spacing={1}>
              <Grid item xs={3} style={{ margin: "0 auto" }}>
                <WidgetButton
                  color={buttonColor(inputWidgetIconColor)}
                  handleClick={() => {}}
                >
                  {inputWidgetLabelText}
                </WidgetButton>
              </Grid>
            </Grid>
            <Divider style={{ margin: "10px 0" }} />
          </Grid>
          <Grid item xs={12} className={`${classes.formSubmit}`}>
            <Button
              component={Link}
              to={{
                pathname: `/edit/remocons/${remoconId}/widgets/create/confirm`,
                state: {
                  inputWidgetLabelText,
                  inputWidgetIconColor,
                  inputWidgetIconStyle,
                  selectPosition,
                  irPattern
                }
              }}
              color="primary"
              variant="contained"
            >
              次へ
            </Button>
          </Grid>
        </Grid>
      </Container>
      <LayoutDialog
        onClose={() => {
          setLayoutDialogOpen(false);
        }}
        open={layoutDialogOpen}
        selectButton={selectPosition}
        setSelectButton={position => {
          setSelectPosition(position);
        }}
      />
      <IrReadDialog
        onClose={() => {
          setIrReadDialogOpen(false);
        }}
        open={irReadDialogOpen}
        irPattern={irPattern}
        setIrPattern={irPattern => {
          setIrPattern(irPattern);
        }}
      />
    </>
  );
};

export default WidgetCreateInput;
