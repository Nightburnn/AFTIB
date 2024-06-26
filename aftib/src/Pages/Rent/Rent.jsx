import React, { useState, useEffect } from 'react';
import './Rent.css';
import FilterCard from '../../Components/FilterCard/FilterCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Rent = () => {
    const [properties, setProperties] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
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

    const handleFilter = (filters) => {
        // Filter logic...
    };

    const handleSearch = async (e) => {
        e.preventDefault(); // Prevent default form submission
        if (!location.trim()) {
            // If location is empty, do not proceed
            return;
        }
        setSearchClicked(true);
        try {
            const response = await axios.get(`https://aftib-6o3h.onrender.com/listing/searchListings?location=${location}`);
            console.log('Fetched search results:', response.data); // Debugging line
            setFilteredProperties(response.data);
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
                            {searchClicked && (
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
                            <div className="row g-4">
                                {propertiesToDisplay.map(property => (
                                    <div key={property._id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="property-item rounded overflow-hidden">
                                            <div className="position-relative overflow-hidden">
                                                <Link to=""><img className="img-fluid" src={property.images[0]} alt="" /></Link>
                                                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{property.saleType}</div>
                                                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{property.propertyType}</div>
                                            </div>
                                            <div className="p-4 pb-0">
                                                <h5 className="text-primary mb-3">{property.price}</h5>
                                                <Link className="d-block h5 mb-2" to="">{property.title}</Link>
                                                <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{property.location}</p>
                                            </div>
                                            <div className="d-flex border-top">
                                                <small className="flex-fill text-center border-end py-2">{property.size} sqt</small>
                                                <small className="flex-fill text-center border-end py-2">{property.bedrooms} Beds</small>
                                                <small className="flex-fill text-center py-2">{property.bathrooms} Baths</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}

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

export default Rent;
