import React, { useState,useEffect } from "react";
import "./style.css";
import { useLoading } from "../../Components/LoadingContext";
import { useNavigate } from "react-router-dom";
import { Modal } from "antd";
import { nigerianStateData } from ".././Listing/data";
import { useLocation } from "react-router-dom";
import {
  requestAgencyStatus,
  updateAgencyStatusIssuedId,
  updateAgencyStatusPassport,
  getAgencyRequestByToken
} from "../../utils/adminOpsRequests";

const AgentRegistration = () => {
  let token = window.localStorage.getItem("accessToken");
  const routeLocation = useLocation();
  const queryParams = new URLSearchParams(routeLocation.search);
  let edit = queryParams.get('edit') ? true : false
  let navigate = useNavigate();
  let [showModal, setShowModal] = useState(false);
  let [modalTitle, setModalTitle] = useState("");
  let [modalBody, setModalBody] = useState("");
  let { setLoading, setLoadingText } = useLoading();

  const [name, setName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsappNo, setWhatsappNo] = useState("");
  const [email, setEmail] = useState("");
  const [officeAddress, setOfficeAddress] = useState("");
  const [state, setState] = useState("Abia");
  const [LGA, setLGA] = useState("Aba North");
  const [about, setAbout] = useState("");
  const [CACRef, setCACRef] = useState("");
  const [ninNumber, setNinNumber] = useState("");
  const [facebookLink, setFacebookLink] = useState("");
  const [instagramLink, setInstagramLink] = useState("");
  const [twitterLink, setTwitterLink] = useState("");
  const [linkedIn, setLinkedIn] = useState("");
  const [agencyType, setAgencyType] = useState("");
  const [IssuedId, setIssuedId] = useState(null);
  const [passport, setPassport] = useState(null);
  const [issuedIdPreview, setIssuedIdPreview] = useState(null);
  const [passportPhotoPreview, setPassportPhotoPreview] = useState(null);
  async function getByToken(){
    try{
      let response = await getAgencyRequestByToken()
      // fill the other data
      setName(data.name)
      setBusinessName(data.businessName)
      console.log('data', response)
    }
    catch(err){
      console.error(err.message)
    }
  }
  useEffect(()=>{
    if(edit){
      getByToken()
    }
    else {
      
    }
  },[])
  // handle passport and issued id
  const handleIssuedIdChange = (e) => {
    const file = e.target.files[0];
    setIssuedId(file);
    setIssuedIdPreview(URL.createObjectURL(file));
  };
  const handlePassportPhotoChange = (e) => {
    const file = e.target.files[0];
    setPassport(file);
    setPassportPhotoPreview(URL.createObjectURL(file));
  };

  const updateName = (e) => {
    setName(e.target.value);
  };

  const updateBusinessName = (e) => {
    setBusinessName(e.target.value);
  };

  const updatePhone = (e) => {
    setPhone(e.target.value);
  };

  const updateWhatsappNo = (e) => {
    setWhatsappNo(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };

  const updateOfficeAddress = (e) => {
    setOfficeAddress(e.target.value);
  };

  const updateState = (e) => {
    setState(e.target.value);
  };

  const updateLGA = (e) => {
    setLGA(e.target.value);
  };
  const updateAbout = (e) => {
    setAbout(e.target.value);
  };
  const updateAgencyType = (e) => {
    setAgencyType(e.target.value);
  };
  const updateCACRef = (e) => {
    setCACRef(e.target.value);
  };
  const updateIssuedId = (e) => {
    setIssuedId(e.target.value);
  };
  const updateNinNumber = (e) => {
    setNinNumber(e.target.value);
  };
  const updateFacebookLink = (e) => {
    setFacebookLink(e.target.value);
  };
  const updateInstagramLink = (e) => {
    setInstagramLink(e.target.value);
  };
  const updateTwitterLink = (e) => {
    setTwitterLink(e.target.value);
  };
  const updateLinkedIn = (e) => {
    setLinkedIn(e.target.value);
  };

  const handleOk = () => {
    setShowModal(false);
    navigate("/");
  };
  const handleCancel = () => {
    setShowModal(false);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setLoadingText("Sending Request... Please Wait");
    e.preventDefault();

    try {
      setLoadingText("Initializing");
      let reqBody1 = {
        name,
        businessName,
        phone,
        whatsappNo,
        email,
        officeAddress,
        state,
        LGA,
        about,
        CACRef,
        ninNumber,
        facebookLink,
        instagramLink,
        twitterLink,
        linkedIn,
        agencyType,
      };
      let formData1 = new FormData();
      formData1.append("files", IssuedId);
      let formData2 = new FormData();
      formData2.append("files", passport);
      let initialize = await requestAgencyStatus(reqBody1, token);
      let uploadPassport;
      let uploadId;
      console.log({ initialize });
      if (passport) {
        setLoadingText("Uploading Passport Photo");
        uploadPassport = await updateAgencyStatusPassport(formData2, token);
        console.log({ uploadPassport });
      }
      if (IssuedId) {
        setLoadingText("Uploading Issued Id");
        uploadId = await updateAgencyStatusIssuedId(formData1, token);
        console.log({ uploadId });
      }
      setLoadingText("");
      setLoading(false);
      setShowModal(true);
      setModalTitle(
        "Successfully submitted Request to become an agent at Aftib. Our Admin would reveiw your details",
      );
      setModalBody(
        "An email would be sent to you to notify you if it has been approved or requires modification.",
      );
      // Handle success response
    } catch (error) {
      setLoading(false);
      setLoadingText("");
      setModalTitle("Unable to send request");
      setModalBody("Reason: " + error.message);
      console.error("Error submitting form:", error);
      // Handle error response
    }
  };
  return (
    <div className="agent-registration-container">
      <Modal
        title={modalTitle}
        open={showModal}
        onOk={handleOk}
        onCancel={handleCancel}
        cancelText={"Try Again"}
      >
        <p>{modalBody}</p>
      </Modal>
      <h1 className="text-center">Agent Registrations Form.</h1>
      <p className="text-center">
        Kindly fill the form below and submit. Your request would be reviewed by
        the admins. A response would be sent within 1 - 24 hours
      </p>
      <div>
        <form className="agent-form" onSubmit={handleSubmit}>
          <div className="row">
            <h3 className="text-center mb-4">Profile</h3>
            <div className="col-md-6">
              <div className="mb-3 ">
                <label for="" className="form-label">
                  Full Name *
                </label>
                <input
                  className="form-control"
                  name="name"
                  placeholder="e.g Musa Adamu (Name and Surname)"
                  type="text"
                  required="required"
                  value={name}
                  onChange={updateName}
                />
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3 ">
                <label for="" className="form-label">
                  Business Name
                </label>
                <input
                  className="form-control"
                  name="businessName"
                  placeholder="e.g Properties Limited"
                  type="text"
                  required="required"
                  value={businessName}
                  onChange={updateBusinessName}
                />
              </div>
            </div>
          </div>
          <hr className="my-4" />

          <div className="personal-detail mt-4">
            <h3 classNameName="text-start mb-3">Contact Info</h3>
            <div className="row">
              <div className="col-md-4">
                <div className="mb-3 ">
                  <label for="" className="form-label">
                    Phone Number
                  </label>
                  <input
                    className="form-control"
                    name="phone"
                    placeholder=""
                    type="number"
                    pattern="[0-9+]+"
                    required="required"
                    value={phone}
                    onChange={updatePhone}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3 ">
                  <label for="" className="form-label">
                    Whatsapp Number (Digits only)
                  </label>
                  <input
                    className="form-control"
                    name="whatsapp"
                    placeholder=""
                    type="number"
                    pattern="[0-9+]+"
                    required="required"
                    value={whatsappNo}
                    onChange={updateWhatsappNo}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <div className="mb-3 ">
                  <label for="" className="form-label">
                    Email Address *
                  </label>
                  <input
                    className="form-control"
                    name="email"
                    placeholder="e.g musa@gmail.com"
                    type="text"
                    required="required"
                    value={email}
                    onChange={updateEmail}
                  />
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <div className="personal-detail">
            <h3>Address</h3>
            <div className="row" id="officeDiv">
              <div className="col-md-12">
                <div className="mb-3 ">
                  <label for="" className="form-label">
                    Your office address
                  </label>
                  <input
                    className="form-control"
                    name="addressStreet"
                    placeholder="e.g No 28 Toyin Street, Ikeja"
                    type="text"
                    required="true"
                    value={officeAddress}
                    onChange={updateOfficeAddress}
                  />
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 ">
                  <label for="" className="form-label">
                    Office State
                  </label>
                  <select
                    className="form-control"
                    name="state"
                    id="state"
                    value={state}
                    onChange={updateState}
                  >
                    {Object.keys(nigerianStateData).map((x) => {
                      return <option>{x}</option>;
                    })}
                  </select>
                  <span className="help-block"></span>
                </div>
              </div>
              <div className="col-md-6">
                <div className="mb-3 ">
                  <label for="" className="form-label">
                    Office LGA
                  </label>
                  <select
                    className="form-control"
                    name="LGA"
                    id="LGA"
                    value={LGA}
                    onChange={updateLGA}
                  >
                    {nigerianStateData[state].map((x) => {
                      return <option>{x}</option>;
                    })}
                  </select>

                  <span className="help-block"></span>
                </div>
              </div>
            </div>
          </div>

          <hr className="my-4" />

          <div className="personal-detail">
            <h3>How do you operate as an agent?</h3>

            <div class="form-group">
              <div style={{ marginBottom: "10px" }}>
                <label>
                  <input
                    type="radio"
                    value="Company"
                    checked={agencyType === "Company"}
                    onChange={updateAgencyType}
                    style={{ marginRight: "5px" }}
                  />
                  As a registered company.
                </label>
              </div>
              <div style={{ marginBottom: "10px" }}>
                <label>
                  <input
                    type="radio"
                    value="Individual"
                    checked={agencyType === "Individual"}
                    onChange={updateAgencyType}
                    style={{ marginRight: "5px" }}
                  />
                  As an Individual
                </label>
              </div>
            </div>

            <h3>About your organization</h3>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3 ">
                  <textarea
                    name="about"
                    id="profile-text-area"
                    className="form-control height-100"
                    rows="3"
                    placeholder="Describe your organization"
                    value={about}
                    onChange={updateAbout}
                  ></textarea>
                  <span className="help-block"></span>
                </div>
              </div>
            </div>
          </div>

          <hr classNameName="my-4" />
          <div className="personal-detail">
            <h3>Identification</h3>
            <div className="row">
              {agencyType === "Individual" ? (
                <div className="col-md-12">
                  <div className="mb-3 ">
                    <label for="" className="form-label">
                      Add your NIN number
                    </label>
                    <input
                      className="form-control"
                      name="name"
                      placeholder="01234567891"
                      type="text"
                      required="required"
                      value={ninNumber}
                      onChange={updateNinNumber}
                    />
                  </div>
                </div>
              ) : (
                <div className="col-md-12">
                  <div className="mb-3 ">
                    <label for="" className="form-label">
                      Add your companies CAC number
                    </label>
                    <input
                      className="form-control"
                      name="name"
                      placeholder="01234567891"
                      type="text"
                      required="required"
                      value={CACRef}
                      onChange={updateCACRef}
                    />
                  </div>
                </div>
              )}
            </div>
            <div className="row">
              <div className="col-md-12">
                <div className="mb-3">
                  <div className="file-upload-single file-profile">
                    <div className="file-link">
                      <i className="loader fa fa-circle-o-notch fa-spin"></i>
                      Govt. Issued ID:
                      <span></span>
                    </div>
                    <input
                      name="issueId"
                      id="file_personal_id"
                      type="file"
                      placeholder="Add Govt. Issued ID"
                      data-aid="117062"
                      data-kind="personal_id"
                      className="docUpload form-control height-auto"
                      onChange={handleIssuedIdChange}
                    />
                    {issuedIdPreview && (
                      <img
                        src={issuedIdPreview}
                        alt="ID Preview"
                        className="image-preview"
                      />
                    )}
                  </div>
                </div>

                <div classNameName="my-5" />

                <div className="mb-3">
                  <div className="file-upload-single file-profile">
                    <div className="file-link">
                      <i className="loader fa fa-circle-o-notch fa-spin"></i>
                      Passport Photo:
                      <span></span>
                    </div>
                    <input
                      onChange={handlePassportPhotoChange}
                      name="passport"
                      id="file_selfie"
                      type="file"
                      placeholder="Add Passport Photo"
                      className="docUpload form-control height-auto"
                    />
                    {passport && (
                      <img
                        src={passportPhotoPreview}
                        alt="NIN Preview"
                        className="image-preview"
                      />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div classNameName="my-5" />
          <div className="personal-detail">
            <h3>Social media</h3>
            <div className="row">
              <div className="col-md-3">
                <div className="mb-3 ">
                  <label for="" className="form-label">
                    Facebook
                  </label>
                  <input
                    className="form-control"
                    name="facebook"
                    placeholder="facebook.com/johndoe"
                    type="text"
                    value={facebookLink}
                    onChange={updateFacebookLink}
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="mb-3 ">
                  <label for="" className="form-label">
                    Twitter
                  </label>
                  <input
                    className="form-control"
                    name="twitter"
                    value={twitterLink}
                    onChange={updateTwitterLink}
                    placeholder="twitter.com/johndoe"
                    type="text"
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="mb-3 ">
                  <label for="" className="form-label">
                    LinkedIn
                  </label>
                  <input
                    className="form-control"
                    name="linkedin"
                    value={linkedIn}
                    onChange={updateLinkedIn}
                    placeholder="linkedin.com/johndoe"
                    type="text"
                  />
                </div>
              </div>

              <div className="col-md-3">
                <div className="mb-3 ">
                  <label for="" className="form-label">
                    Instagram
                  </label>
                  <input
                    className="form-control"
                    name="instagram"
                    value={instagramLink}
                    onChange={updateInstagramLink}
                    placeholder="instagram.com/johndoe"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
          {
            edit ? <button type="submit">Update Data</button> : <button type="submit">Register</button>
          }
          
        </form>
      </div>
    </div>
  );
};

export default AgentRegistration;
