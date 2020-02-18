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

interface RemoconDeleteConfirmProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps<{ remoconId: string }> {
  changePage(id: number): void;
}
const RemoconDeleteConfirm: React.FC<RemoconDeleteConfirmProps> = (
  props: RemoconDeleteConfirmProps
) => {
  React.useEffect(() => {
    props.changePage(21301);
  }, []);

  const classes = styles();
  const remoconId = props.match.params.remoconId;

  let inputRemoconName = "";
  let inputRemoconPriority = "";
  let widgetCount = 0;
  let isDirectAccess = false;
  if (typeof props.location.state !== "undefined") {
    const propsState = props.location.state;
    inputRemoconName = propsState.inputRemoconName;
    inputRemoconPriority = propsState.inputRemoconPriority;
    widgetCount = propsState.widgetCount;
  } else {
    isDirectAccess = true;
  }

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
                リモコン名
              </TableCell>
              <TableCell align="left">{inputRemoconName}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" component="th">
                表示優先度
              </TableCell>
              <TableCell align="left">{inputRemoconPriority}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" component="th">
                ウィジェット数
              </TableCell>
              <TableCell align="left">{widgetCount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box className={`${classes.formGroup} ${classes.formSubmit}`}>
          <Button
            component={Link}
            to={{
              pathname: `/edit/remocons/${remoconId}/delete/complete`,
              state: {}
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

export default RemoconDeleteConfirm;
