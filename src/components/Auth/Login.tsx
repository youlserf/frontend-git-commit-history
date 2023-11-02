import { useState } from 'react';
import instance from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { CustomButton, CustomInput } from '../CustomElements';


const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;


const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;



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
        // Store the token in localStorage or state
        // Redirect to the next view or route
        localStorage.setItem('token', token);
        setIsLoggedIn(true);
        navigate('/commit-history');
      }
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "5px"
    }}>
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
    </div>
  );
};

export default Login;
