import React, { useEffect, useState } from "react";
import "./PropertyDetails.css";
import sh1 from "../../assets/images/sh1.png";
import sh2 from "../../assets/images/sh2.png";
import sh3 from "../../assets/images/sh3.png";
import { useParams, useNavigate } from "react-router-dom";
import { fetchListingById } from "../../utils/adminOpsRequests";
import { useLoading } from "../LoadingContext";
import { createTransaction } from "../../utils/transactionRequests";

const Index = () => {
  let navigate = useNavigate()
  let [listing,setListing] = useState({})
  let [agentData,setAgentData] = useState({})
  let [rentDate,setRentDate] = useState(new Date())
  let [shortletDate,setShortletDate] = useState(new Date())
  let [shortletDuration,setShortletDuration] = useState(1)
  let {setLoading,setLoadingText} = useLoading()
  let [actionText,setActionText] = useState('')
  let {id} = useParams()

  const getListing = async () => {
    try {
      const response = await Promise.resolve(fetchListingById(id));
      const data = response.listing;
      setListing(data)
      setAgentData(data.agentData)
      if(data.saleType === 'For Sale'){
        setActionText('Purchase This Property')
      }
      else if(data.saleType === 'For Rent'){
        setActionText('Proceed to Rent Property')
      }
      else {
        setActionText('Take This Short let')
      }
      console.log('data from listings',data)
    } catch (err) {
      console.error(err.message);
    }
  };
  console.log({id})
  useEffect(()=>{
    getListing()
  },[])
  const [selectedImage, setSelectedImage] = useState(0);
  async function reqFunction () {
    try {

    } 
    catch {

    }
    finally{
      setTimeout(()=>{
        setLoading(false)
        setLoadingText('')
      },3000)
    }
  }

  async function handleAction () {
    let transactionType;
    let rentDetails =  {
      startDate: '', // Start date of the rental
      totalMonths: 12, // Total number of months for the rental
      monthlyPayment: 0, // Total price of the rental
      totalPrice: 0
    }
    let shortLetDetails = {
      startDate: '', // Start date of the rental
      totalMonths: 0, // Total number of months for the shortlet
      monthlyPayment: 0, // Total price of the rental
      totalPrice: 0
    }
    let bookingDetails = {}
      if(listing.saleType === 'For Sale'){
        transactionType = 'propertyPurchase'
      }
      else if(listing.saleType === 'For Rent'){
        transactionType = 'propertyRental'
        rentDetails = {
          startDate: rentDate, // Start date of the rental
          totalMonths: 12, // Total number of months for the rental
          monthlyPayment: listing.monthlyRentPayment, // Total price of the rental
          totalPrice: listing.monthlyRentPayment * 12
        }
      }
      else {
        transactionType = 'propertyShortLet'
        shortLetDetails = {
          startDate: shortletDate, // Start date of the rental
          totalMonths: shortletDuration, // Total number of months for the rental
          monthlyPayment: listing.monthlyShortLetPrice, // Total price of the shortlet
          totalPrice: listing.monthlyShortLetPrice * shortletDuration
        }
      }
    try {
      setLoading(true)
      setLoadingText('Creating New Transaction. Please Wait...')
      let created = await Promise.resolve(createTransaction({propertyId:listing._id,transactionType,rentDetails,shortLetDetails,bookingDetails}))
      setLoadingText('Created Successfully',created)
      navigate(`/viewTransaction/${created.transaction.transactionId}?clientpov=true`)
    } 
    catch (err) {
      console.error(err.message)
    }
    finally{
      setTimeout(()=>{
        setLoading(false)
        setLoadingText('')
      },3000)
    }
  }
// check listing.agentData for agent info
  const contactInfo = {
    name: 'annabelle',
    imgSrc: sh1,
    description: '',
    details: [
      { label: "Phone:", value: '' },
      { label: "Mobile:", value: '' },
      { label: "Email:", value: '' },
    ],
    socials: [
      { href: "#", className: "bi bi-facebook", ariaLabel: "Facebook" },
      { href: "#", className: "bi bi-twitter", ariaLabel: "Twitter" },
      { href: "#", className: "bi bi-instagram", ariaLabel: "Instagram" },
      { href: "#", className: "bi bi-linkedin", ariaLabel: "LinkedIn" },
    ],
  };

  const amenities = []

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
      <h2 className="mb-3">{listing.title}</h2>
      <div className="galleryContainer">
        <div className="gallery">
          {listing.images? listing.images.map((image,index) => (
            <React.Fragment key={index}>
              <input
                type="radio"
                name="controls"
                id={index}
                checked={selectedImage === index}
                onChange={() => setSelectedImage(index)}
              />
              <img className="galleryImage" src={image} alt={'img'} />
            </React.Fragment>
          )): null}
        </div>
        <div className="thumbnails"> 
          {listing.images?listing.images.map((image,index) => (
            <label className="thumbnailImage" key={index} htmlFor={index}>
              <img src={image} className="img-responsive" alt={'img'} />
            </label>
          )): null}
        </div>

        <div className="form-group mb-3">
          <h3>Description</h3>
          <p>{listing.location}</p>
          {listing.description}
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
          <div className="action section">
          <div>
              {
                listing?.saleType == 'For Rent' ? (
                  <div>
                    <h4>Rent Details</h4>
                    <p><b>Monthly Rent Payment :</b> {listing.monthlyRentPayment}</p>
                    <p><b>Total Price :</b> {listing.monthlyRentPayment * 12}</p>
                    <p><b>Your Short Let would start on :</b> {rentDate.toString()}</p>
                    <p><b>Pick Another Date to Begin your rent.</b></p>
                    <p><input type="date" value={rentDate} onChange={(e)=>{setRentDate(e.target.value)}} /></p>
                  </div>
                ):null
              }              
            </div>
            <div>
              {
                listing?.saleType == 'Short Let' ? (
                  <div>
                    <h4>Short Let Details</h4>
                    <p><b>Duration: {shortletDuration} Month{shortletDuration>1?'s':''}</b></p>
                    <p><b>Monthly Rent Payment :</b> {listing.monthlyShortLetPrice}</p>
                    <p><b>Total Price :</b> {listing.monthlyShortLetPrice * Number(shortletDuration)}</p>
                    <p><b>Your Rent would Start on :</b> {rentDate.toString()}</p>
                    <p><b>Pick Another Date to Begin your rent.</b></p>
                    <p><input type="date" value={rentDate} onChange={(e)=>{setRentDate(e.target.value)}} /></p>
                    <p><b>How many months would you want to take this short let for. (A maximum of 6 months)</b></p>
                    <select onChange={e=>setShortletDuration(e.target.value)}>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                        <option>6</option>
                    </select>
                  </div>
                ):null
              }              
            </div>

              <button onClick={handleAction}>{actionText}</button>
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
