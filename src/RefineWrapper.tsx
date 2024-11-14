import React from 'react';
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Kalender from "./pages/Kalender";
import Score from "./pages/Score";
import Aktuelles from "./pages/Aktuelles";


export default function RefineWrapper() {
    return (
                <CustomRoutes />
    );
}
function CustomRoutes() {
    return (
        <Routes>
        
        <Route path="/pages/homepage" element={<Homepage />} />
        <Route path="/pages/kalender" element={<Kalender />} />
        <Route path="/pages/score" element={<Score />} />
        <Route path="/pages/aktuelles" element={<Aktuelles />} />
    
       
    </Routes>
           
    );
}

