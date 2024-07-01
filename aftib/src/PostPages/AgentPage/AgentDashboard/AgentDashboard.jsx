import React,{useState,useEffect} from "react";
import "../../Admin/Dashboard/Dash.css";
import { TfiPrinter } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { getAgencyRequestByToken, getAgentDashboardData } from "../../../utils/adminOpsRequests";


const approvalAndReviewData = [
  {
    icon: <TfiPrinter />,
    number: "2,345",
    title: "My Approved Listing",
    buttonText: "Review Request",
    link: "/agent/approvedlist",
  },
  {
    icon: <TfiPrinter />,
    number: "2,345",
    title: "My Approved Hotel",
    buttonText: "Review Hotel",
    link: "/agent/approvedhotels",
  },
  {
    icon: <TfiPrinter />,
    number: "2,345",
    title: "Pending Listing",
    buttonText: "Review Request",
    link: "/agent/pendinglist",
  },
  {
    icon: <TfiPrinter />,
    number: "2,345",
    title: "Pending Hotel",
    buttonText: "Review Hotel",
    link: "/agent/pendinghotels",
  },
];

const statisticsAndInfoData = [
  {
    icon: <TfiPrinter />,
    number: "2,345",
    title: "My Transaction",
    buttonText: "View Data",
    link: "/agent/transactions",
  },
  {
    icon: <TfiPrinter />,
    number: "2,345",
    title: "My Property Sales",
    buttonText: "View Data",
    link: "/agent/propertysales",
  },
  {
    icon: <TfiPrinter />,
    number: "2,345",
    title: "My Hotel Bookings",
    buttonText: "View Data",
    link: "/agent/hotelbookings",
  },
  {
    icon: <TfiPrinter />,
    number: "2,345",
    title: "My Property Rentals",
    buttonText: "View Data",
    link: "/agent/propertyrentals",
  },
];

const AgentDashboard = () => {
  let navigate = useNavigate()
  let [agentData,setAgentData] = useState({})
  let [dashboardData,setDashboardData] = useState({})
  let [hotels,setHotel] = useState([])
  let [listings,setListings] = useState([])
  let [message, setMessage] = useState('')
  const goToAgentRegistration = () =>{
    navigate('/agent-registration?edit=true')
  }
  function getApprovedCount(bool,array){
    return bool? array.filter(x=> x.approved ).length: array.filter(x=> !x.approved).length
  }
  async function getByToken(){
    try{
      let response = await getAgencyRequestByToken()
      // fill the other data
      setAgentData(response)
      console.log('data', response)    
        if(response.approvalState == 'rejected'){
        setMessage(response.rejectionMessage)
      }
      else if(response.approvalState == 'pending'){
        setMessage('Your request is currently being reviewed by the admins')
      }
      else {
        setMessage('You have been approved as an Agent.')
      }
    }
    catch(err){
      console.error(err.message)
    }
  }
  async function getByDashboardData(){
    try{
      let response = await getAgentDashboardData()
      // fill the other data
      setDashboardData(response)
      setHotel(response.hotels)
      setListings(response.listings)
      console.log('daashboardddddddddd', response)    
    }
    catch(err){
      console.error(err.message)
    }
  }
  useEffect(()=>{
      getByToken()
      getByDashboardData()
  },[])
  return (
    <div className="dash">
      <div className="container">
        <h1 className="my-4">Agent Dashboard</h1>

        <div className="card text-white mb-5">
          <h2 className="text-center">OverView</h2>
          <div className="white-container">
            <h3 className="text-center">
              <p>Approval Status : {String(agentData.approvalState).toUpperCase() ||''}</p>
              <p className="mt-2 agentred">Message: {message}</p>
              <button className="btn blue" onClick={goToAgentRegistration}>Edit Registration Details</button>
            </h3>
          </div>
          <div className="card-body">
            <div className="row">
            <div className="col-md-6 mb-4">
                  <div className="card text-dark bg-light h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="icon mr-3"><TfiPrinter /></div>
                        <div>
                          <h3>{getApprovedCount(true,listings)}</h3>
                          <p>My Approved Listing</p>
                        </div>
                      </div>
                      <Link to={'/agent/approvedlist'} className="btn blue btn-block mt-3">
                        View Your Approved Listings
                      </Link>
                    </div>
                  </div>
                </div>
            <div className="col-md-6 mb-4">
                  <div className="card text-dark bg-light h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="icon mr-3"><TfiPrinter /></div>
                        <div>
                          <h3>{getApprovedCount(true,hotels)}</h3>
                          <p>My Approved Hotels</p>
                        </div>
                      </div>
                      <Link to={'/agent/approvedhotels'} className="btn blue btn-block mt-3">
                        View Approved Hotels
                      </Link>
                    </div>
                  </div>
                </div>
            <div className="col-md-6 mb-4">
                  <div className="card text-dark bg-light h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="icon mr-3"><TfiPrinter /></div>
                        <div>
                          <h3>{getApprovedCount(false,listings)}</h3>
                          <p>Pending Listing</p>
                        </div>
                      </div>
                      <Link to={'/agent/pendinglist'} className="btn blue btn-block mt-3">
                        View Pending Listings
                      </Link>
                    </div>
                  </div>
                </div>
            <div className="col-md-6 mb-4">
                  <div className="card text-dark bg-light h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="icon mr-3"><TfiPrinter /></div>
                        <div>
                          <h3>{getApprovedCount(false,hotels)}</h3>
                          <p>Pending Hotels</p>
                        </div>
                      </div>
                      <Link to={'/agent/pendinghotels'} className="btn blue btn-block mt-3">
                        View Pending Hotels
                      </Link>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>

        {/* Statistics & Information Container */}
        <div className="card text-white mb-4">
          <h2 className="text-center">Statistics & Information</h2>
          <div className="card-body">
            <div className="row">
              {statisticsAndInfoData.map((item, idx) => (
                <div
                  className={`col-md-6 mb-4 ${idx === 4 ? "col-md-6" : ""}`}
                  key={idx}
                >
                  <div className="card text-dark bg-light h-100">
                    <div className="card-body">
                      <div className="d-flex align-items-center">
                        <div className="icon mr-3">{item.icon}</div>
                        <div>
                          <h3>{item.number}</h3>
                          <p>{item.title}</p>
                        </div>
                      </div>
                      <Link to={item.link} className="btn blue btn-block mt-3">
                        {item.buttonText}
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentDashboard;
