import React, { useState } from 'react';
import { buyData } from '../../Components/PropertyData/PropertyData';
import FilterCard from '../../Components/FilterCard/FilterCard';
import './Buy.css';
import { Link } from 'react-router-dom';

const Buy = () => {
  const [filteredProperties, setFilteredProperties] = useState(buyData);

  const handleFilter = (filters) => {
    const { minPrice, maxPrice, beds, baths } = filters;
    setFilteredProperties(
      buyData.filter((property) => {
        return (
          (!minPrice || property.price >= minPrice) &&
          (!maxPrice || property.price <= maxPrice) &&
          (beds === 'Any' || property.beds >= parseInt(beds)) &&
          (baths === 'Any' || property.baths >= parseInt(baths))
        );
      })
    );
  };

  return (
    <>
      <div className="row list">
        <div className="pListing">
          <h2>Property Listing</h2>
          <div className="p-item">
            <form action="#" className="plisting-head me-3">
              <input type="search" placeholder="Search for apartment based on location" />
              <button type="submit">Search</button>
            </form>
            <button className='p-btn'>Search</button>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="filter-container">
          <FilterCard onFilter={handleFilter} />
        </div>
      </div>

      <div className="container-xxl py-5">
        <div className="container">
          <div className="row g-0 gx-5 align-items-end">
            <div className="col-lg-6">
              <div className="text-start mx-auto mb-5 d-flex filter">
                <p className='me-3'><i className="bi bi-funnel-fill"></i>Filter</p>
                <span id='filterNum'>6 Results Found!</span>
              </div>
            </div>
          </div>

          <div className="tab-content">
            <div id="tab-2" className={`tab-pane fade show active`}>
              <div className="row g-4">
                {filteredProperties.map(buy => (
                  <div key={buy.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div className="property-item rounded overflow-hidden">
                      <div className="position-relative overflow-hidden">
                        <Link to=""><img className="img-fluid" src={buy.image} alt="" /></Link>
                        <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{buy.label}</div>
                        <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{buy.type}</div>
                      </div>
                      <div className="p-4 pb-0">
                        <h5 className="text-primary mb-3">{buy.price}</h5>
                        <Link className="d-block h5 mb-2" to="">{buy.title}</Link>
                        <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{buy.location}</p>
                      </div>
                      <div className="d-flex border-top">
                        <small className="flex-fill text-center border-end py-2">{buy.sqft}</small>
                        <small className="flex-fill text-center border-end py-2">{buy.beds}</small>
                        <small className="flex-fill text-center py-2">{buy.baths}</small>
                      </div>
                    </div>
                  </div>
                ))}
                <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                  <Link className="btn btn-primary py-3 px-5" to="">Browse More Property</Link>
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
