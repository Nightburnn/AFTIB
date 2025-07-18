import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";
import { useAuth } from "../../AuthContext";
const Footer = () => {
  const { isLoggedIn } = useAuth();

  return (
    <footer>
      <div className="container">
        {!isLoggedIn ? (
          <>
            <div className="row">
              <div className="col">
                <h4>Properties For Sale</h4>
                <ul>
                  <li>
                    <Link>Flat & Apartment for sale</Link>
                  </li>
                  <li>
                    <Link>House for sale</Link>
                  </li>
                  <li>
                    <Link>Detached duplex for sale</Link>
                  </li>
                  <li>
                    <Link>Semi Detached duplex for sale</Link>
                  </li>
                  <li>
                    <Link>Commercial properties for sale</Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h4>Properties For Rent</h4>
                <ul>
                  <li>
                    <Link>Houses for rent</Link>
                  </li>
                  <li>
                    <Link>Studio Apartments for rent</Link>
                  </li>
                  <li>
                    <Link>Self contain for rent</Link>
                  </li>
                  <li>
                    <Link>Flats and Apartment for rent</Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h4>Short Lets Destination</h4>
                <ul>
                  <li>
                    <Link>Short Lets in Abuja</Link>
                  </li>
                  <li>
                    <Link>Short Lets in Lekki</Link>
                  </li>
                  <li>
                    <Link>Short Lets in Victoria Island</Link>
                  </li>
                </ul>
              </div>
              <div className="col">
                <h4>Agents</h4>
                <ul>
                  <li>
                    <Link>Agents in Ibadan</Link>
                  </li>
                  <li>
                    <Link>Agents in Lagos</Link>
                  </li>
                  <li>
                    <Link>Agents in Abuja</Link>
                  </li>
                </ul>
              </div>
            </div>
            <hr />
            <div className="row">
              <div className="col-lg-8 col-md-6">
                <h5>Aftib Nigeria</h5>
                <p>
                  Explore the fastest-growing real estate market in Nigeria with
                  our expert services. By choosing us, you embark on a smooth
                  and effortless journey to find your ideal property. Whether
                  you are in search of homes, short-term rentals, apartments, or
                  available land for sale and rent, our comprehensive support
                  ensures a stress-free experience, making you feel comfortably
                  at home throughout the process
                </p>
              </div>
              <div className="col-12 col-md-3 text-end ps-3 discover">
                <h4>Discover</h4>
                <ul>
                  <li>
                    <Link>Blogs</Link>
                  </li>
                  <li>
                    <Link>Terms and Conditions</Link>
                  </li>
                  <li>
                    <Link>Property sold</Link>
                  </li>
                  <li>
                    <Link>Propert rented</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <h5>Welcome to Aftib</h5>
                <ul>
                  <li>
                    <h6>Contact Enquires</h6>
                  </li>
                  <li>General Mail: customersupport@gmail.com</li>
                  <li>Help: customersupport@gmail.com </li>
                  <li>Office Address: No 1, example street, Lagos</li>
                </ul>
              </div>
            </div>
            <hr />
          </>
        ) : null}
        <div className="signupPost">
          <div className="col socials">
            <div className="">
              <h5>Contact Us</h5>
             <a href="https://www.instagram.com/aftibrealestate/"> <i className="bi bi-instagram"></i></a>
             <a href=" https://www.facebook.com/profile.php?id=61560879570798&mibextid=ZbWKwL"><i className="bi bi-facebook"></i></a> 
           
             <a href="https://www.x.com/aftibrealestate/"><i className="bi bi-twitter"></i></a> 
             <a href="https://www.linkedin.com/in/aftibrealestate"><i className="bi bi-linkedin"></i></a> 
            </div>
          </div>
          <div className="col text-center align-item-end copy">
            <strong>©Aftib Real Estate</strong> - 2024
          </div>
          <div className="col align-item-end ">
            <img src={logo} alt="" width={80} />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
