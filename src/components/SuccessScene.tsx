import React from "react";
import {
  makeStyles,
  Container,
  CircularProgress,
  Typography,
  Button,
  Box
} from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = makeStyles(theme => ({
  backBtn: {
    marginTop: 12
  },
  sceneContainer: {
    width: "85%",
    textAlign: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
}));

interface ConnectingSceneProps {
  text: string;
  path: string;
  btnText: string;
}
const ConnectingScene: React.FC<ConnectingSceneProps> = (
  props: ConnectingSceneProps
) => {
  const classes = styles();

  return (
    <>
      <Box className={classes.sceneContainer}>
        <Typography>{props.text}</Typography>
        <Button
          className={classes.backBtn}
          to={props.path}
          component={Link}
          color="primary"
          variant="contained"
        >
          {props.btnText}
        </Button>
      </Box>
    </>
  );
};

export default ConnectingScene;
