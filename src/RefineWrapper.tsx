import React from 'react';
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage";
import Calendar from "./pages/Calendar";
import Score from "./pages/Score";
import Current from "./pages/Current";


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
            <Route path="/study-buddies-web/current" element={<Current/>}/>
        </Routes>
    );
}
