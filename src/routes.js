import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Pages from "./pages";

export default function rotues(){
    return (
        <React.StrictMode>
          <Router>
            <Routes>
              <Route path="/" element={<Pages.Todo/>} />
              <Route path="/home" element={<Pages.Home/>} />
              <Route path="/SignUp" element={<Pages.SignUp/>} />
              <Route path="/SignIn" element={<Pages.SignIn/>} />
            </Routes>
          </Router>
      </React.StrictMode>
    )
}