import React, { useState, useEffect } from 'react';
import HomePage from './homepage/homepage';
import LoginPage from './login/loginpage';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';

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
      <div>
        <Route path="/login">
          {isLoggedIn ? <Redirect to="/" /> : <LoginPage onLoginSuccess={handleLoginSuccess} />}
        </Route>
        <Route exact path="/">
          {isLoggedIn ? <HomePage /> : <Redirect to="/login" />}
        </Route>
      </div>
    </BrowserRouter>
  );
}

export default App;
