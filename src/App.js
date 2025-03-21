import './App.css';
import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import { useAuthContext } from './Hooks/useAuthContext';

import Home from "./Pages/Home/Home"
import Navbar from './Components/Navbar/Navbar';
import Signup from './Pages/Signup/Signup';
import Login from './Pages/Login/Login';
import Entry from './Pages/EntryPage/Entry';
import FirstHome from './Pages/FirstHome/FirstHome';
import Footer from './Components/Footer/Footer';
import UserInputs from './Pages/UserInputs/UserInputs';
import Suggestions from './Pages/WorkoutSuggestions/Suggestions';
import Collections from './Pages/Collections/Collections';
import About from './Components/About/About';
import Contact from './Components/Contact/Contact';


function App() {
  const { user, isAuthLoaded } = useAuthContext();

  if (!isAuthLoaded) {
      return <div>Loading...</div>;
  }
  return (
    <div className="App" >
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Entry/>}/>
          <Route path="/firsthome" element={user ? <FirstHome/> : <Navigate to="/login"/>}/>
          <Route path="/signup" element={!user ? <Signup/> : <Navigate to= "/userinputs"/>}/>
          <Route path="/login" element={!user ? <Login/> : <Navigate to= "/firsthome"/>}/>
          <Route path='/home' element={user ? <Home/> : <Navigate to= "/"/>}/>
          <Route path="/userinputs" element={ user ? <UserInputs/> : <Navigate to= "/login"/> }/>
          <Route path="/suggestions" element={user ? <Suggestions/> : <Navigate to= "/login"/>}/>
          <Route path="/collections" element={user ? <Collections/> : <Navigate to= "/login"/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>

        </Routes> 
        <Footer/>
      </Router>

      
      
    </div>
  );
}

export default App;
