import React, { useState, useEffect } from 'react';
import HomePage from './homepage/homepage';
import LoginPage from './login/loginpage';

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
    <div>
      {!isLoggedIn ? <LoginPage onLoginSuccess={handleLoginSuccess} /> : <HomePage />}
    </div>
  );
}

export default App;
