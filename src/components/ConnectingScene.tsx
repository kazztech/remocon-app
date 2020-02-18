import React from "react";
import {
  makeStyles,
  Container,
  CircularProgress,
  Typography,
  Box
} from "@material-ui/core";

const styles = makeStyles(theme => ({
  connectingText: {
    marginTop: theme.spacing(1)
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
}
const ConnectingScene: React.FC<ConnectingSceneProps> = (
  props: ConnectingSceneProps
) => {
  const classes = styles();

  return (
    <>
      <Box className={classes.sceneContainer}>
        <CircularProgress />
        <Typography className={classes.connectingText}>{props.text}</Typography>
      </Box>
    </>
  );
};

export default ConnectingScene;
