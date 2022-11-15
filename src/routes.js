import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AnimatedRoutes from './AnimatedRoutes';

export default function rotues(authUser){
    return (
        <React.StrictMode>
          <Router>
            <AnimatedRoutes authUser={authUser}/>
          </Router>
      </React.StrictMode>
    )
}