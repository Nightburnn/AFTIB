import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import ProfilePage from './PostPages/Account/ProfilePage';
import SingleAgentSection from './Pages/Agent/SingleAgentSection';
import Inbox from './Pages/Inbox/Inbox';
import Forgot from './Pages/ForgetPassword/Forgot';
import Listing from './Pages/Listing/Listing';
import ListingReview from './Pages/Listing/ListingReview';
import AdminProfile from './PostPages/Admin/AdminProfile';



function App() {
  return (
    <AuthProvider>
        <Router>
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
      <Route path='/list' Component={Listing}/>
      <Route path='/review' Component={ListingReview}/>
     <Route path='/forgot' Component={Forgot}/>
      <Route path='/agent/:id' Component={SingleAgentSection} />
      </Routes>
      <Chatbot/>
<Footer/>
  </Router>
    </AuthProvider>
  
  );
}

export default App;
