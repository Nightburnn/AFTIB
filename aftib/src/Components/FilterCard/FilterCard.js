import React, { useState } from "react";
import "./FilterCard.css";
import {
  createSearchQuery,
  transformSearchOptions,
  searchRequest,
} from "../../utils/createSearchQuery";

const FilterCard = ({ onFilter }) => {
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [beds, setBeds] = useState("Any");
  const [baths, setBaths] = useState("Any");
  const [activeFilter, setActiveFilter] = useState("Buy"); // State for active filter button

  const handleFilter = () => {
    const saleType = activeFilter.toLowerCase(); // Assuming 'Featured' is a type, adjust as needed

    console.log({ minPrice, maxPrice });
    let transformed = transformSearchOptions({
      location,
      saleType,
      propertyType: null,
      bedroom: beds,
      bathroom: baths,
      minPrice,
      maxPrice,
    });
    let query = createSearchQuery(transformed);
    console.log({ query });
    searchRequest(query)
      .then((res) => {
        console.log("result", res.data);
        onFilter(res.data);
      })
      .catch((err) => {
        console.error({ error: err.message });
      });
    /* searchRequest({ 
      location, 
      priceRangeMin: minPrice, 
      priceRangeMax: maxPrice, 
      monthlyPaymentMin, 
      monthlyPaymentMax, 
      bedRooms: beds, 
      bathRooms: baths, 
      salesType 
    });*/
  };

  const resetFilters = () => {
    setLocation("");
    setMinPrice("");
    setMaxPrice("");
    setBeds("Any");
    setBaths("Any");
    setActiveFilter("Featured");
    onFilter({ minPrice: "", maxPrice: "", beds: "Any", baths: "Any" });
  };

  return (
    <div className="filter-card">
      <div className="filter-buttons">
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
        <button
          className={`filter-button ${activeFilter === "Shortlet" ? "active" : ""}`}
          onClick={() => setActiveFilter("Shortlet")}
        >
          Shortlet
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
      </div>
      <div className="filter-options">
        <h4>Location</h4>
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
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
