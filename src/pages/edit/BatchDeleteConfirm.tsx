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

interface RemoconCreateConfirmProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps<{ batchId: string }> {
  changePage(id: number): void;
}
const RemoconCreateConfirm: React.FC<RemoconCreateConfirmProps> = (
  props: RemoconCreateConfirmProps
) => {
  const classes = styles();
  const batchId = props.match.params.batchId;

  let batchName = "";
  let batchPriority = 3;
  let batchWidgetCount = 0;
  let isDirectAccess = false;

  if (typeof props.location.state !== "undefined") {
    const propsState = props.location.state;
    batchName = propsState.batchName;
    batchPriority = propsState.batchPriority;
    batchWidgetCount = propsState.batchWidgetCount;
  } else {
    isDirectAccess = true;
  }

  React.useEffect(() => {
    props.changePage(22301);
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
                一括操作名
              </TableCell>
              <TableCell align="left">{batchName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" component="th">
                表示優先度
              </TableCell>
              <TableCell align="left">{batchPriority}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" component="th">
                操作数
              </TableCell>
              <TableCell align="left">{batchWidgetCount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box className={`${classes.formGroup} ${classes.formSubmit}`}>
          <Button
            className={classes.prevBtn}
            component={Link}
            to={{
              pathname: `/edit/batches/${batchId}`,
              state: {
                batchName,
                batchPriority,
                batchWidgetCount
              }
            }}
          >
            戻る
          </Button>
          <Button
            component={Link}
            to={{
              pathname: `/edit/batches/${batchId}/delete/complete`
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

export default RemoconCreateConfirm;
