import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import apple from '../../assets/images/apple.png';
import facebook from '../../assets/images/facebook.png';
import google from '../../assets/images/google.png';
import { Link, useLocation } from 'react-router-dom';

const Signup = () => {
  const [accountType, setAccountType] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+234');
  const [password, setPassword] = useState('');
  const [accountTypeError, setAccountTypeError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const handleChange = (event) => {
    setAccountType(event.target.value);
    setAccountTypeError(''); 
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
    setNameError(''); 
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError(''); 
    setGeneralError(''); 
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
    // add mobile validation if needed
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError('');
  };

  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    let valid = true;

    if (accountType === '' || accountType === 'null') {
      setAccountTypeError('Please select a valid account type.');
      valid = false;
    }
    if (name.trim() === '') {
      setNameError('Please enter your name.');
      valid = false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    }
    if (password.length < 6) {
      setPasswordError('Password must be at least 8 characters long.');
      valid = false;
    }

    if (!valid) {
      return;
    }

    const mobileNumber = `${countryCode}${mobile}`;
    const signupData = {
      email,
      password,
      mobileNumber,
      name,
      accountType,
      signupType: 'emailAndPassword'
    };

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', signupData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = response.data;

      if (data.success) {
       
        window.location.href = '/login';
      } else {
        setGeneralError(data.message || 'Signup failed. Please check your details.');
      }
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again later.';
      if (error.response) {
        if (error.response.data.error === 'Email already exists') {
          setEmailError('Email already exists. Please use a different email.');
        } else {
          errorMessage = error.response.data.error || errorMessage;
          setGeneralError(errorMessage);
        }
      }
      console.error('Signup error:', error);
    }
  };

  return (
    <>
      <div className="row rrow">
        <div className="rhead">
          <h4>Register with us to get your account ready</h4>
          <ul>
            <Link to="/sign">
              <li className={location.pathname === '/sign' ? 'active' : ''}>Sign in</li>
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
                  <div className="account r-sign">
                    <label htmlFor="accountType">Account Type:</label>
                    <select id="accountType" value={accountType} onChange={handleChange} required>
                      <option value="null">Select an account</option>
                      <option value="admin">Admin</option>
                      <option value="Client">Client</option>
                      <option value="Agent">Agent</option>
                      <option value="Property-Owner">Property Owner</option>
                    </select>
                    {accountTypeError && <p className="error-text">{accountTypeError}</p>}
                  </div>

                  <div className="name r-sign">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} onChange={handleNameChange} required />
                    {nameError && <p className="error-text">{nameError}</p>}
                  </div>

                  <div className="email r-sign">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} required />
                    {emailError && <p className="error-text">{emailError}</p>}
                    {generalError && <p className="error-text">{generalError}</p>}
                  </div>

                  <div className="mobile r-sign">
                    <label htmlFor="num">Mobile</label>
                    <div className="form-group mt-2 d-inline-block">
                      <select
                        className="border-end country-code px-2"
                        value={countryCode}
                        onChange={handleCountryCodeChange}
                        required
                      >
                        <option value="+234">+234</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+91">+91</option>
                        <option value="+81">+81</option>
                      </select>
                      <input
                        type="text"
                        className="form-control"
                        id="ec-mobile-number"
                        placeholder="91257888"
                        value={mobile}
                        onChange={handleMobileChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="password r-sign">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" value={password} onChange={handlePasswordChange} required />
                    {passwordError && <p className="error-text">{passwordError}</p>}
                  </div>

                  <div className="r-btn">
                    <button type="submit" className="rsubmit">Submit</button>
                  </div>                  
                </form>
              </div>

              <div className="col-lg-6 r-second">
                <div className="rborder">
                  <hr />
                  <h2>Welcome to AFTIB</h2>
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
                    <p className="rsubtitle">
                      By registering you accept our <span>Terms of use</span> and <span>Privacy</span> and agree that we
                      and our selected partners may contact you with relevant offers and services.
                    </p>
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

export default Signup;
