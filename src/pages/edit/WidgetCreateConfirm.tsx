import React from "react";
import {
  makeStyles,
  Container,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell,
  Box
} from "@material-ui/core";
import { Link, RouteComponentProps } from "react-router-dom";

import ErrorScene from "../../components/ErrorScene";

const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1)
  },
  prevBtn: {
    marginRight: theme.spacing(1)
  },
  formGroup: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  formSubmit: {
    textAlign: "right"
  }
}));

interface RemoconUpdateConfirmProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps<{ remoconId: string }> {
  changePage(id: number): void;
}
const RemoconUpdateConfirm: React.FC<RemoconUpdateConfirmProps> = (
  props: RemoconUpdateConfirmProps
) => {
  const classes = styles();
  const remoconId = props.match.params.remoconId;

  let inputWidgetLabelText = "";
  let inputWidgetIconColor = "";
  let inputWidgetIconStyle = "";
  let selectPosition = null;
  let irPattern = null;
  let isDirectAccess = false;
  if (typeof props.location.state !== "undefined") {
    const propsState = props.location.state;
    inputWidgetLabelText = propsState.inputWidgetLabelText;
    inputWidgetIconColor = propsState.inputWidgetIconColor;
    inputWidgetIconStyle = propsState.inputWidgetIconStyle;
    selectPosition = propsState.selectPosition;
    irPattern = propsState.irPattern;
  } else {
    isDirectAccess = true;
  }

  React.useEffect(() => {
    props.changePage(21202);
  }, []);

  if (isDirectAccess)
    return (
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
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="left" component="th">
                ラベルテキスト
              </TableCell>
              <TableCell align="left">{inputWidgetLabelText}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" component="th">
                アイコンカラー
              </TableCell>
              <TableCell align="left">{inputWidgetIconColor}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" component="th">
                アイコンスタイル
              </TableCell>
              <TableCell align="left">{inputWidgetIconStyle}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" component="th">
                レイアウト
              </TableCell>
              <TableCell align="left">{selectPosition}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" component="th">
                赤外線データ
              </TableCell>
              <TableCell align="left">{irPattern.length}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box className={`${classes.formGroup} ${classes.formSubmit}`}>
          <Button
            className={classes.prevBtn}
            component={Link}
            to={{
              pathname: `/edit/remocons/${remoconId}/widgets/create/input`,
              state: {
                inputWidgetLabelText,
                inputWidgetIconColor,
                inputWidgetIconStyle,
                selectPosition,
                irPattern
              }
            }}
          >
            戻る
          </Button>
          <Button
            component={Link}
            to={{
              pathname: `/edit/remocons/${remoconId}/widgets/create/complete`,
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
            送信
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default RemoconUpdateConfirm;
