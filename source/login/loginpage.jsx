import React, { useState, useEffect } from 'react';
import './loginpage.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function LoginPage({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (event.target.id === 'addAccountModal') {
        setIsModalVisible(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);

    return () => {
      window.removeEventListener('click', handleOutsideClick);
    };
  }, []);

  const handleLogin = async () => {
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      console.log('Login successful', data);

      onLoginSuccess();

    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleModalOpen = () => setIsModalVisible(true);
  const handleModalClose = () => setIsModalVisible(false);
  
  const handleSubmitNewUser = async (event) => {
    event.preventDefault();
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
        }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Success:', data.message);
      setIsModalVisible(false);
    } catch (error) {
        console.error('Error:', error);
    }
  };

  return (
    // Changed from main to div, but not sure if necessary?
    <div id="oldbody">
      <header>
        <h1>mypeoplenotes.com</h1>
      </header>
      <main>
        <div id="login">
          <h2>Login</h2>
          <form>
            <input id="username" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
            <input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
            <button type="button" onClick={handleLogin}>Login</button>
          </form>
          <p>
            Don't have an account? 
            <button id="signupform" style={{background: 'none', color: 'blue', border: 'none', padding: '0 0 0 .3rem', font: 'inherit', cursor: 'pointer', textDecoration: 'underline', display: 'inline', margin: 0, overflow: 'visible'}} onClick={handleModalOpen}>Sign Up</button>
          </p>
          {isModalVisible && (
            <div className="modal" style={{ display: isModalVisible ? 'block' : 'none' }}>
              <div className="modal-content">
                <span className="close" onClick={handleModalClose}>&times;</span>
                <form onSubmit={handleSubmitNewUser}>
                  <div className="modal-sep">
                    <h2>User Info</h2>
                    <input type="text" value={newUsername} onChange={e => setNewUsername(e.target.value)} placeholder="Username" required />
                    <input type="password" value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="Password" required />
                  </div>
                  <div className="modal-sep">
                    <input type="submit" value="Submit" />
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </main>
      <footer>
        <a href="https://github.com/bigballeru/startup">Gabe Ure's Github</a>
      </footer>
    </div>
  );
}

export default LoginPage;
