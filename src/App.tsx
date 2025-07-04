import {CssBaseline, GlobalStyles} from "@mui/material";
import {ThemeProvider} from "@mui/material/styles";
import {Routes, Route} from "react-router-dom";
import {customTheme} from "./customTheme";
import React from "react";
import Navbar from "./components/navbar/Navbar";
import {ReactKeycloakProvider} from '@react-keycloak/web'

import CalenderPage from './pages/CalendarPage';
import Homepage from './pages/Homepage';
import Settings from './pages/YourStudies';
import Page404 from './pages/Page404';
import Score from './pages/Score';
import keycloak from "./auth/Keycloak";

function App() {
    return (
        <ReactKeycloakProvider
            authClient={keycloak}
            initOptions={{onLoad: 'login-required', checkLoginIframe: false}}
            onEvent={(event, error) => {
                if (event === 'onAuthError') {
                    console.error('Authentication Error:', error);
                }
            }}
        >
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
        </ReactKeycloakProvider>
    );
}

export enum Resources {
    MEETING = "meeting",
    USER = "user",
    MODULES = "module",
    CHECKBOX = "checkbox",
    USERGROUP = "studygroup"
}


export default App; 
