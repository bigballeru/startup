import React, { useState, useEffect } from 'react';
import HomePage from './homepage/homepage';
import LoginPage from './login/loginpage';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

function App() {
  // Initializes isLoggedIn based on sessionStorage
  // Uses sessionStorage to keep track if they stay logged in through reloads
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionStorage.getItem('isLoggedIn') === 'true'
  );

  useEffect(() => {
    // Update sessionStorage when isLoggedIn changes in LoginPage
    sessionStorage.setItem('isLoggedIn', isLoggedIn);
  }, [isLoggedIn]);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={!isLoggedIn ? <LoginPage onLoginSuccess={handleLoginSuccess} /> : <Navigate to="/" replace />} />
        <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
