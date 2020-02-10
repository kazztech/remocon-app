import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Container,
  CircularProgress,
  Typography,
  Box,
  Button
} from "@material-ui/core";

const styles = makeStyles(theme => ({}));

interface WidgetRemoconProps extends React.Props<{}> {
  handleClick: () => void;
}
const WidgetRemocon: React.StatelessComponent<WidgetRemoconProps> = props => {
  const classes = styles();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleButtonClick = () => {
    props.handleClick();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  return (
    <Button
      fullWidth
      style={{
        borderRadius: 0,
        fontSize: 15,
        height: 52,
        padding: "4px",
        lineHeight: 1.5,
        wordBreak: "break-all"
      }}
      variant="contained"
      color="primary"
      size="large"
      disabled={isLoading}
      onClick={handleButtonClick}
    >
      {props.children}
    </Button>
  );
};

export default WidgetRemocon;
