import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import instance from '../../axiosConfig';
import { CustomButton, CustomInput, ErrorMessage, LoginContainer, LoginTitle } from '../CustomElements';

const Login = ({ setIsLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await instance.post('/auth/login', {
        username,
        password,
      });

      if (response.status === 201) {
        const token = response.data.access_token;
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        navigate('/commit-history');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <LoginContainer>
      <LoginTitle>Login</LoginTitle>
      <CustomInput
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <CustomInput
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomButton onClick={handleLogin}>Login</CustomButton>
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </LoginContainer>
  );
};

export default Login;
