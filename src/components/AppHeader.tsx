import React, { ReactElement, HTMLAttributes } from 'react';
import { Link, withRouter, RouteComponentProps, LinkProps } from 'react-router-dom';
import { routeFindById, routesType, routes, pathAndParamsMatch } from "../routes";

import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { makeStyles, Box, BottomNavigation, BottomNavigationAction, Button, AppBar, Toolbar, Typography } from '@material-ui/core';

const styles = makeStyles(theme => ({
    container: {},
    title: {
        flexGrow: 1,
    },
    leftFunc: {
        position: "absolute",
        left: theme.spacing(1),
        color: "white",
        minWidth: 0
    },
    prevText: {
        fontSize: 13,
    },
    rightFunc: {
        position: "absolute",
        right: theme.spacing(1)
    },
}));

interface AppHeaderProps
    extends React.HTMLAttributes<HTMLDivElement>, RouteComponentProps {
    currentPageId: number
};

const AppHeader: React.FC<AppHeaderProps> = (props: AppHeaderProps) => {
    const classes = styles();

    const currentPageId = props.currentPageId;
    const route = routeFindById(currentPageId);
    const prevRoute = routeFindById(route.prevId);

    const PrevButton = (props: AppHeaderProps) => {
        const prevPath = pathAndParamsMatch(prevRoute.path, props.location.pathname);
        return (
            <>
                {route.prevId !== null ?
                    (
                        <Button
                            className={classes.leftFunc}
                            onClick={() => { props.history.push(prevPath) }}
                        >
                            <ArrowBackIosIcon style={{ fontSize: 22 }} />
                            {prevRoute.title}
                        </Button>
                    ) : (
                        <></>
                    )}
            </>
        );
    };

    return (
        <Box className={`${classes.container} ${props.className}`}>
            <AppBar position="static">
                <Toolbar variant="dense">
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
}

export default withRouter(AppHeader);
