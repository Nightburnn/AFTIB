import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import React, { useState } from "react";
import { store } from "./store";
import { Provider } from "react-redux";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { LoadingContextProvider } from "./Components/LoadingContext";
import useScrollToTop from "./useScrollToTop";
import Header from "./Components/Header/Header";
import Chatbot from "./Pages/Help/Chatbot";
import Landing from "./Pages/Landing/Landing";
import About from "./Pages/About/About";
import Buy from "./Pages/Buy/Buy";
import Sell from "./Pages/Sell/Sell";
import Rent from "./Pages/Rent/Rent";
import Agent from "./Pages/Agent/Agent";
import Help from "./Pages/Help/Help";
import Footer from "./Components/Footer/Footer";
import Signup from "./Pages/Signup/Signup";
import Login from "./Pages/Login/Login";
import { AuthProvider } from "./AuthContext";
import HotelListing from "./Pages/Hotel/HotelListing";
import ProfilePage from "./PostPages/Account/ProfilePage";
import Inbox from "./Pages/Inbox/Inbox";
import FaqSection from "./Pages/Help/FaqSection";
import Forgot from "./Pages/ForgetPassword/Forgot";
import Listing from "./Pages/Listing/Listing";
import ListingReview from "./Pages/Listing/ListingReview";
import AdminProfile from "./PostPages/Admin/AdminProfile";
import Dashboard from "./PostPages/Admin/Dashboard/Dashboard";
import ManageUser from "./PostPages/Admin/ManageUser/ManageUser";
import Index from "./Components/PropertyDetails";
import AgentRegistration from "./Pages/AgentRegistration";
import Shortlet from "./Pages/ShortLet/ShortLet";
import { ChangePassword } from "./Pages/ForgetPassword/ChangePassword";
import AgentReview from "./PostPages/Admin/Dashboard/AgentReview/AgentReview";
import Approval from "./PostPages/Admin/AgentAproval/Approval";
import AgentDashboard from "./PostPages/AgentPage/AgentDashboard/AgentDashboard";
import ClientDashboard from "./PostPages/Client/ClientDashboard/ClientDashboard";
import AgentListingReview from "./PostPages/Admin/Dashboard/ListingReview/AgentListingReview";
import HotelListingReview from "./PostPages/Admin/Dashboard/HotelListingReview/HotelListingReview";
import Alrdetails from "./PostPages/Admin/Dashboard/ListingReview/Alrdetails";
import Hlrdetails from "./PostPages/Admin/Dashboard/HotelListingReview/Hlrdetails";
import AllAgent from "./Pages/Agent/AllAgent";
import Vaa from "./PostPages/Admin/Dashboard/ViewAgentApproved/Vaa";
import Vaadetails from "./PostPages/Admin/Dashboard/ViewAgentApproved/Vaadetails";
import Val from "./PostPages/Admin/Dashboard/ViewApprovedListing/Val";
import Valdetails from "./PostPages/Admin/Dashboard/ViewApprovedListing/Valdetails";
import Vca from "./PostPages/Admin/Dashboard/ViewClientApproved/Vca";
import Vcadetails from "./PostPages/Admin/Dashboard/ViewClientApproved/Vcadetails";
import Transaction from "./PostPages/Admin/Dashboard/TranscationReview.jsx/Transcation";
import Vha from "./PostPages/Admin/Dashboard/ViewHotelApproved/Vha";
import Vhadetails from "./PostPages/Admin/Dashboard/ViewHotelApproved/Vhadetails";
import Approvedhotelagent from "./PostPages/AgentPage/AgentDashboard/HotelAgent/Approvedhotelagent";
import Pendhotelagent from "./PostPages/AgentPage/AgentDashboard/HotelAgent/Pendhotelagent";
import { ClientPurchaseList } from "./Pages/ClientView/ClientPurchaseList";
import { ClientRentalList } from "./Pages/ClientView/ClientRentalList";
import { ClientShortletList } from "./Pages/ClientView/ClientShortletsList";
import { ClientReservationList } from "./Pages/ClientView/ClientReservation";
import { ClientTransactionList } from "./Pages/ClientView/ClientTransactionsList";
import { AgentApprovedHotels } from "./PostPages/AgentPage/AgentViews/AgentDashboard.ApprovedHotels";
import { AgentApprovedListings } from "./PostPages/AgentPage/AgentViews/AgentDashboard.ApprovedListing";
import { AgentHotelBookings } from "./PostPages/AgentPage/AgentViews/AgentDashboard.MyHotelBookings";
import { AgentPropertyRentals } from "./PostPages/AgentPage/AgentViews/AgentDashboard.MyRentals";
import { AgentPropertySales } from "./PostPages/AgentPage/AgentViews/AgentDashboard.MySales";
import { AgentPendingHotels } from "./PostPages/AgentPage/AgentViews/AgentDashboard.PendingHotels";
import { AgentPendingListings } from "./PostPages/AgentPage/AgentViews/AgentDashboard.PendingListings";
import { AgentTransactions } from "./PostPages/AgentPage/AgentViews/AgentDashboard.Transactions";

