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
              <Route path="/signUp" element={<Pages.SignUp/>} />
              <Route path="/signIn" element={<Pages.SignIn/>} />
              <Route path="/passwordChange" element={<Pages.PasswordChange/>} />
              <Route path="/profile" element={<Pages.Profile/>} />
              <Route path="/category" element={<Pages.Category/>} />
            </Routes>
          </Router>
      </React.StrictMode>
    )
}