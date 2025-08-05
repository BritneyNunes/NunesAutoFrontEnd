import React from "react"
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom'
import './App.css'
import SignUp from "./Components/SignUp.jsx"
import LogInForm from "./Components/LogIn"; 
import Home from "./Components/Home.jsx"
import { use } from "react";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const protectedRoute = ({children}) =>{
    return isAuthenticated ? children : <Navigate to="/" />
  };

  return (
    <Router>
      <div>
        {/* <h1>Welcome</h1> */}
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<LogInForm />} />
          {/* <Route path="" element={<NotFound />} /> */}
        </Routes>
      </div>
    </Router>
  )
}

export default App
