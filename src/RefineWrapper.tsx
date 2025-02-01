import React from 'react';
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Calendar from "./pages/CalendarPage";
import Score from "./pages/Score";
import Settings from "./pages/Settings";
import Page404 from "./pages/Page404";


export default function RefineWrapper() {
    return (
        <CustomRoutes/>
    );
}

function CustomRoutes() {
    return (
        <Routes>
            <Route path="/study-buddies-web/" element={<Homepage/>}/>
            <Route path="/study-buddies-web/calendar" element={<Calendar/>}/>
            <Route path="/study-buddies-web/score" element={<Score/>}/>
            <Route path="/study-buddies-web/current" element={<Settings/>}/>
            <Route path="*" element={<Page404/>}></Route>
        </Routes>
    );
}

