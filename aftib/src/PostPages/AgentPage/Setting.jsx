// AgentSetting.js
import React, { useContext, useState, useEffect } from "react";
import "../Account/Setting.css";
import { useAuth } from "../../AuthContext";
import csc from "countries-states-cities";
import { updateUser } from "../../utils/adminOpsRequests"; // Adjust the import path as needed
import { UserContext } from "./UserContext"; // Adjust the import path as needed
import Modal from "../../Components/PropertyDetails/Modal";

const AgentSetting = () => {
  const { user, token } = useAuth();
  const { userUpdateObject, setUserUpdateObject } = useContext(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const [settings, setSettings] = useState({
    accountType: user ? user.accountType : "",
    changePassword: "",
    language: "English",
    country: "",
    state: "",
    
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [id]: value,
    }));
    setUserUpdateObject((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const allCountries = csc.getAllCountries();
    setCountries(allCountries);
  }, []);

  useEffect(() => {
    if (settings.country) {
      const countryId = countries.find(
        (country) => country.iso2 === settings.country
      )?.id;
      if (countryId) {
        const statesData = csc.getStatesOfCountry(countryId);
        setStates(statesData);
      }
    }
  }, [settings.country, countries]);

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await updateUser({ ...userUpdateObject, password: settings.changePassword }, token);
      console.log("User updated successfully:", updatedUser);
      setModalMessage("Your profile has been updated. Please log in again to sync changes.");
      setModalIsOpen(true);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  const closeModal = () => {
    setModalIsOpen(false);
  };
  return (
    <div className="settings-form-container">
      <form onSubmit={handleSave}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="changePassword">Change Password</label>
            <input
              type="password"
              className="form-control"
              id="changePassword"
              placeholder="New Password"
              value={settings.changePassword}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="language">Languages</label>
            <select
              id="language"
              className="form-control"
              value={settings.language}
              onChange={handleChange}
            >
              <option value="English">English</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="country">Country</label>
            <select
              id="country"
              className="form-control"
              value={settings.country}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              {countries.map((country) => (
                <option key={country.iso2} value={country.iso2}>
                  {country.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="state">State</label>
            <select
              id="state"
              className="form-control"
              value={settings.state}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              {states.map((state) => (
                <option key={state.iso2} value={state.iso2}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        
        <div className="save">
          <button type="submit" className="btn blue">
            Save and Continue
          </button>
        </div>
      </form>
      <Modal isOpen={modalIsOpen} message={modalMessage} onClose={closeModal} />

    </div>
  );
};

export default AgentSetting;
