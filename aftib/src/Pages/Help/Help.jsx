import React from 'react';
import './Help.css';
import help1 from '../../assets/images/help1.png'
import help2 from '../../assets/images/help2.png'
import help3 from '../../assets/images/help3.png'
import { Link } from 'react-router-dom';

const Help = () => {
  return (
    <main id="main">
      <section className="hero-bg">
        <div className="hero">
          <div className="container">
            <div className="row">
              <div className="hero-title">
                <h2>How can we help?</h2>
                <div className="form-container">
                  <form>
                    <div className="form-item">
                      <label htmlFor="search-input" className="visually-hidden">Search</label>
                      <input
                        type="text"
                        id="search-input"
                        placeholder="How can we help?"
                        className="me-5"
                      />
                      <button type="submit" className="custom-btn">Search</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="help mt-5">
      <div class="container">
      <div class="row">
        <h3>Help Desk</h3>
        <div class="col-lg-4 ">
          <div class="demo-item">
           <img src={help1} alt="help"  className='resize'/>
           <div className="topics">
            <h4>Getting started</h4>

            <p>Get your account set up in just 5 simple steps</p>

            <Link>
            2 articles
            </Link>
           </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="demo-item">
          <img src={help2} alt="help"  className='resize'/>
          <div className="topics">
            <h4>Account Management</h4>

            <p>Manage your Account</p>

            <Link>
            7 articles
            </Link>
           </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="demo-item">
          <img src={help3} alt="help"  className='resize'/>
          <div className="topics">
            <h4>Reporting</h4>

            <p>Reporting issues</p>

            <Link>
            22 articles
            </Link>
           </div>
          </div>
        </div>
      </div>
    </div>
      </section>
    </main>
  );
};

export default Help;
