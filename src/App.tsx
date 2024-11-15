import {CssBaseline, GlobalStyles} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import RefineWrapper from "./RefineWrapper";
import { HashRouter} from "react-router-dom";
import {customTheme} from "./customTheme";
import React from 'react';
import Navbar from './navbar';

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <GlobalStyles styles={{html: {WebkitFontSmoothing: "auto"}}}/>
            <HashRouter>
                <Navbar/>
                <RefineWrapper/>
            </HashRouter>
        </ThemeProvider>
    );
}

export default App;
