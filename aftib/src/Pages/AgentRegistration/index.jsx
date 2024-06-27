import React, { useState } from 'react';
import './style.css';
import { useLoading } from '../../Components/LoadingContext';
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import axios from 'axios';
const AgentRegistration = () => {
    let token = window.localStorage.getItem('accessToken')
    let navigate = useNavigate()
    let [showModal,setShowModal] = useState(false)
    let [modalTitle,setModalTitle] = useState('')
    let [modalBody,setModalBody] = useState('')
    let { setLoading, setLoadingText } = useLoading()
    const [dob, setDob] = useState('');
    const [nin, setNin] = useState('');
    const [officeAddress, setOfficeAddress] = useState('');
    const [passportPhoto, setPassportPhoto] = useState(null);
    const [ninPicturePreview, setNinPicturePreview] = useState(null);
    const [passportPhotoPreview, setPassportPhotoPreview] = useState(null);
    const handleOk = () => {
        setShowModal(false);
        navigate('/')
      };
      const handleCancel = () => {
        setShowModal(false);
      };
    const handleNinPictureChange = (e) => {
      const file = e.target.files[0];
      console.log(file)
      setNinPicturePreview(URL.createObjectURL(file));
    };
  
    const handlePassportPhotoChange = (e) => {
      const file = e.target.files[0];
      console.log(file)
      setPassportPhoto(file);
      setPassportPhotoPreview(URL.createObjectURL(file));
    };
    const handleSubmit = async (e) => {
        e.preventDefault()
        setLoading(true)
        setLoadingText('Sending Request... Please Wait')
        e.preventDefault();
        const formData = new FormData();
        formData.append('files', passportPhoto);
        formData.append('officeAddress', officeAddress);
        formData.append('nin', nin);
    
        try {
          const response = await axios.post('http://127.0.0.1:8080/agentStatusRequest', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${token}`
              }
          });
            setLoading(false)
            setShowModal(true)
            setLoadingText('')
            setModalTitle('Successfully submitted Request to become an agent at Aftib. Our Admin would reveiw your details')
            setModalBody('An email would be sent to you to notify you if it has been approved or requires modification.')
          console.log('Form Data:', response.data);
          // Handle success response
        } catch (error) {
            setLoading(false)
            setLoadingText('')
            setModalTitle('Unable to send request')
            setModalBody('Reason' + error.message)
          console.error('Error submitting form:', error);
          // Handle error response
        }
      };
  return (
    <div className="agent-registration-container">
        <Modal title={modalTitle} open={showModal} onOk={handleOk} onCancel={handleCancel} cancelText={'Try Again'}>
        <p>{modalBody}</p>
      </Modal>
      <h1>Agent Registrations Form.</h1>
      <p>Kindly fill the form below and submit. Upon approval, you would be able to sell properties to our clients. Your request to be an Aftib Real Estate would be reviewed by the admins and</p>
        <p>
        Information to collect from the agent includes DOB, NIN number, NIN picture, Office Address, passport photograph
        </p>
        <div>
        <form className="agent-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="date"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="nin">NIN Number:</label>
        <input
          type="text"
          id="nin"
          value={nin}
          onChange={(e) => setNin(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="officeAddress">Office Address:</label>
        <input
          type="text"
          id="officeAddress"
          value={officeAddress}
          onChange={(e) => setOfficeAddress(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="passportPhoto">Passport Photograph:</label>
        <input
          type="file"
          id="passportPhoto"
          onChange={handlePassportPhotoChange}
        />
        {passportPhotoPreview && <img src={passportPhotoPreview} alt="Passport Preview" className="image-preview" />}
      </div>

      <button type="submit">Register</button>
    </form>
        </div>
    </div>
  );
};

export default AgentRegistration;
