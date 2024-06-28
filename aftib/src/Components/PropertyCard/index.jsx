import { Link } from "react-router-dom";
import "../../Pages/Buy/Buy.css";

export function PropertyCard(props) {
  let { property } = props;
  return (
    <div
      key={property._id}
      className="col-lg-4 col-md-6 wow fadeInUp"
      data-wow-delay="0.1s"
    >
      <div className="property-item rounded overflow-hidden">
        <div className="position-relative overflow-hidden">
          <Link to="">
            <img className="img-fluid" src={property.images[0]} alt="" />
          </Link>
          <div className="bg-primary rounded text-white position-absolute start-0 top-0 m-4 py-1 px-3">
            {property.saleType}
          </div>
          <div className="bg-white rounded-top brandblue position-absolute start-0 bottom-0 mx-4 pt-1 px-3">
            {property.propertyType}
          </div>
        </div>
        <div className="p-4 pb-0">
          <h5 className="brandblue mb-3">{property.price}</h5>
          <Link className="d-block h5 mb-2" to="">
            {property.title}
          </Link>
          <p className="text-start">
            <i className="fa fa-map-marker-alt brandblue me-2"></i>
            {property.location}
          </p>
          <div className="text-center">
            <Link to="/pd" className="btn blue mb-3" style={{ width: "100%" }}>
              View Details
            </Link>
          </div>{" "}
        </div>
        <div className="d-flex border-top">
          <small className="flex-fill text-center border-end py-2">
            {property.size} sqt
          </small>
          <small className="flex-fill text-center border-end py-2">
            {property.bedrooms} Beds
          </small>
          <small className="flex-fill text-center py-2">
            {property.bathrooms} Baths
          </small>
        </div>
      </div>
    </div>
  );
}
