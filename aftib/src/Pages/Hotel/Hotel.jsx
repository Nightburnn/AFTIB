import React, { useState, useEffect } from 'react';
import FilterCard from '../../Components/FilterCard/FilterCard';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Hotel = () => {
    const [hotels, setHotels] = useState([]);
    const [filteredHotels, setFilteredHotels] = useState([]);
    const [location, setLocation] = useState('');
    const [searchClicked, setSearchClicked] = useState(false);
    const [currentSection, setCurrentSection] = useState(1);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');

    useEffect(() => {
        // Fetch default hotels when component mounts
        const fetchDefaultHotels = async () => {
            try {
                const response = await axios.get(`https://aftib-6o3h.onrender.com/hotel/getListings/${currentSection}`);
                console.log('Fetched default hotels:', response.data.listings); // Debugging line
                setHotels(response.data.listings);
            } catch (error) {
                console.error('Error fetching default listings:', error);
            }
        };
        fetchDefaultHotels();
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
            const response = await axios.get(`https://aftib-6o3h.onrender.com/hotel/searchListings?location=${location}&checkIn=${checkInDate}&checkOut=${checkOutDate}`);
            console.log('Fetched search results:', response.data); // Debugging line
            setFilteredHotels(response.data);
        } catch (error) {
            console.error('Error fetching listings:', error);
        }
    };

    const handleBrowseMore = async () => {
        try {
            const nextSection = currentSection + 1;
            const response = await axios.get(`https://aftib-6o3h.onrender.com/hotel/getListings/${nextSection}`);
            console.log('Fetched more hotels:', response.data.listings); // Debugging line
            setHotels([...hotels, ...response.data.listings]);
            setCurrentSection(nextSection);
        } catch (error) {
            console.error('Error fetching more listings:', error);
        }
    };

    const handleClearSearch = () => {
        setLocation('');
        setCheckInDate('');
        setCheckOutDate('');
        setSearchClicked(false);
        setFilteredHotels([]);
    };

    const hotelsToDisplay = searchClicked ? filteredHotels : hotels;

    return (
        <>
            <div className="row list">
                <div className="pListing">
                    <h2>Hotel Listings</h2>
                    <div className="p-item">
                        <form onSubmit={handleSearch} className="plisting-head me-3">
                            <input
                                type="text"
                                placeholder="Search for hotels by location"
                                value={location}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                            <input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                placeholder="Check-in Date"
                            />
                            <input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                placeholder="Check-out Date"
                            />
                            <button type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </div>

            <div className="content">
                <div className="filter-container">
                    {(hotels.length > 0 || filteredHotels.length > 0) && (
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
                                    <span id='filterNum'>{filteredHotels.length} Results Found!</span>
                                    <button className="btn clear" onClick={handleClearSearch}>Clear Search</button>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="tab-content">
                        <div id="tab-2" className={`tab-pane fade show active`}>
                            <div className="row g-4">
                                {hotelsToDisplay.map(hotel => (
                                    <div key={hotel._id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                                        <div className="hotel-item rounded overflow-hidden">
                                            <div className="position-relative overflow-hidden">
                                                <Link to=""><img className="img-fluid" src={hotel.images[0]} alt="" /></Link>
                                                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{hotel.rating} Stars</div>
                                                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{hotel.roomType}</div>
                                            </div>
                                            <div className="p-4 pb-0">
                                                <h5 className="text-primary mb-3">${hotel.price} per night</h5>
                                                <Link className="d-block h5 mb-2" to="">{hotel.name}</Link>
                                                <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{hotel.location}</p>
                                            </div>
                                            <div className="d-flex border-top">
                                                <small className="flex-fill text-center border-end py-2">{hotel.amenities.join(', ')}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}

                                <div className="col-12 text-center mt-5 mb-5">
                                    <button className="btn x py-3 px-5" onClick={handleBrowseMore}>Browse More Hotels</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Hotel;
