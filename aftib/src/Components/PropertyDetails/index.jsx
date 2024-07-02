import React, { useState } from "react";
import "./PropertyDetails.css";
import sh1 from "../../assets/images/sh1.png";
import sh2 from "../../assets/images/sh2.png";
import sh3 from "../../assets/images/sh3.png";

const Index = () => {
  const [selectedImage, setSelectedImage] = useState("c1");

  const images = [
    { id: "c1", src: sh1, alt: "Image 1" },
    { id: "c2", src: sh2, alt: "Image 2" },
    { id: "c3", src: sh3, alt: "Image 3" },
  ];

  const descriptions = [
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the when an printer took a galley of type and scrambled it to make.",
  ];

  const contactInfo = {
    name: "Anabella Geller",
    imgSrc: sh1,
    description:
      "Nulla porttitor accumsan tincidunt. Vestibulum ac diam sit amet quam vehicula elementum sed sit amet dui. Quisque velit nisi, pretium ut lacinia in, elementum id enim.",
    details: [
      { label: "Phone:", value: "(222) 4568932" },
      { label: "Mobile:", value: "777 287 378 737" },
      { label: "Email:", value: "annabella@example.com" },
      { label: "Skype:", value: "Annabela.ge" },
    ],
    socials: [
      { href: "#", className: "bi bi-facebook", ariaLabel: "Facebook" },
      { href: "#", className: "bi bi-twitter", ariaLabel: "Twitter" },
      { href: "#", className: "bi bi-instagram", ariaLabel: "Instagrasm" },
      { href: "#", className: "bi bi-linkedin", ariaLabel: "LinkedIn" },
    ],
  };

  const amenities = [
    "Balcony",
    "Outdoor Kitchen",
    "Cable Tv",
    "Deck",
    "Tennis Courts",
    "Internet",
    "Parking",
    "Sun Room",
    "Concrete Flooring",
  ];

  const summary = [
    { label: "Property ID:", value: "1134" },
    { label: "Location:", value: "Chicago, IL 606543" },
    { label: "Property Type:", value: "House" },
    { label: "Status:", value: "Sale" },
    { label: "Area:", value: "340m²" },
    { label: "Beds:", value: "4" },
    { label: "Baths:", value: "2" },
    { label: "Garage:", value: "1" },
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-3">Three bedroom apartment</h2>
      <div className="galleryContainer">
        <div className="gallery">
          {images.map((image) => (
            <React.Fragment key={image.id}>
              <input
                type="radio"
                name="controls"
                id={image.id}
                checked={selectedImage === image.id}
                onChange={() => setSelectedImage(image.id)}
              />
              <img className="galleryImage" src={image.src} alt={image.alt} />
            </React.Fragment>
          ))}
        </div>
        <div className="thumbnails">
          {images.map((image) => (
            <label className="thumbnailImage" key={image.id} htmlFor={image.id}>
              <img src={image.src} className="img-responsive" alt={image.alt} />
            </label>
          ))}
        </div>

        <div className="form-group mb-3">
          <h3>Description</h3>
          {descriptions.map((description, index) => (
            <p key={index}>{description}</p>
          ))}
        </div>

        <div className="row section-md-t3 justify-content-between amenities-summary-section">
          <div className="col-md-7 col-lg-7 amenities-section">
            <div className="title-box-d section-t3">
              <h3 className="title-a">Amenities</h3>
            </div>
            <div className="amenities-list color-text-a">
              <ul className="list-a no-margin d-flex flex-wrap-nowrap">
                {amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))}
              </ul>
            </div>

            <div className="amenities-list color-text-a mt-3">
              <h2>Additional Information</h2>
            </div>
          </div>
          <div className="col-md-4 col-lg-4 summary-section">
            <div className="property-summary">
              <div className="title-box-d section-t4">
                <h3 className="title-a">Quick Summary</h3>
              </div>
              <div className="summary-list">
                <ul className="list">
                  {summary.map((item, index) => (
                    <li key={index} className="d-flex justify-content-between">
                      <strong>{item.label}</strong>
                      <span>{item.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="col-md-12 pagent">
          <div className="row section-t3">
            <div className="col-sm-12">
              <div className="title-box-d">
                <h3 className="title-a">Contact Agent</h3>
              </div>
            </div>
          </div>
          <div className="row contact-agent-row">
            <div className="col-md-6 col-lg-4">
              <img
                src={contactInfo.imgSrc}
                alt=""
                className="img-fluid agent-img"
              />
            </div>
            <div className="col-md-6 col-lg-4">
              <div className="property-agent">
                <h4 className="title-agent">{contactInfo.name}</h4>
                <p className="color-text-a">{contactInfo.description}</p>
                <ul className="list-unstyled">
                  {contactInfo.details.map((detail, index) => (
                    <li className="d-flex justify-content-between" key={index}>
                      <strong>{detail.label}</strong>
                      <span className="color-text-a">{detail.value}</span>
                    </li>
                  ))}
                </ul>
                <div className="socials-a">
                  <ul className="list-inline">
                    {contactInfo.socials.map((social, index) => (
                      <li className="list-inline-item" key={index}>
                        <a href={social.href}>
                          <i
                            className={social.className}
                            aria-hidden="true"
                            aria-label={social.ariaLabel}
                          ></i>
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              <div className="property-contact">
                <form className="form-a">
                  <div className="row">
                    <div className="col-md-12 mb-1">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg form-control-a"
                          id="inputName"
                          placeholder="Name *"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12 mb-1">
                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-lg form-control-a"
                          id="inputEmail1"
                          placeholder="Email *"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="form-group">
                        <textarea
                          id="textMessage"
                          className="form-control"
                          placeholder="Comment *"
                          name="message"
                          cols="45"
                          rows="8"
                          required
                        ></textarea>
                      </div>
                    </div>
                    <div className="col-md-12 mt-1">
                      <button type="submit" className="btn btn-a">
                        Send Message
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
