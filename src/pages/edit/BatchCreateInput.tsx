import React, { useState } from "react";
import {
  makeStyles,
  Container,
  TextField,
  Typography,
  Box,
  MenuItem,
  Button
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

  const propsState = props.location.state;

  // 入力値.リモコン名
  const [inputRemoconName, setInputRemoconName] = useState<string>(
    typeof propsState !== "undefined" ? propsState.inputRemoconName : ""
  );
  const handleInputRemoconName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputRemoconName(e.target.value);
  };

  // 入力値.表示優先度
  const [inputRemoconPriority, setInputRemoconPriority] = useState<string>(
    typeof propsState !== "undefined" ? propsState.inputRemoconPriority : "3"
  );
  const handleInputRemoconPriority = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputRemoconPriority(e.target.value);
  };

  React.useEffect(() => {
    props.changePage(22101);
  }, []);

  return (
    <>
      <Container className={classes.container}>
        <Box className={classes.formGroup}>
          <TextField
            label="一括操作名"
            variant="outlined"
            value={inputRemoconName}
            onChange={handleInputRemoconName}
            fullWidth
          />
        </Box>
        <Box className={classes.formGroup}>
          <TextField
            select
            label="表示優先度"
            value={inputRemoconPriority}
            onChange={handleInputRemoconPriority}
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
        </Box>
        <Box className={`${classes.formGroup} ${classes.formSubmit}`}>
          <Button
            component={Link}
            to={{
              pathname: `/edit/batches/create/confirm`,
              state: {
                inputRemoconName,
                inputRemoconPriority
              }
            }}
            color="primary"
            variant="contained"
          >
            次へ
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default RemoconCreateInput;
