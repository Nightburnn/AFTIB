import React, { useState } from 'react';
import './Signup.css';
import axios from 'axios';
import Swal from 'sweetalert2';
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

  const handleChange = (event) => setAccountType(event.target.value);
  const handleNameChange = (event) => setName(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);
  const handleMobileChange = (event) => setMobile(event.target.value);
  const handleCountryCodeChange = (event) => setCountryCode(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const mobileNumber = `${countryCode}${mobile}`;
    const signupData = {
      email,
      password,
      mobileNumber,
      name,
      signupType: 'emailAndPassword'
    };

    console.log('Signup data:', signupData);

    try {
      const response = await axios.post('http://localhost:8080/auth/signup', signupData, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Response:', response);

      const data = response.data;

      if (data.success) {
        Swal.fire({
          title: 'Success!',
          text: 'You have successfully signed up.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          title: 'Error!',
          text: data.message || 'Signup failed. Please check your details.',
          icon: 'error',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      let errorMessage = 'An error occurred. Please try again later.';
      if (error.response) {
        errorMessage = error.response.data.error || errorMessage;
        console.error('Error response data:', error.response.data);
      }
      Swal.fire({
        title: 'Error!',
        text: errorMessage,
        icon: 'error',
        confirmButtonText: 'OK'
      });
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
                  </div>

                  <div className="name r-sign">
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" value={name} onChange={handleNameChange} required />
                  </div>

                  <div className="email r-sign">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" value={email} onChange={handleEmailChange} required />
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
