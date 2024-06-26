import React, { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import apple from '../../assets/images/apple.png';
import facebook from '../../assets/images/facebook.png';
import google from '../../assets/images/google.png';
import './Forgot.css';
import { sendForgotPasswordForEmail,sendVerifyOtp } from '../../utils/forgotPasswordRequest';
// when handling the form submissions use this functions.
// use let sendOtp = await sendForgotPasswordForEmail(email). if there is no issue it should return the response data, same with the other function.
// then when the user clicks verify otp, do let verifyOtp = await sendVerifyOtp(email,otp)

const ForgotPassword = () => {
  const [isEmail, setIsEmail] = useState(true);
  const [inputValue, setInputValue] = useState('');
  const [countryCode, setCountryCode] = useState('+234');
  const [error, setError] = useState('');
  const [mobile, setMobile] = useState('');
  const [isVerificationStep, setIsVerificationStep] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const otpRefs = useRef([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
    setError('');
  };

  const handleCountryCodeChange = (event) => {
    setCountryCode(event.target.value);
  };

  const handleMobileChange = (event) => {
    setMobile(event.target.value);
  };

  const handleToggleInputType = () => {
    setIsEmail(!isEmail);
    setInputValue('');
    setMobile('');
    setError('');
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    if (value.length === 1 && index < otpRefs.current.length - 1) {
      otpRefs.current[index + 1].focus();
    } else if (value === '' && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === 'Backspace' && otp[index] === '' && index > 0) {
      otpRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isVerificationStep) {
      // Handle OTP verification logic here
      console.log('OTP:', otp.join(''));
    } else {
      // Handle email or mobile submission logic here
      console.log(isEmail ? 'Email: ' : 'Mobile: ', isEmail ? inputValue : `${countryCode} ${mobile}`);
      setIsVerificationStep(true);
    }
  };

  const location = useLocation();

  return (
    <>
      <div className="row rrow">
        <div className="rhead">
          <h4 className="ps-4">Forgot Password?</h4>
          <ul>
            <Link to="/sign">
              <li className={location.pathname === '/sign' ? 'active' : ''}>Register</li>
            </Link>
            <Link to="/login">
              <li className={location.pathname === '/login' ? 'active' : ''}>Sign In</li>
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
                  <h2 className="text-center fhead">Forgot Password?</h2>
                  <p className="text-center mb-4">
                    {isVerificationStep ? 'Please enter the verification code' : `Enter the ${isEmail ? 'email' : 'mobile number'} address associated with your account`}
                  </p>
                  {isVerificationStep ? (
                    <div className="otp-inputs">
                      {otp.map((digit, index) => (
                        <input
                          key={index}
                          type="text"
                          value={digit}
                          onChange={(e) => handleOtpChange(index, e.target.value)}
                          onKeyDown={(e) => handleKeyDown(index, e)}
                          maxLength="1"
                          className="otp-input"
                          required
                          ref={(el) => (otpRefs.current[index] = el)}
                        />
                      ))}
                    </div>
                  ) : (
                    isEmail ? (
                      <div className="r-sign">
                        <label htmlFor="email">Email</label>
                        <input
                          type="email"
                          id="email"
                          value={inputValue}
                          onChange={handleInputChange}
                          required
                        />
                        {error && <p className="error-text">{error}</p>}
                      </div>
                    ) : (
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
                    )
                  )}
                  <Link onClick={isVerificationStep ? undefined : handleToggleInputType}>
                    <p className="text-end lforgot">
                      {isVerificationStep ? 'Resend code?' : 'Try another way?'}
                    </p>
                  </Link>
                  <div className="l-btn mb-4">
                    <button type="submit" className="rsubmit">
                      {isVerificationStep ? (isEmail ? 'Verify my email' : 'Verify my phone') : 'Next'}
                    </button>
                  </div>
                  <p className="lsubtitle text-center mt-4">
                    If you need help in resolving this issue, contact our customer support via <a href='mailto:support@aftib.com'>support@aftib.com</a>
                    <br />
                    <span>Terms of use</span> and <span>Privacy</span> 
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

export default ForgotPassword;
