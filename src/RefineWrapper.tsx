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
            <Route path="/" element={<Homepage/>}/>
            <Route path="/calendar" element={<Calendar/>}/>
            <Route path="/score" element={<Score/>}/>
            <Route path="/current" element={<Current/>}/>
        </Routes>
    );
}

