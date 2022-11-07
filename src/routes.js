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
              <Route path="/category_add" element={<Pages.Category_Add/>} />
              <Route path="/category_edit" element={<Pages.Category_Edit/>} />
              <Route path="/search" element={<Pages.Search/>} />
              <Route path="/otheruser" element={<Pages.OtherUser/>} />
              <Route path="/followlist" element={<Pages.FollowList/>} />
            </Routes>
          </Router>
      </React.StrictMode>
    )
}