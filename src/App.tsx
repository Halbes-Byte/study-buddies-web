import {CssBaseline, GlobalStyles} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import RefineWrapper from "./RefineWrapper";
import {BrowserRouter} from "react-router-dom";
import {customTheme} from "./customTheme";
import React from 'react';
import Navbar from './navbar';

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <GlobalStyles styles={{html: {WebkitFontSmoothing: "auto"}}}/>
            <BrowserRouter>
                <Navbar/>
                <RefineWrapper/>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
