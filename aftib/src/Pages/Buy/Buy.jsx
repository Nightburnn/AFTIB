import {useState, React} from 'react'
import Hero from '../../Components/Hero/Hero'
import {propertyData} from '../../Components/PropertyData/PropertyData';
import {buyData} from '../../Components/PropertyData/PropertyData';
import '../Rent/Rent.css'
import { Link } from 'react-router-dom'

const Buy = () => {
  const [activeTab, setActiveTab] = useState('tab-2');

  const handleTabChange = (tabId) => {
      setActiveTab(tabId);
  };

  return (
    <>
    <Hero/>
<div className="container-xxl py-5">
  <div className="container">
  <div className="row g-0 gx-5 align-items-end">
            <div className="col-lg-6">
                <div className="text-start mx-auto mb-5 wow slideInLeft" data-wow-delay="0.1s">
                    <h1 className="mb-3">Property Listing</h1>
                    <p>Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit diam justo sed rebum.</p>
                </div>
            </div>
            <div className="col-lg-6 text-start text-lg-end wow slideInRight" data-wow-delay="0.1s">
                <ul className="nav nav-pills d-inline-flex justify-content-end mb-5">
                    <li className="nav-item me-2">
                        <button
                            className={`btn btn-outline-primary ${activeTab === 'tab-1' ? 'active' : ''}`}
                            onClick={() => handleTabChange('tab-1')}
                        >
                            Featured
                        </button>
                    </li>
                    <li className="nav-item me-2">
                        <button
                            className={`btn btn-outline-primary ${activeTab === 'tab-2' ? 'active' : ''}`}
                            onClick={() => handleTabChange('tab-2')}
                        >
                            Buy
                        </button>
                    </li>
                    <li className="nav-item me-0">
                        <button
                            className={`btn btn-outline-primary ${activeTab === 'tab-3' ? 'active' : ''}`}
                            onClick={() => handleTabChange('tab-3')}
                        >
                            Rent
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <div className="tab-content">
        <div id="tab-1" className={`tab-pane fade ${activeTab === 'tab-1' ? 'show active' : ''}`} >
            <div className="row g-4">
                {propertyData.map(property => (
                    <div key={property.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="property-item rounded overflow-hidden">
                            <div className="position-relative overflow-hidden">
                                <Link href=""><img className="img-fluid" src={property.image} alt="" /></Link>
                                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{property.label}</div>
                                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{property.type}</div>
                            </div>
                            <div className="p-4 pb-0">
                                <h5 className="text-primary mb-3">{property.price}</h5>
                                <Link className="d-block h5 mb-2" href="">{property.title}</Link>
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
                <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                    <Link className="btn btn-primary py-3 px-5" href="">Browse More Property</Link>
                </div>
            </div>
        </div>

        <div id="tab-2" className={`tab-pane fade ${activeTab === 'tab-2' ? 'show active' : ''}`}>
        <div className="row g-4">
                {buyData.map(buy => (
                    <div key={buy.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="property-item rounded overflow-hidden">
                            <div className="position-relative overflow-hidden">
                                <Link href=""><img className="img-fluid" src={buy.image} alt="" /></Link>
                                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{buy.label}</div>
                                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{buy.type}</div>
                            </div>
                            <div className="p-4 pb-0">
                                <h5 className="text-primary mb-3">{buy.price}</h5>
                                <Link className="d-block h5 mb-2" href="">{buy.title}</Link>
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
                    <Link className="btn btn-primary py-3 px-5" href="">Browse More Property</Link>
                </div>
            </div>
        </div>

        <div id="tab-3" className={`tab-pane fade ${activeTab === 'tab-3' ? 'show active' : ''}`}>
        <div className="row g-4">
                {propertyData.map(property => (
                    <div key={property.id} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                        <div className="property-item rounded overflow-hidden">
                            <div className="position-relative overflow-hidden">
                                <Link href=""><img className="img-fluid" src={property.image} alt="" /></Link>
                                <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">{property.label}</div>
                                <div className="bg-white rounded-top text-primary position-absolute start-0 bottom-0 mx-4 pt-1 px-3">{property.type}</div>
                            </div>
                            <div className="p-4 pb-0">
                                <h5 className="text-primary mb-3">{property.price}</h5>
                                <Link className="d-block h5 mb-2" href="">{property.title}</Link>
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
                <div className="col-12 text-center wow fadeInUp" data-wow-delay="0.1s">
                    <Link className="btn btn-primary py-3 px-5" href="">Browse More Property</Link>
                </div>
            </div>
        </div>
        </div>
  </div>
</div>

    </>
  )
}

export default Buy