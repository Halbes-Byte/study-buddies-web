import {CssBaseline, GlobalStyles} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {Routes, Route} from "react-router-dom";
import {customTheme} from "./customTheme";
import React from "react";
import Navbar from "./navbar";

import CalenderPage from './pages/CalendarPage';
import Homepage from './pages/Homepage';
import Settings from './pages/Settings';
import Page404 from './pages/Page404';
import Score from './pages/Score';

function App() {
    return (
        <ThemeProvider theme={customTheme}>
            <CssBaseline/>
            <GlobalStyles styles={{html: {WebkitFontSmoothing: "auto"}}}/>
            <div className="h-screen flex flex-col">
                <Navbar/>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>
                    <Route path="/calender" element={<CalenderPage/>}/>
                    <Route path="/settings" element={<Settings/>}/>
                    <Route path="/score" element={<Score/>}/>
                    <Route path="*" element={<Page404/>}/>
                </Routes>
            </div>
        </ThemeProvider>
    );
}

export default App;

export enum Resources {
    MEETING = "meeting",
}


