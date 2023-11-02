import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import styled from 'styled-components';

import CommitHistoryComponent from './components/CommitHistory';
import Login from './components/Auth/Login';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  min-width: 100vw;
  position: relative;
  gap: 2px;
`;

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const token = localStorage.getItem('token');

  useEffect(() => {
    if (token) {
      validateToken();
    } else {
      setIsLoggedIn(false);
    }
  }, [token]);

  const validateToken = async () => {
    try {
      const response = await fetch('http://localhost:3031/auth/validate-token', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
      }
    } catch (error) {
      console.error('Error while validating token:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <AppContainer>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route
            path="/commit-history"
            element={
              isLoggedIn ? (
                <CommitHistoryComponent handleLogout={handleLogout} />
              ) : (
                <Navigate to="/" />
              )
            }
          />
        </Routes>
      </BrowserRouter>
    </AppContainer>
  );
}

export default App;
