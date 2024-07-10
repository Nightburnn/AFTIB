import React, { useState, useEffect } from "react";
import "./Setting.css";
import { useAuth } from "../../AuthContext";
import csc from "countries-states-cities";
import { updateUser } from "../../utils/adminOpsRequests";

const Setting = () => {
  const { user, login, token } = useAuth();

  const [settings, setSettings] = useState({
    name: user.name || "",
    email: user.email || "",
    mobileNumber: user.mobileNumber || "",
    gender: user.gender || "",
    dateOfBirth: user.dateOfBirth || new Date(), // Ensure it's in the correct format
    address: user.address || "",
    password: "", // Leave empty if not changing the password
    country: user.country || "",
    language: user.language || "English",
    state: user.state || ""
  });

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);

  useEffect(() => {
    const allCountries = csc.getAllCountries();
    setCountries(allCountries);
    console.log("All Countries:", allCountries);
  }, []);

  useEffect(() => {
    if (settings.country) {
      const countryId = countries.find(
        (country) => country.iso2 === settings.country
      )?.id;
      if (countryId) {
        const statesData = csc.getStatesOfCountry(countryId);
        setStates(statesData);
        console.log("States for Selected Country:", statesData);
      }
    }
  }, [settings.country, countries]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [id]: value,
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const updatedUserSettings = {
      password: settings.changePassword,
      language: settings.language,
      country: settings.country,
      state: settings.state
    };
    console.log("Saving settings:", updatedUserSettings);
    try {
      const updatedData = await updateUser(updatedUserSettings, token);
      console.log("Settings updated successfully:", updatedData);
      login(updatedData);
    } catch (error) {
      console.error("Error updating settings:", error);
    }
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
              onChange={(e) => {
                handleChange(e);
                setSettings((prevSettings) => ({
                  ...prevSettings,
                  state: "",
                }));
              }}
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
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="save">
          <button type="submit" className="btn btn-primary">
            Save and Continue
          </button>
        </div>
      </form>
    </div>
  );
};

export default Setting;
