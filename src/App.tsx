import { CssBaseline, GlobalStyles } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { HashRouter, Routes, Route } from "react-router-dom";
import { customTheme } from "./customTheme";
import React from "react";
import Navbar from "./navbar";
import RefineWrapper from "./RefineWrapper";

// Seitenkomponenten importieren
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
                    {/* Root Route für Homepage */}
                    <Route path="/" element={<Homepage />} />
                    {/* Definiere die weiteren Routen */}
                    <Route path="/calender" element={<Calender />} />
                    <Route path="/current" element={<Current />} />
                    <Route path="/score" element={<Score />} />
                    {/* Fallback Route für nicht definierte Routen */}
                    <Route path="*" element={<Page404 />} />
                </Routes>

        </ThemeProvider>
    );
}

export default App;

export enum Resources {
    MEETING = "meeting",
}


