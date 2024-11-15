import React from 'react';
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Calendar from "./pages/Calendar";
import Score from "./pages/Score";
import Current from "./pages/Current";


export default function RefineWrapper() {
    return (
                <CustomRoutes />
    );
}
function CustomRoutes() {
    return (
        <Routes>
        
        <Route path="/pages/homepage" element={<Homepage />} />
        <Route path="/pages/calendar" element={<Calendar />} />
        <Route path="/pages/score" element={<Score />} />
        <Route path="/pages/current" element={<Current />} />
    
       
    </Routes>
           
    );
}

