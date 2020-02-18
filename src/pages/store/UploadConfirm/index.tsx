import React, { useState } from "react";
import {
  makeStyles,
  Container,
  TextField,
  Typography,
  Box,
  MenuItem,
  Button,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { Link, RouteComponentProps } from "react-router-dom";

const styles = makeStyles(theme => ({
  container: {
    padding: theme.spacing(1)
  },
  formGroup: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1)
  },
  formSubmit: {
    textAlign: "right"
  }
}));

interface RemoconCreateInputProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps<{ remoconId: string }> {
  changePage(id: number): void;
}
const RemoconCreateInput: React.FC<RemoconCreateInputProps> = (
  props: RemoconCreateInputProps
) => {
  const classes = styles();
  const remoconId = props.match.params.remoconId;

  const remoconName = props.location.state.remoconName;

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
    props.changePage(31003);
  }, []);

  return (
    <>
      <Container className={classes.container}>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell align="left" component="th">
                製造番号
              </TableCell>
              <TableCell align="left">{inputProductId}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="left" component="th">
                リモコン説明
              </TableCell>
              <TableCell align="left">{inputDiscription}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Box className={`${classes.formGroup} ${classes.formSubmit}`}>
          <Button
            className={/*classes.prevBtn*/ ""}
            component={Link}
            to={{
              pathname: `/store/upload/${remoconId}/input`,
              state: { remoconName, inputDiscription, inputProductId }
            }}
          >
            戻る
          </Button>
          <Button
            component={Link}
            to={{
              pathname: `/store/upload/${remoconId}/complete`,
              state: { remoconName, inputDiscription, inputProductId }
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

export default RemoconCreateInput;
