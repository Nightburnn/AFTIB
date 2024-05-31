import React, { useState } from 'react';
import { propertyData, buyData } from '../../Components/PropertyData/PropertyData';
import './Rent.css';
import { Link } from 'react-router-dom';
import FilterCard from '../../Components/FilterCard/FilterCard';

const Rent = () => {
    const [activeTab, setActiveTab] = useState('tab-2');
    const [filteredProperties, setFilteredProperties] = useState(propertyData);

    const handleTabChange = (tabId) => {
        setActiveTab(tabId);
        if (tabId === 'tab-1') {
            setFilteredProperties(propertyData);
        } else if (tabId === 'tab-2') {
            setFilteredProperties(buyData);
        } else if (tabId === 'tab-3') {
            setFilteredProperties(propertyData);
        }
    };

    const handleFilter = (filters) => {
        const { minPrice, maxPrice, beds, baths } = filters;
        setFilteredProperties(
            propertyData.filter((property) => {
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
                        <div id="tab-1" className={`tab-pane fade ${activeTab === 'tab-1' ? 'show active' : ''}`}>
                            <div className="row g-4">
                                {filteredProperties.map(property => (
                                    <div key={property.id} className="col-lg-4 col-md-6">
                                        <div className="property-item rounded overflow-hidden">
                                            <div className="position-relative overflow-hidden">
                                                <Link to=""><img className="img-fluid" src={property.image} alt="" /></Link>
                                                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{property.label}</div>
                                                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{property.type}</div>
                                            </div>
                                            <div className="p-4 pb-0">
                                                <h5 className="text-primary mb-3">{property.price}</h5>
                                                <Link className="d-block h5 mb-2" to="">{property.title}</Link>
                                                <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{property.location}</p>
                                            </div>
                                            <div className="d-flex border-top">
                                                <small className="flex-fill text-center border-end py-2">{property.sqft}</small>
                                                <small className="flex-fill text-center border-end py-2">{property.beds}</small>
                                                <small className="flex-fill text-center py-2">{property.baths}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="col-12 text-center">
                                    <Link className="btn btn-primary py-3 px-5" to="">Browse More Property</Link>
                                </div>
                            </div>
                        </div>

                        <div id="tab-2" className={`tab-pane fade ${activeTab === 'tab-2' ? 'show active' : ''}`}>
                            <div className="row g-4">
                                {filteredProperties.map(buy => (
                                    <div key={buy.id} className="col-lg-4 col-md-6">
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
                                <div className="col-12 text-center">
                                    <Link className="btn btn-primary py-3 px-5" to="">Browse More Property</Link>
                                </div>
                            </div>
                        </div>

                        <div id="tab-3" className={`tab-pane fade ${activeTab === 'tab-3' ? 'show active' : ''}`}>
                            <div className="row g-4">
                                {filteredProperties.map(property => (
                                    <div key={property.id} className="col-lg-4 col-md-6">
                                        <div className="property-item rounded overflow-hidden">
                                            <div className="position-relative overflow-hidden">
                                                <Link to=""><img className="img-fluid" src={property.image} alt="" /></Link>
                                                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{property.label}</div>
                                                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{property.type}</div>
                                            </div>
                                            <div className="p-4 pb-0">
                                                <h5 className="text-primary mb-3">{property.price}</h5>
                                                <Link className="d-block h5 mb-2" to="">{property.title}</Link>
                                                <p><i className="fa fa-map-marker-alt text-primary me-2"></i>{property.location}</p>
                                            </div>
                                            <div className="d-flex border-top">
                                                <small className="flex-fill text-center border-end py-2">{property.sqft}</small>
                                                <small className="flex-fill text-center border-end py-2">{property.beds}</small>
                                                <small className="flex-fill text-center py-2">{property.baths}</small>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                                <div className="col-12 text-center">
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

export default Rent;
