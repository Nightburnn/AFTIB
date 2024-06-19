import React, { useState } from 'react';
import './FilterCard.css';
import axios from 'axios';

function searchRequest({ location, priceRangeMin, priceRangeMax, monthlyPaymentMin, monthlyPaymentMax, bedRooms, bathRooms, salesType }) {
  const endpoint = 'https://aftib-6o3h.onrender.com/listing/searchListings';

  // Create query parameters
  const createQuery = (option, value) =>{
    let bool  = !!value  && value !== '-';
    console.log({bool,value})
     return bool ? `${option}=${value}` : ''
    };
  let queryParams = [];
  queryParams.push(createQuery('location', location));

  // Include either price range or monthly payment range depending on salesType
  if (salesType === 'rent') {
    queryParams.push(createQuery('monthlyPaymentRange', `${monthlyPaymentMin}-${monthlyPaymentMax}`));
  } else {
    queryParams.push(createQuery('priceRange', `${priceRangeMin}-${priceRangeMax}`));
  }

  queryParams.push(createQuery('saleType', salesType));
  queryParams.push(createQuery('bedRooms', bedRooms !== 'Any' ? bedRooms.replace('+', '') : ''));
  queryParams.push(createQuery('bathRooms', bathRooms !== 'Any' ? bathRooms.replace('+', '') : ''));
console.log({queryParams})
  // Filter unused queries
  queryParams = queryParams.filter(param => param !== ''  && param !== '-');

  // Build the full query string
  const queryString = queryParams.length ? `?${queryParams.join('&')}` : '';

  console.log('Constructed Query String:', queryString); // Debugging log

  // Send the request with axios
  axios.get(`${endpoint}${queryString}`)
    .then(response => {
      console.log('Search results:', response.data);
      if (response.data.listings) {
        console.log('Number of listings:', response.data.listings.length);
        console.log('Listings:', response.data.listings);
      } else {
        console.warn('No listings found in the response.');
      }
    })
    .catch(error => {
      console.error('There was an error with the search request:', error);
    });
}

const FilterCard = ({ onFilter }) => {
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [monthlyPaymentMin, setMonthlyPaymentMin] = useState('');
  const [monthlyPaymentMax, setMonthlyPaymentMax] = useState('');
  const [beds, setBeds] = useState('Any');
  const [baths, setBaths] = useState('Any');
  const [activeFilter, setActiveFilter] = useState('Featured'); // State for active filter button

  const handleFilter = () => {
    const salesType = activeFilter.toLowerCase(); // Assuming 'Featured' is a type, adjust as needed
    searchRequest({ 
      location, 
      priceRangeMin: minPrice, 
      priceRangeMax: maxPrice, 
      monthlyPaymentMin, 
      monthlyPaymentMax, 
      bedRooms: beds, 
      bathRooms: baths, 
      salesType 
    });
  };

  const resetFilters = () => {
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    setMonthlyPaymentMin('');
    setMonthlyPaymentMax('');
    setBeds('Any');
    setBaths('Any');
    setActiveFilter('Featured');
    onFilter({ minPrice: '', maxPrice: '', beds: 'Any', baths: 'Any' });
  };

  return (
    <div className="filter-card">
      <div className="filter-buttons">
        <button
          className={`filter-button ${activeFilter === 'Featured' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Featured')}
        >
          Featured
        </button>
        <button
          className={`filter-button ${activeFilter === 'Buy' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Buy')}
        >
          Buy
        </button>
        <button
          className={`filter-button ${activeFilter === 'Rent' ? 'active' : ''}`}
          onClick={() => setActiveFilter('Rent')}
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
              onClick={() => {
                setMonthlyPaymentMin('');
                setMonthlyPaymentMax('');
              }}
            />
            <label htmlFor="list-price">List Price</label>
          </div>
          <div className="price-type-group">
            <input 
              type="radio" 
              id="monthly-payment" 
              name="price-type"
              onClick={() => {
                setMinPrice('');
                setMaxPrice('');
              }}
            />
            <label htmlFor="monthly-payment">Monthly Payment</label>
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
          {['Any', '1+', '2+', '3+', '4+', '5+'].map((option) => (
            <button
              key={option}
              onClick={() => setBeds(option)}
              className={beds === option ? 'active' : ''}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      <div className="filter-options">
        <h4>Bathrooms</h4>
        <div className="bath-options">
          {['Any', '1+', '2+', '3+', '4+'].map((option) => (
            <button
              key={option}
              onClick={() => setBaths(option)}
              className={baths === option ? 'active' : ''}
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
