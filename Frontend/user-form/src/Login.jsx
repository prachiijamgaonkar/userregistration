import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { ContactServices } from './ContactServices'; // Ensure correct import

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await ContactServices.login({ email, password });

      if (response.data.httpStatusCode === 200) {
        navigate('/home');
      } else {
        setErrorMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {

      console.error('Error message:', error.message);
      setErrorMessage('An error occurred while logging in. Please try again later.');

    }

  };

  const goToSignup = () => {
    navigate('/signup');
  };

  const handleForgotPassword = () => {
    console.log('Password recovery functionality not implemented yet.');
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>SIGN IN</h2>
        <form onSubmit={handleLogin}>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="input-field">
            <i className="fa fa-user"></i>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-field">
            <i className="fa fa-lock"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="options">
            <label>
              <input type="checkbox" /> Remember me
            </label>
            <button type="button" onClick={handleForgotPassword} className="forgot-password-button px-1">
              Forgot your password?
            </button>
          </div>
          <button type="submit" className="login-button">LOGIN</button>
        </form>
        <button onClick={goToSignup} className="signup-button">SIGN UP</button>
      </div>
    </div>
  );
};

export default Login;
