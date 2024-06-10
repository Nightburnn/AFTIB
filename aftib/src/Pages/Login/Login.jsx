import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import apple from '../../assets/images/apple.png';
import facebook from '../../assets/images/facebook.png';
import google from '../../assets/images/google.png';
import './Login.css';
import { useAuth } from '../../AuthContext';

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError('');
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/auth/login', { email, password }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;

      if (data.token) {
        login(data);
        navigate('/');
      } else {
        setEmailError('Login failed. Please check your email and password.');
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = error.response.data.error;
        if (error.response.status === 401) {
          if (errorMessage === 'Email has not been Registered.') {
            setEmailError(errorMessage);
          } else if (errorMessage === 'Password does not match.') {
            setPasswordError(errorMessage);
          } else {
            setEmailError('Unauthorized. Please check your email and password.');
          }
        } else {
          setEmailError('An error occurred. Please try again later.');
        }
      } else {
        setEmailError('An error occurred. Please try again later.');
      }
      console.error('Login error:', error);
    }
  };

  return (
    <>
      <div className="row rrow">
        <div className="rhead">
          <h4>Welcome</h4>
          <ul>
            <Link to="/sign">
              <li className={location.pathname === '/sign' ? 'active' : ''}>Register</li>
            </Link>
            <Link to="/login">
              <li className={location.pathname === '/login' ? 'active' : ''}>Login</li>
            </Link>
          </ul>
        </div>
      </div>
      <section className="register">
        <div className="container">
          <div className="row">
            <div className="registerS">
              <div className="col-lg-6">
                <form className="r-form" onSubmit={handleSubmit}>
                  <h2 className="text-center lhead">Welcome back, User</h2>
                  <div className="email r-sign">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} required />
                    {emailError && <p className="error-text">{emailError}</p>}
                  </div>
                  <div className="password r-sign">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
                    {passwordError && <p className="error-text">{passwordError}</p>}
                  </div>
                  <Link>
                    <p className="text-end lforgot">Forgot password ?</p>
                  </Link>
                  <div className="l-btn mb-4">
                    <button type="submit" className="rsubmit">Login</button>
                  </div>
                  <p className="lsubtitle text-center mt-4">
                    By registering you accept our <span>Terms of use</span> and <span>Privacy</span> and agree that we
                    and our selected partners may contact you with relevant offers and services.
                  </p>
                </form>
              </div>
              <div className="col-lg-6">
                <div className="rborder">
                  <hr />
                  <div className="r-connect">
                    <p className="text-center rpara">Or connect with:</p>
                    <div className="rimg">
                      <Link>
                        <img src={apple} alt="Apple" />
                      </Link>
                    </div>
                    <div className="rimg">
                      <Link>
                        <img src={facebook} alt="Facebook" />
                      </Link>
                    </div>
                    <div className="rimg">
                      <Link>
                        <img src={google} alt="Google" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
