import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './components/Authentication/Volunteer/Registration';
import Login from './components/Authentication/Volunteer/Login';
import Dashboard from './components/Authentication/Volunteer/Dashboard';
import TMGFHomepage from './components/Home/TMGFHomepage';
import VolunteerView from './components/Event/VolunteerView';
import OrganizerView from './components/Event/OrganizerView';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<TMGFHomepage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/Registration" element={<Registration/>} />
        <Route path="/dashboard" element={<Dashboard/>} />
        <Route path="/volunteer-view" element={<VolunteerView/>} />
        <Route path="/organizer-view" element={<OrganizerView/>} />

      </Routes>
    </Router>
  );
}

export default App;
