import React from 'react';
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";


export default function RefineWrapper() {
    return (
                <CustomRoutes />
    );
}
function CustomRoutes() {
    return (
        <Routes>
            <Route>
                <Route path="/study-buddies-web">
                    <Route path="/study-buddies-web">
                        <Route index element={<Homepage />} />
                    </Route>
                </Route>
            </Route>
        </Routes>
    );
}

