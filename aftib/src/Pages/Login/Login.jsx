import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import apple from "../../assets/images/apple.png";
import facebook from "../../assets/images/facebook.png";
import google from "../../assets/images/google.png";
import "./Login.css";
import { useAuth } from "../../AuthContext";
import { useLoading } from "../../Components/LoadingContext";

const Login = () => {
  const { login, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  let { setLoading } = useLoading();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError("");
  };

  const location = useLocation();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    try {
      setLoading(true);
      const response = await axios.post(
        "https://aftib-6o3h.onrender.com/auth/login",
        { email: normalizedEmail, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      const data = response.data;

      console.log(response.data);
      setLoading(false);
      if (data.token) {
        window.localStorage.setItem("accessToken", data.token);
        window.localStorage.setItem("user", JSON.stringify(data.user));
        console.log(
          "Stored token and user in local storage:",
          data.token,
          data.user,
        );
        login(data.user);
      } else {
        setEmailError("Login failed. Please check your email and password.");
      }
    } catch (error) {
      setLoading(false);
      if (error.response) {
        const errorMessage = error.response.data.error;
        if (error.response.status === 401) {
          if (errorMessage === "Email has not been Registered.") {
            setEmailError(errorMessage);
          } else if (errorMessage === "Password does not match.") {
            setPasswordError(errorMessage);
          } else {
            setEmailError(
              "Unauthorized. Please check your email and password.",
            );
          }
        } else if (error.response.status === 404) {
          setEmailError("Email has not been Registered");
        } else {
          console.error("An unexpected error occurred:", error.response);
        }
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };

  return (
    <>
      <div className="row rrow">
        <div className="rhead">
          <h4 className="ps-4">Welcome</h4>
          <ul>
            <Link to="/sign">
              <li className={location.pathname === "/sign" ? "active" : ""}>
                Register
              </li>
            </Link>
            <Link to="/login">
              <li className={location.pathname === "/login" ? "active" : ""}>
                Sign In
              </li>
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
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={handleEmailChange}
                      required
                    />
                    {emailError && <p className="error-text">{emailError}</p>}
                  </div>
                  <div className="password r-sign">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={handlePasswordChange}
                      required
                    />
                    {passwordError && (
                      <p className="error-text">{passwordError}</p>
                    )}
                  </div>
                  <Link to="/forgot">
                    <p className="text-end lforgot">Forgot password ?</p>
                  </Link>
                  <div className="l-btn mb-4">
                    <button type="submit" className="rsubmit">
                      Sign In
                    </button>
                  </div>
                  <p className="lsubtitle text-center mt-4">
                    By registering you accept our <span>Terms of use</span> and{" "}
                    <span>Privacy</span> and agree that we and our selected
                    partners may contact you with relevant offers and services.
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

export default Login;
