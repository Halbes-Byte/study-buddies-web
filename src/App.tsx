import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { Routes, Route } from "react-router-dom";
import { customTheme } from "./customTheme";
import React from "react";
import Navbar from "./navbar";

import Calender from './pages/Calendar';
import Homepage from './pages/Homepage';
import Current from './pages/Current';
import Page404 from './pages/Page404';
import Score from './pages/Score';

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline />
            <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
                <Navbar /> 
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/calender" element={<Calender />} />
                    <Route path="/current" element={<Current />} />
                    <Route path="/score" element={<Score />} />
                    <Route path="*" element={<Page404 />} />
                </Routes>

        </ThemeProvider>
    );
}

export default App;

export enum Resources {
    MEETING = "meeting",
}


