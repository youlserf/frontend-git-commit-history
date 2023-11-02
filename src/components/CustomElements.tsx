import styled from 'styled-components';

export const CustomInput = styled.input`
  padding: 10px;
  border: 2px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  color: #555;
  outline: none;

  &:focus {
    border-color: #007bff;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;


export const CustomButton = styled.button`
  padding: 17px 40px;
  border-radius: 50px;
  border: 0;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.05) 0 0 8px;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-size: 15px;
  transition: all 0.5s ease;

  &:hover {
    letter-spacing: 3px;
    background-color: hsl(261, 80%, 48%);
    color: hsl(0, 0%, 100%);
    box-shadow: rgba(93, 24, 220, 0) 0px 7px 29px 0px;
  }

  &:active {
    letter-spacing: 3px;
    background-color: hsl(261, 80%, 48%);
    color: hsl(0, 0%, 100%);
    box-shadow: rgba(93, 24, 220, 0) 0px 0px 0px 0px;
    transform: translateY(10px);
    transition: 100ms;
  }
`;


export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
`;

export const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

export const ErrorMessage = styled.div`
  color: red;
  margin-top: 10px;
  text-align: center;
`;