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

interface RemoconUpdateInputProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps<{ remoconId: string }> {
  changePage(id: number): void;
}
const RemoconUpdateInput: React.FC<RemoconUpdateInputProps> = (
  props: RemoconUpdateInputProps
) => {
  const classes = styles();
  const remoconId = props.match.params.remoconId;
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
    props.changePage(21201);
  }, []);

  return (
    <>
      <Container className={classes.container}>
        <Box className={classes.formGroup}>
          <TextField
            label="リモコン名"
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
            {[1, 2, 3, 4, 5].map((value, index) => (
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
              pathname: `/edit/remocons/${remoconId}/update/confirm`,
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

export default RemoconUpdateInput;
