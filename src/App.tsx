import React from 'react';
import { Switch, Route, Link } from "react-router-dom";
import { Button, Box, CssBaseline, Container } from "@material-ui/core";
import { MuiThemeProvider } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/styles';

import theme from "./theme";
import { routes } from "./routes";

import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

import Controller from "./pages/controller";
import Edit from "./pages/edit";
import Store from "./pages/store";
import Setting from "./pages/setting";
import NotFound from './pages/NotFound';

const HEADER_HEIGHT = 48;
const FOOTER_HTIGHT = 56;

const styles = makeStyles(theme => ({
    header: {
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0
    },
    content: {
        marginBottom: FOOTER_HTIGHT,
        padding: 0
    },
    footer: {
        width: "100%",
        position: "fixed",
        bottom: 0,
        left: 0
    }
}));

const App: React.FC = (props) => {
    const classes = styles();
    const [currentPageId, setCurrentPageId] = React.useState<number>((() => {
        return 1;
    })());

    const changePage = (pageid: number) => {
        setCurrentPageId(pageid);
    };

    return (
        <>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                <AppHeader currentPageId={currentPageId} />
                <Container className={classes.content} maxWidth="sm">
                    <Switch>
                        {routes.map((route, index) => {
                            return (
                                <Route
                                    key={index}
                                    exact
                                    path={route.path}
                                    component={(props: any) => (
                                        <route.component changePage={(id: number) => { changePage(id) }} {...props} />
                                    )}
                                />
                            );
                        })}
                    </Switch>
                </Container>
                <AppFooter
                    className={classes.footer}
                    currentPageId={currentPageId}
                />
            </MuiThemeProvider>
        </>
    );
}

export default App;
