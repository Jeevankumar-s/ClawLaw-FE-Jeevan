import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { FaRegUserCircle } from 'react-icons/fa';
import { CiLock } from 'react-icons/ci';
import './index.css';

const LoginRoute = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showSubmitError, setShowSubmitError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(prevShowPassword => !prevShowPassword);
  };

  const submitSuccess = (jwtToken,role) => {
    console.log(jwtToken)
    Cookies.set('jwt_token', jwtToken, { expires: 30 });
    Cookies.set('role',role, { expires: 30 })
    navigate('/');
  };

  const submitFailure = errorMsg => {
    setShowSubmitError(true);
    setErrorMsg(errorMsg);
  };

  const submitLoginForm = async event => {
    event.preventDefault();
    const userDetails = { email, password };
    const apiUrl = 'https://clawlaw-be-jeevan.onrender.com/auth/login';
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
        submitSuccess(data.token,data.role); 
      } else {
        submitFailure(data.error); 
      }
    } catch (error) {
      submitFailure('An unexpected error occurred.');
    }
  };

  const handleRegisterClick = () => {
    navigate('/register');
  };

  return (
    <div className="main-container">
      <div>
        <form className="form-container" onSubmit={submitLoginForm}>
          <img
            src="https://i.postimg.cc/L81hBbhn/Logo-2.png"
            alt="login website logo"
            className="login-website-logo"
          />
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <div className="user-container">
              <FaRegUserCircle />
              <input
                type="text"
                value={email}
                placeholder="UserEmail"
                id="email"
                onChange={handleEmailChange}
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
                onChange={handlePasswordChange}
                className="input"
              />
            </div>
          </div>
          <div>
            <input
              type="checkbox"
              id="showpassword"
              onClick={handleShowPassword}
            />
            <label htmlFor="showpassword">Show Password</label>
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="errorMsg">{errorMsg}</p>}
          <p>If you are a new user click register button</p>
        <button className="register-button" onClick={handleRegisterClick}>
          Register
        </button>
        </form>
        
      </div>
    </div>
  );
};

export default LoginRoute;
