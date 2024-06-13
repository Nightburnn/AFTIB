import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Components/Header/Header';
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
      <Route path='/profile' Component={ProfilePage}/>
      <Route path="/agent/:id" component={SingleAgentSection} />
      </Routes>
<Footer/>
  </Router>
    </AuthProvider>
  
  );
}

export default App;
