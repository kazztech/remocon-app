import React, { useState, useEffect, useMemo } from "react";
import {
  makeStyles,
  Container,
  CircularProgress,
  Typography,
  Box,
  Button
} from "@material-ui/core";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { teal, red } from "@material-ui/core/colors";
import color from "@material-ui/core/colors/yellow";

const styles = makeStyles(theme => ({}));

interface WidgetRemoconProps extends React.Props<{}> {
  handleClick: () => void;
  color: any;
}
const WidgetRemocon: React.StatelessComponent<WidgetRemoconProps> = props => {
  const buttonTheme = createMuiTheme({
    palette: {
      type: "dark",
      primary: props.color
    }
  });
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
    <MuiThemeProvider theme={buttonTheme}>
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
        size="large"
        color="primary"
        disabled={isLoading}
        onClick={handleButtonClick}
      >
        {props.children}
      </Button>
    </MuiThemeProvider>
  );
};

export default WidgetRemocon;
