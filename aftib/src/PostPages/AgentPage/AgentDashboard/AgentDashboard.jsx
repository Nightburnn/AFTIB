import React,{useState,useEffect} from "react";
import "../../Admin/Dashboard/Dash.css";
import { TfiPrinter } from "react-icons/tfi";
import { Link, useNavigate } from "react-router-dom";
import { getAgencyRequestByToken } from "../../../utils/adminOpsRequests";


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
  const goToAgentRegistration = () =>{
    navigate('/agent-registration?edit=true')
  }
  async function getByToken(){
    try{
      let response = await getAgencyRequestByToken()
      // fill the other data
      setAgentData(response)
      console.log('data', response)
    }
    catch(err){
      console.error(err.message)
    }
  }
  useEffect(()=>{
      getByToken()
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
              <p className="mt-2 agentred">Message:{String(agentData.rejectionMessage) || ''}</p>
              <button className="btn blue" onClick={goToAgentRegistration}>Edit Registration Details</button>
            </h3>
          </div>
          <div className="card-body">
            <div className="row">
              {approvalAndReviewData.map((item, idx) => (
                <div className="col-md-6 mb-4" key={idx}>
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
