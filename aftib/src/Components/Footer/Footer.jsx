import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.svg";

const Footer = () => {
  return (
    <footer>
      <div className="container">
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
          <div className="col-12 col-md-6  ">
            <h5>Aftib Nigeria</h5>
            <p>
              Explore the fastest-growing real estate market in Nigeria with our
              expert services. By choosing us, you embark on a smooth and
              effortless journey to find your ideal property. Whether you are in
              search of homes, short-term rentals, apartments, or available land
              for sale and rent, our comprehensive support ensures a stress-free
              experience, making you feel comfortably at home throughout the
              process
            </p>
          </div>
          <div className="col-6 col-md-3 ">
            <h4>Company</h4>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/buy">Buy</Link>
              </li>
              <li>
                <Link to="/sell">Sell</Link>
              </li>
              <li>
                <Link to="/rent">Rent</Link>
              </li>
              <li>
                <Link to="/agent-finder">Agent Finder</Link>
              </li>
              <li>
                <Link to="/help">Help</Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-md-3 text-end ps-5">
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

        <div className="">
          <div className="col socials">
            <div className="">
              <i class="bi bi-instagram"></i>
              <i class="bi bi-facebook"></i>
              <i class="bi bi-whatsapp"></i>
              <i class="bi bi-twitter"></i>
              <i class="bi bi-linkedin"></i>
            </div>
          </div>
          <div className="col text-center align-item-end copy">
            ©Aftib - 2024
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
