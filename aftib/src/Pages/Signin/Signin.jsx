import React from 'react';
import './Sign.css';
import { Link } from 'react-router-dom';

const Signin = () => {
  return (
    <section id="sign" className="sign">
      <div className="container-block">
        <div className="wrapper">
         <div className="form-inner">
          <form action>
          
               <h3 className='h3'>Sign In</h3>
       
           <div className="form-group">
           <input type="text" id="username" name="username" placeholder="Username" className="type" />
                <input type="password" id="password" name="password" placeholder="Password" className="type" />

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



         <div className="image-holder">
          
         </div>
        </div>
      </div>
    </section>
  );
};

export default Signin;

