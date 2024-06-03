import React, { useState } from "react";
import "./FilterCard.css";

const FilterCard = ({ onFilter }) => {
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("Any");
  const [baths, setBaths] = useState("Any");
  const [activeFilter, setActiveFilter] = useState("Featured"); // State for active filter button

  const handleFilter = () => {
    onFilter({ minPrice, maxPrice, beds, baths });
  };

  const resetFilters = () => {
    setMinPrice("");
    setMaxPrice("");
    setBeds("Any");
    setBaths("Any");
    onFilter({ minPrice: "", maxPrice: "", beds: "Any", baths: "Any" });
  };

  return (
    <div className="filter-card">
      <div className="filter-buttons">
        <button
          className={`filter-button ${activeFilter === "Featured" ? "active" : ""}`}
          onClick={() => setActiveFilter("Featured")}
        >
          Featured
        </button>
        <button
          className={`filter-button ${activeFilter === "Buy" ? "active" : ""}`}
          onClick={() => setActiveFilter("Buy")}
        >
          Buy
        </button>
        <button
          className={`filter-button ${activeFilter === "Rent" ? "active" : ""}`}
          onClick={() => setActiveFilter("Rent")}
        >
          Rent
        </button>
      </div>
      <div className="price-range">
        <h4>Price Range</h4>
        <div className="price-inputs">
          <div>
            <label htmlFor="min-price">Minimum</label>
            <input
              type="text"
              id="min-price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="max-price">Maximum</label>
            <input
              type="text"
              id="max-price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>
        <div className="price-type">
          <div className="price-type-group">
            <input
              type="radio"
              id="list-price"
              name="price-type"
              defaultChecked
            />
            <label htmlFor="list-price">List Price</label>
          </div>
          <div className="price-type-group">
            <input type="radio" id="monthly-payment" name="price-type" />
            <label htmlFor="monthly-payment">Monthly Payment</label>
          </div>
        </div>
      </div>
      <div className="filter-options">
        <h4>Beds</h4>
        <div className="bed-options">
          {["Any", "1+", "2+", "3+", "4+", "5+"].map((option) => (
            <button
              key={option}
              onClick={() => setBeds(option)}
              className={beds === option ? "active" : ""}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-options">
        <h4>Bathrooms</h4>
        <div className="bath-options">
          {["Any", "1+", "2+", "3+", "4+"].map((option) => (
            <button
              key={option}
              onClick={() => setBaths(option)}
              className={baths === option ? "active" : ""}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-options">
        <h4>Home Type</h4>
        <div className="home-type-options">
          <input type="checkbox" id="home-type" />
          <label htmlFor="home-type">Deselect all</label>
        </div>
      </div>
      <div className="filter-buttons">
        <button className="reset-button" onClick={resetFilters}>
          Reset all filters
        </button>
        <button className="apply-button" onClick={handleFilter}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default FilterCard;
