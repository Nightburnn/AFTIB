import React, { useState, useEffect } from "react";
import ".././Account/Setting.css";
import { useAuth } from "../../AuthContext";
import csc from "countries-states-cities";

const AgentSetting = () => {
  const { user } = useAuth();

  const [settings, setSettings] = useState({
    accountType: user ? user.accountType : "",
    changePassword: "",
    language: "English",
    country: "",
    state: "",
    notification: "On",
    location: "Disabled",
    profession: "home",
  });

  // Handle changes in form inputs
  const handleChange = (e) => {
    const { id, value } = e.target;
    setSettings((prevSettings) => ({
      ...prevSettings,
      [id]: value,
    }));
  };

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
        (country) => country.iso2 === settings.country,
      )?.id;
      if (countryId) {
        const statesData = csc.getStatesOfCountry(countryId);
        setStates(statesData);
        console.log("States for Selected Country:", statesData);
      }
    }
  }, [settings.country, countries]);

  // Handle form submission (save changes)
  const handleSave = (e) => {
    e.preventDefault();
    // Simulate saving changes - you can replace this with actual API call
    console.log("Saving settings:", settings);
    // Update settings state or send API request to save changes
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

export default AgentSetting;
