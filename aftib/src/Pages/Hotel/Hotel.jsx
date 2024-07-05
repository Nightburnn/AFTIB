import React, { useState,useEffect } from "react";
import FilterCard from "../../Components/FilterCard/FilterCard";
import { Link } from "react-router-dom";
import sh1 from "../../assets/images/sh1.png";
import './Hotel.css';
import { fetchApprovedHotels } from "../../utils/adminOpsRequests";

const Hotel = () => {

  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [location, setLocation] = useState("");
  const [searchClicked, setSearchClicked] = useState(false);
  const getListing = async () => {
    try {
      const response = await Promise.resolve(fetchApprovedHotels(1));
      const data = response;
      setHotels(data.hotels)
      console.log('data from hotels',data)
    } catch (err) {
      console.error(err.message);
    }
  };
  useEffect(()=>{
    getListing()
  },[])

  function filterAmenities (array) {
    let filtered = []
    array.forEach(x=>{
      let name = Object.keys(x)[0]
      if(x[name] && filtered.length < 3){
        filtered.push(name)
      }
    })
    console.log({filtered})
    return filtered
  }

  const handleFilter = (filters) => {
    // Filter logic...
  };

  const handleSearch = (e) => {
    e.preventDefault() // Prevent default form submission
    if (!location.trim()) {
      // If location is empty, do not proceed
      return
    }
    setSearchClicked(true)
    const filtered = hotels.filter((hotel) =>
      hotel.location.toLowerCase().includes(location.toLowerCase())
    )
    setFilteredHotels(filtered)
  };

  const handleBrowseMore = () => {
    // Load more hotels logic (if pagination is required)
  };

  const handleClearSearch = () => {
    setLocation("");
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
                  <p className="me-3">
                    <i className="bi bi-funnel-fill"></i>Filter
                  </p>
                  <span id="filterNum">
                    {filteredHotels.length} Results Found!
                  </span>
                  <button className="btn clear" onClick={handleClearSearch}>
                    Clear Search
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="row hotelp">
            {hotels.map((hotel) => (
              <div
                key={hotel._id}
                className="col-12 wow fadeInUp"
                data-wow-delay="0.1s"
              >
                <div className="rooms__item row">
                  <div className="col-md-6">
                    <div className="rooms__pic">
                      <Link to="">
                        <img
                          className="img-fluid"
                          src={hotel.images[0]}
                          alt={hotel.name}
                        />
                      </Link>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="rooms__desc">
                      <div className="rooms_desc__header">
                        <h2 className="rooms_desc__title">{hotel.name}</h2>
                        <p className="rooms_desc__location">{hotel.location}</p>
                        <p className="rooms_desc__price">

                        </p>
                      </div>
                      <p className="rooms_desc__desc">{hotel.description}</p>
                      <div className="row">
                        <div className="col-sm-6">
                          <ul className="rooms_desc__services">
                          {filterAmenities(hotel.amenities).map((x,index)=>{
                            return <li key={index}>{x}</li>
                          })}
                          </ul>
                        </div>
                      </div>
                      <Link to={`/viewhotel/${hotel._id}`} className="btn btn-rooms">
                        View Hotel
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="col-12 text-center mt-5 mb-5">
              <button className="btn x py-3 px-5" onClick={handleBrowseMore}>
                Browse More Hotels
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hotel;
