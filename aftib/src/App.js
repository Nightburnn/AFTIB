import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
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
import SingleAgentSection from './Pages/Agent/SingleAgentSection';
import Inbox from './Pages/Inbox/Inbox';
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

function App() {
  return (
    <AuthProvider>
      <LoadingContextProvider>
      <Router>
      <ScrollToTop />
        <Header/>
            <Routes>
                <Route  path="/" Component={Landing}/>
                <Route path='/about' Component={About}/>
                <Route  path='/buy' Component={Buy}/>
                <Route  path='/sell' Component={Sell}/>
                <Route  path='/rent' Component={Rent}/>
                <Route  path='/agent-finder' Component={Agent}/>
                <Route  path='/help' Component={Help}/>
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
                <Route path='/agent-dashboard' Component={AgentDashboard}/>
                <Route path='/forgot' Component={Forgot}/>
                <Route path='/agent-registration' Component={AgentRegistration}/>
                <Route path='/agent/:id' Component={SingleAgentSection} />
                <Route path='/review-agent' Component={AgentReview} />
                <Route path='/approve' Component={Approval} />
                <Route path='/hotellist' Component={HotelListing}/>
                <Route path='/change-password' Component={ChangePassword}/>
            </Routes>
            <Chatbot/>
            <Footer/>
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
