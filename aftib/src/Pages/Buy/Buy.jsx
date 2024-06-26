import React, { useState, useEffect } from 'react';
import FilterCard from '../../Components/FilterCard/FilterCard';
import './Buy.css';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { createSearchQuery, searchRequest } from '../../utils/createSearchQuery';
import { PropertyCard } from '../../Components/PropertyCard';

const Buy = () => {
  const routeLocation = useLocation();
  const queryParams = new URLSearchParams(routeLocation.search);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [location, setLocation] = useState('');
  const [searchClicked, setSearchClicked] = useState(false);
  const [currentSection, setCurrentSection] = useState(1);

  useEffect(() => {
    // Fetch default properties when component mounts
    const fetchDefaultProperties = async () => {
      try {
        const response = await axios.get(`https://aftib-6o3h.onrender.com/listing/getListings/${currentSection}`);
        console.log('Fetched default properties:', response.data.listings); // Debugging line
        setProperties(response.data.listings);
      } catch (error) {
        console.error('Error fetching default listings:', error);
      }
    };
    fetchDefaultProperties();
  }, [currentSection]);

  useEffect(() => {
    const location = queryParams.get('location');
    const saleType = queryParams.get('saleType');
    const propertyType = queryParams.get('propertyType');
    const bedroom = queryParams.get('bedroom');
    const bathroom = queryParams.get('bathroom');
    const minPrice = queryParams.get('minPrice');
    const maxPrice = queryParams.get('maxPrice');
    const minMonthlyPayment = queryParams.get('minMonthlyPayment');
    const maxMonthlyPayment = queryParams.get('maxMonthlyPayment');
    const withSearch = queryParams.get('withSearch');
    if (withSearch === 'yes') {
      let query = createSearchQuery({ location, saleType, propertyType, bedroom, bathroom, minPrice, maxPrice, minMonthlyPayment, maxMonthlyPayment });
      console.log({ query });
      searchRequest(query)
        .then(res => {
          setFilteredProperties(res.data);
          console.log({ response: res.data });
          setShowResults(true);
        })
        .catch(err => { console.error(err.message) });
    }
  }, []);

  const handleFilter = (results) => {
    // Filter logic...
    setFilteredProperties(results);
    setShowResults(true);
  };

  const handleSearch = async (e) => {
    e.preventDefault(); // Prevent default form submission
    if (!location.trim()) {
      // If location is empty, do not proceed
      return;
    }
    try {
      const response = await axios.get(`https://aftib-6o3h.onrender.com/listing/searchListings?location=${location}`);
      console.log('Fetched search results:', response.data); // Debugging line
      setFilteredProperties(response.data);
      setShowResults(true);
    } catch (error) {
      console.error('Error fetching listings:', error);
    }
  };

  const handleBrowseMore = async () => {
    try {
      const nextSection = currentSection + 1;
      const response = await axios.get(`https://aftib-6o3h.onrender.com/listing/getListings/${nextSection}`);
      console.log('Fetched more properties:', response.data.listings); // Debugging line
      setProperties([...properties, ...response.data.listings]);
      setCurrentSection(nextSection);
    } catch (error) {
      console.error('Error fetching more listings:', error);
    }
  };

  const handleClearSearch = () => {
    setLocation('');
    setSearchClicked(false);
    setShowResults(false);
    setFilteredProperties([]);
  };

  const propertiesToDisplay = searchClicked ? filteredProperties : properties;

  return (
    <>
      <div className="row list">
        <div className="pListing">
          <h2>Property Listing</h2>
          <div className="p-item">
            <form onSubmit={handleSearch} className="plisting-head me-3">
              <input
                type="text"
                placeholder="Search for apartment based on location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button type="submit">Search</button>
            </form>
            <button className='p-btn' onClick={handleSearch}>Search</button>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="filter-container">
          {(properties.length > 0 || filteredProperties.length > 0) && (
            <FilterCard onFilter={handleFilter} />
          )}
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-0 gx-5 align-items-end">
            <div className="col-lg-6">
              {showResults && (
                <div className="text-start mx-auto mb-5 filter">
                  <p className='me-3'><i className="bi bi-funnel-fill"></i>Filter</p>
                  <span id='filterNum'>{filteredProperties.length} Results Found!</span>
                  <button className="btn clear" onClick={handleClearSearch}>Clear Search</button>
                </div>
              )}
            </div>
          </div>

          <div className="tab-content">
            <div id="tab-2" className={`tab-pane fade show active`}>
              <div>
                {showResults ?
                  <div className="row g-4">
                    <div>Showing Filtered Result</div>
                    {filteredProperties.map(x => <PropertyCard property={x} />)}
                  </div> :
                  <div className="row g-4">
                    <div>Showing the default properties</div>
                    {properties.map(x => <PropertyCard property={x} />)}
                  </div>
                }

                <div className="col-12 text-center mt-5 mb-5">
                  <button className="btn x py-3 px-5" onClick={handleBrowseMore}>Browse More Property</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Buy;
