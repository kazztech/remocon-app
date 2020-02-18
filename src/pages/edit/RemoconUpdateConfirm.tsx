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

  let inputRemoconName = "";
  let inputRemoconPriority = "";
  let isDirectAccess = false;
  if (typeof props.location.state !== "undefined") {
    const propsState = props.location.state;
    inputRemoconName = propsState.inputRemoconName;
    inputRemoconPriority = propsState.inputRemoconPriority;
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
          </TableBody>
        </Table>
        <Box className={`${classes.formGroup} ${classes.formSubmit}`}>
          <Button
            className={classes.prevBtn}
            component={Link}
            to={{
              pathname: `/edit/remocons/${remoconId}/update/input`,
              state: {
                inputRemoconName,
                inputRemoconPriority
              }
            }}
          >
            戻る
          </Button>
          <Button
            component={Link}
            to={{
              pathname: `/edit/remocons/${remoconId}/update/complete`,
              state: {
                inputRemoconName,
                inputRemoconPriority
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
