import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


// Public pages
import TMGFHomepage from './components/Home/TMGFHomepage';


import AdminRegister from './components/Authentication/Admin/AdminRegister';
import AdminLogin from './components/Authentication/Admin/AdminLogin';
import AdminDashboard from './components/Authentication/Admin/AdminDashboard';

import Login from './components/Authentication/Volunteer/Login';
import Registration from './components/Authentication/Volunteer/Registration';
import OrganizerView from './components/Features/Event/OrganizerView';
import VolunteerView from './components/Features/Event/VolunteerView';
import HelpSection from './components/Features/Help/HelpSection';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<TMGFHomepage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/Registration" element={<Registration/>} />
      
        <Route path="/volunteer-view/:userId" element={<VolunteerView/>} />
        <Route path="/organizer-view" element={<OrganizerView/>} />
         <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
         
         <Route path="/admin-dashboard/:uid" element={<AdminDashboard />} />
        
        
        <Route path="/help-section/:uid" element={<HelpSection/>} />
      </Routes>
    </Router>
  );
}

export default App;