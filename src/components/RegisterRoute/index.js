import React, { useState } from 'react';
import Cookies from 'js-cookie';
import { FaRegUserCircle } from 'react-icons/fa';
import { CiLock } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import './index.css';

const RegisterRoute = ({ history }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); 
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => setShowPassword(prev => !prev);

  const submitSuccess = () => {
    history.replace('/login'); 
  };

  const submitFailure = errorMsg => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitRegisterForm = async event => {
    event.preventDefault();
    const userDetails = { username, email, password, role };
    const apiUrl = 'https://clawlaw-be-jeevan.onrender.com/auth/register';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userDetails),
    };

    try {
      const response = await fetch(apiUrl, options);
      const data = await response.json();

      if (response.ok) {
        submitSuccess();
      } else {
        submitFailure(data.error || 'Registration failed');
      }
    } catch (error) {
      submitFailure('Something went wrong. Please try again later.');
    }
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  return (
    <div className="main-container">
      <div>
        <form className="form-container" onSubmit={submitRegisterForm}>
          <img
            src="https://i.postimg.cc/L81hBbhn/Logo-2.png"
            alt="register website logo"
            className="login-website-logo"
          />
          <div className="input-container">
            <label htmlFor="username">Username</label>
            <div className="user-container">
              <FaRegUserCircle />
              <input
                type="text"
                value={username}
                placeholder="Username"
                id="username"
                onChange={e => setUsername(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <div className="user-container">
              <FaRegUserCircle />
              <input
                type="text"
                value={email}
                placeholder="UserEmail"
                id="email"
                onChange={e => setEmail(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="password">Password</label>
            <div className="user-container">
              <CiLock />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                placeholder="Password"
                id="password"
                onChange={e => setPassword(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="role">Role</label>
            <div className="user-container">
              <input
                type="text"
                value={role}
                placeholder="Role"
                id="role"
                onChange={e => setRole(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="showpassword"
              onChange={handleShowPassword}
            />
            <label htmlFor="showpassword">Show Password</label>
          </div>
          <button type="submit" className="login-button">
            Register
          </button>
          
          {showSubmitError && <p className="errorMsg">{errorMsg}</p>}
          <p>If you are a new user click register button</p>
        <button className="register-button" onClick={handleLoginClick}>
          Login
        </button>
        </form>
      </div>
    </div>

  );
};

export default RegisterRoute;