const faqData = [
  {
    title: "Getting started",
    faqs: [
      {
        question: 'How do I create an account?',
        answer: 'To create an account, go to the signup page and fill out the form with your details. Once you submit the form, you will receive a confirmation email.',
      },
      {
        question: 'How can I reset my password?',
        answer: 'To reset your password, click on the "Forgot Password" link on the login page and follow the instructions.',
      },
     
    ],
  },
  {
    title: "Account Management",
    faqs: [
      {
        question: 'How do I update my profile information?',
        answer: 'To update your profile information, go to the profile settings page and make the necessary changes.',
      },
     
     
      {
        question: 'How can I change my password?',
        answer: 'To change your password, go to the account settings page and update your password.',
      },
      {
        question: 'How do I manage my notifications?',
        answer: 'To manage your notifications, go to the notification settings page and adjust your preferences.',
      },
      {
        question: 'Can I have multiple accounts?',
        answer: 'No, our policy does not allow multiple accounts per user.',
      },
      
    ],
  },
  {
    title: "Reporting",
    faqs: [
      {
        question: 'How do I report a bug?',
        answer: 'To report a bug, contact our privacy team at privacy@example.com.',
      },
      {
        question: 'How do I report inappropriate content?',
        answer: 'To report a inappropriate content, contact our privacy team at privacy@example.com.',
      },
      {
        question: 'How can I provide feedback?',
        answer: 'To provide feedback, go to the feedback page and fill out the feedback form.',
      },
      {
        question: 'How do I report a security issue?',
        answer: 'To report a security issue, contact our security team at security@example.com.',
      },
    
     
      {
        question: 'How do I report a copyright infringement?',
        answer: 'To report a copyright infringement, contact our legal team at legal@example.com.',
      },
      {
        question: 'How do I report a billing issue?',
        answer: 'To report a billing issue, contact our billing support at billing@example.com.',
      },
      {
        question: 'How do I report a violation of terms?',
        answer: 'To report a violation of terms, contact our support team.',
      },
      {
        question: 'How do I report a privacy concern?',
        answer: 'To report a privacy concern, contact our privacy team at privacy@example.com.',
      },
      {
        question: 'How do I report a scam or phishing attempt?',
        answer: 'To report a scam or phishing attempt, forward the suspicious email to phishing@example.com.',
      },
      {
        question: 'How do I report an error in the app?',
        answer: 'To report an error in the app, contact our support team at support@example.com.',
      },
      {
        question: 'How do I report a broken feature?',
        answer: 'To report a broken feature in the app, contact our support team at support@example.com.',
      },
    ],
  },
];

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <Provider store={store}>
      <AuthProvider>
        <LoadingContextProvider>
          <Router>
            <ScrollToTop />
            <div className="app-wrapper">
              <Header />
              <main className="contenth">
                <Routes>
                  <Route path="/" Component={Landing} />
                  <Route path="/about" Component={About} />
                  <Route path="/buy" Component={Buy} />
                  <Route path="/sell" Component={Sell} />
                  <Route path="/rent" Component={Rent} />
                  <Route path="/agent-finder" Component={Agent} />
                  <Route
                    path="/help"
                    element={
                      <Help faqData={faqData} setSearchTerm={setSearchTerm} />
                    }
                  />
                  <Route path="/sign" Component={Signup} />
                  <Route path="/login" Component={Login} />
                  <Route path="/admin-profile" Component={AdminProfile} />
                  <Route path="/profile" Component={ProfilePage} />
                  <Route path="/inbox" Component={Inbox} />
                  <Route path="/admin-dashboard" Component={Dashboard} />
                  <Route path="/admin-users" Component={ManageUser} />
                  <Route path="/list" Component={Listing} />
                  <Route path="/review" Component={ListingReview} />
                  <Route path="/pd" Component={Index} />
                 
                  <Route path="/short" Component={Shortlet} />
                  <Route path="/user-dashboard" Component={ClientDashboard} />
                  <Route
                    path="/review-listings"
                    Component={AgentListingReview}
                  />
                  <Route path="/review-hotels" Component={HotelListingReview} />
                  <Route path="/agent-dashboard" Component={AgentDashboard} />
                  <Route path="/review-transactions" Component={Transaction} />
                  <Route path="/forgot" Component={Forgot} />
                  <Route path="/alrdetails" Component={Alrdetails} />
                  <Route path="/hlrdetails/:id" Component={Hlrdetails} />
                  <Route path="/alrdetails/:id" Component={Alrdetails} />
                  <Route
                    path="/agent-registration"
                    Component={AgentRegistration}
                  />
                  <Route path="/all" Component={AllAgent} />
                  <Route path="/review-agent" Component={AgentReview} />
                  <Route path="/view-approved-agent" Component={Vaa} />
                  <Route path="/vaadetails/:id" Component={Vaadetails} />
                  <Route path="/view-approved-listings" Component={Val} />
                  <Route path="/valdetails/:id" Component={Valdetails} />
                  <Route path="/approve/:id" Component={Approval} />
                  <Route path="/hotellist" Component={HotelListing} />
                  <Route
                    path="/faq/:id"
                    element={
                      <FaqSection searchTerm={searchTerm} faqData={faqData} />
                    }
                  />
                  <Route path="/view-client-account" Component={Vca} />
                  <Route path="/vcadetails" Component={Vcadetails} />
                  <Route path="/view-approved-hotels" Component={Vha} />
                  <Route path="/Vhadetails/:id" Component={Vhadetails} />
                  <Route path="/change-password" Component={ChangePassword} />
                  <Route path="/review/:id" Component={Approval} />
                  <Route
                    path="/approved-hotel"
                    Component={Approvedhotelagent}
                  />
                  <Route path="/pend-hotel" Component={Pendhotelagent} />
                  <Route
                    path="/client/purchaselist"
                    Component={ClientPurchaseList}
                  />
                  <Route
                    path="/client/hotelreservations"
                    Component={ClientReservationList}
                  />
                  <Route
                    path="/client/transactionslist"
                    Component={ClientTransactionList}
                  />
                  <Route
                    path="/client/shortletlist"
                    Component={ClientShortletList}
                  />
                  <Route
                    path="/client/rentallist"
                    Component={ClientRentalList}
                  />
                  <Route
                    path="/agent/approvedhotels"
                    Component={AgentApprovedHotels}
                  />
                  <Route
                    path="/agent/approvedlist"
                    Component={AgentApprovedListings}
                  />
                  <Route
                    path="/agent/pendinglist"
                    Component={AgentPendingListings}
                  />
                  <Route
                    path="/agent/pendinghotels"
                    Component={AgentPendingHotels}
                  />
                  <Route
                    path="/agent/propertysales"
                    Component={AgentPropertySales}
                  />
                  <Route
                    path="/agent/propertyrentals"
                    Component={AgentPropertyRentals}
                  />
                  <Route
                    path="/agent/transactions"
                    Component={AgentTransactions}
                  />
                  <Route
                    path="/agent/hotelbookings"
                    Component={AgentHotelBookings}
                  />
                </Routes>
              </main>

              <Chatbot />
              <Footer />
            </div>
          </Router>
        </LoadingContextProvider>
      </AuthProvider>
    </Provider>
  );
}

function ScrollToTop() {
  useScrollToTop();
  return null;
}

export default App;
