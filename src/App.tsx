import React from 'react';
import { Switch, Route } from "react-router-dom";
import { CssBaseline, Container } from "@material-ui/core";
import { makeStyles } from '@material-ui/styles';

import { routes } from "./routes";

import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";

const HEADER_HEIGHT = 56;
const FOOTER_HTIGHT = 56;

const styles = makeStyles(theme => ({
    header: {
        width: "100%",
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 100,
    },
    content: {
        marginTop: HEADER_HEIGHT,
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
    const [currentPageId, setCurrentPageId] = React.useState<number>(0);

    const changePage = (pageid: number) => {
        setCurrentPageId(pageid);
    };

    const renderRoutes = routes.map((route, index) => (
        <Route
            key={index}
            exact
            path={route.path}
            render={(props: any) => (
                <route.component changePage={(id: number) => { changePage(id) }} {...props} />
            )}
        />
    ));

    return (
        <>
            <CssBaseline />
            <AppHeader className={classes.header} currentPageId={currentPageId} />
            <Container className={classes.content} maxWidth="sm">
                <Switch>
                    {renderRoutes}
                </Switch>
            </Container>
            <AppFooter
                className={classes.footer}
                currentPageId={currentPageId}
            />
        </>
    );
}

export default App;
