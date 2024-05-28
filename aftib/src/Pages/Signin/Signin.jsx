import React, { useState } from 'react';
import './Sign.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

const Signin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get('http://localhost:8080/auth/login', {
        params: { email, password }
      });
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Login successful!',
      }).then(() => {
        
        navigate('/buy'); 
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.response ? error.response.data.error : 'An error occurred',
      });
    }
  };

  return (
    <section id="sign" className="sign">
      <div className="container-block">
        <div className="wrapper">
          <div className="form-inner">
            <form action="true" onSubmit={handleSubmit}>
              <h3 className='h3'>Sign In</h3>
              <div className="form-group">
                <input
                  type="text"
                  id="email"
                  name="email"
                  placeholder="example@gmail.com"
                  className="type"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Password"
                  className="type"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="fg">
                  <label className="checkbox-label">
                    <input type="checkbox" id="remember" name="remember" className="custom-checkbox" />
                    Remember me
                  </label>
                  <span className="forgot-password">Forgot password?</span>
                </div>
                <div className="button-container">
                  <button type="submit" className="custom-btn-sign">Sign in</button>
                </div>
                <div className="end">
                  <p>Don't have an account? 
                    <Link to="/signup">
                      <span className="signup"> Sign up</span>
                    </Link>
                  </p>
                  <h2 className='logo'>AFTIB</h2>
                </div>
              </div>
            </form>
          </div>
          <div className="image-holder"></div>
        </div>
      </div>
    </section>
  );
};

export default Signin;
