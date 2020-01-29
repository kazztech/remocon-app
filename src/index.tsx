import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import { MuiThemeProvider } from '@material-ui/core';

import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import theme from "./theme";

ReactDOM.render(
    <Router>
        <MuiThemeProvider theme={theme}>
            <App />
        </MuiThemeProvider>
    </Router>,
    document.getElementById('root')
);

serviceWorker.register();
