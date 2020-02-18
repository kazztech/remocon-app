import React from "react";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { routeFindById, pathAndParamsMatch } from "../routes";

import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import {
  makeStyles,
  Box,
  Button,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";

const styles = makeStyles(theme => ({
  container: {},
  toolbar: {
    minHeight: 56
  },
  title: {
    flexGrow: 1
  },
  leftFunc: {
    position: "absolute",
    left: theme.spacing(1),
    color: "white",
    minWidth: 0
  },
  prevTitle: {
    fontSize: 13,
    marginLeft: -4
  },
  rightFunc: {
    position: "absolute",
    right: theme.spacing(1)
  }
}));

interface AppHeaderProps
  extends React.HTMLAttributes<HTMLDivElement>,
    RouteComponentProps {
  currentPageId: number;
}

const AppHeader: React.FC<AppHeaderProps> = (props: AppHeaderProps) => {
  const classes = styles();

  const currentPageId = props.currentPageId;
  const route = routeFindById(currentPageId);
  const prevRoute = routeFindById(route.prevId);

  const PrevButton = (props: AppHeaderProps) => {
    const prevPath = pathAndParamsMatch(
      prevRoute.path,
      props.location.pathname
    );
    return (
      <>
        {route.prevId !== null ? (
          <Button
            className={classes.leftFunc}
            onClick={() => {
              props.history.push(prevPath);
            }}
          >
            <ArrowBackIosIcon style={{ fontSize: 20 }} />
            <Box className={classes.prevTitle}>{prevRoute.title}</Box>
          </Button>
        ) : (
          <></>
        )}
      </>
    );
  };

  return (
    <Box className={`${classes.container} ${props.className}`}>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar} variant="regular">
          <PrevButton {...props} />
          <Typography
            style={{ fontWeight: 700 }}
            color="inherit"
            align="center"
            className={classes.title}
          >
            {route.title}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default withRouter(AppHeader);
