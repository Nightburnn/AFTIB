import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useState} from 'react';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoadingContextProvider } from './Components/LoadingContext';
import useScrollToTop from './useScrollToTop';
import Header from './Components/Header/Header';
import Chatbot from './Pages/Help/Chatbot';
import Landing from './Pages/Landing/Landing';
import About from './Pages/About/About';
import Buy from './Pages/Buy/Buy';
import Sell from './Pages/Sell/Sell';
import Rent from './Pages/Rent/Rent';
import Agent from './Pages/Agent/Agent';
import Help from './Pages/Help/Help';
import Footer from './Components/Footer/Footer';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import { AuthProvider } from './AuthContext';
import HotelListing from './Pages/Hotel/HotelListing'
import ProfilePage from './PostPages/Account/ProfilePage';
import Inbox from './Pages/Inbox/Inbox';
import FaqSection from './Pages/Help/FaqSection';
import Forgot from './Pages/ForgetPassword/Forgot';
import Listing from './Pages/Listing/Listing';
import ListingReview from './Pages/Listing/ListingReview';
import AdminProfile from './PostPages/Admin/AdminProfile';
import Dashboard from './PostPages/Admin/Dashboard/Dashboard';
import ManageUser from './PostPages/Admin/ManageUser/ManageUser';
import Index from './Components/PropertyDetails';
import AgentRegistration from './Pages/AgentRegistration';
import Shortlet from './Pages/ShortLet/ShortLet';
import { ChangePassword } from './Pages/ForgetPassword/ChangePassword';
import AgentReview from './PostPages/Admin/Dashboard/AgentReview/AgentReview';
import Approval from './PostPages/Admin/AgentAproval/Approval';
import AgentDashboard from './PostPages/AgentPage/AgentDashboard/AgentDashboard';
import ClientDashboard from './PostPages/Client/ClientDashboard/ClientDashboard';
import AgentListingReview from './PostPages/Admin/Dashboard/ListingReview/AgentListingReview';
import HotelListingReview from './PostPages/Admin/Dashboard/HotelListingReview/HotelListingReview';
import Alrdetails from './PostPages/Admin/Dashboard/ListingReview/Alrdetails';
import Hlrdetails from './PostPages/Admin/Dashboard/HotelListingReview/Hlrdetails';
import AllAgent from './Pages/Agent/AllAgent';
import Vaa from './PostPages/Admin/Dashboard/ViewAgentApproved/Vaa';
import Vaadetails from './PostPages/Admin/Dashboard/ViewAgentApproved/Vaadetails';
import Val from './PostPages/Admin/Dashboard/ViewApprovedListing/Val';
import Valdetails from './PostPages/Admin/Dashboard/ViewApprovedListing/Valdetails';
import Vca from './PostPages/Admin/Dashboard/ViewClientApproved/Vca';
import Vcadetails from './PostPages/Admin/Dashboard/ViewClientApproved/Vcadetails';
import Transaction from './PostPages/Admin/Dashboard/TranscationReview.jsx/Transcation';


const faqData = [
  {
   
    title: 'Getting started',
    faqs: [
      {
        question: 'How do I create an account?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How can I reset my password?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How can I reset my password?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How can I reset my password?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How can I reset my password?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
  {
    
    title: 'Account Management',
    faqs: [
      {
        question: 'How do I update my profile information?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I close my account?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How can I change my email address?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How can I change my password?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I manage my notifications?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'Can I have multiple accounts?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I unsubscribe from emails?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
  {
    title: 'Reporting',
    faqs: [
      {
        question: 'How do I report a bug?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I report inappropriate content?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How can I provide feedback?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I report a security issue?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I report harassment or abuse?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I report a technical issue?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I report a copyright infringement?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I report a billing issue?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I report a violation of terms?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I report a privacy concern?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I report a scam or phishing attempt?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I report an error in the app?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
      {
        question: 'How do I report a broken feature?',
        answer: 'Answer. Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      },
    ],
  },
];



function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  return (
    <AuthProvider>
      <LoadingContextProvider>
      <Router>
      <ScrollToTop />
      <div className='app-wrapper'>
         <Header/>
         <main className="contenth">
          <Routes>
                <Route  path="/" Component={Landing}/>
                <Route path='/about' Component={About}/>
                <Route  path='/buy' Component={Buy}/>
                <Route  path='/sell' Component={Sell}/>
                <Route  path='/rent' Component={Rent}/>
                <Route  path='/agent-finder' Component={Agent}/>
                <Route  path='/help' element={<Help faqData={faqData} setSearchTerm={setSearchTerm} />}/>
                <Route path='/sign' Component={Signup}/>
                <Route path='/login' Component={Login}/>
                <Route path="/admin-profile" Component={AdminProfile}/>
                <Route path='/profile' Component={ProfilePage}/>
                <Route path='/inbox' Component={Inbox}/>
                <Route path='/admin-dashboard' Component={Dashboard}/>
                <Route path='/admin-users' Component={ManageUser}/>
                <Route path='/list' Component={Listing}/>
                <Route path='/review' Component={ListingReview}/>
                <Route path='/pd' Component={Index}/>
                <Route path='/short' Component={Shortlet}/>
                <Route path='/user-dashboard' Component={ClientDashboard}/>
                <Route path='/review-listings' Component={AgentListingReview}/>
                <Route path='/review-hotels' Component={HotelListingReview}/>
                <Route path='/agent-dashboard' Component={AgentDashboard}/>
                <Route path='/review-transactions' Component={Transaction}/>
                <Route path='/forgot' Component={Forgot}/>
                <Route path='/alrdetails' Component={Alrdetails}/>
                <Route path='/hlrdetails/:id' Component={Hlrdetails}/>
                <Route path='/alrdetails/:id' Component={Alrdetails}/>
                <Route path='/agent-registration' Component={AgentRegistration}/>
                <Route path='/all' Component={AllAgent}/>
                <Route path='/review-agent' Component={AgentReview} />
                <Route path='/view-approved-agent' Component={Vaa} />
                <Route path='/vaadetails' Component={Vaadetails} />
                <Route path='/view-approved-listings' Component={Val} />
                <Route path='/valdetails' Component={Valdetails} />
                <Route path='/approve/:id' Component={Approval} />
                <Route path='/hotellist' Component={HotelListing}/>
                <Route path='/faq/:id' element={<FaqSection searchTerm={searchTerm} faqData={faqData}  />}/>
                <Route path='/view-client-account' Component={Vca}/>
                <Route path='/vcadetails' Component={Vcadetails} />
                <Route path='/change-password' Component={ChangePassword}/>
                <Route path='/review/:id' Component={Approval}/>
            </Routes>
         </main>
            
            <Chatbot/>
            <Footer/>
      </div>
       
        </Router>  
        </LoadingContextProvider>
   
    </AuthProvider>
  );
}

function ScrollToTop() {
  useScrollToTop();
  return null;
}

export default App;
