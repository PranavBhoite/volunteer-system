import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './components/Authentication/Volunteer/Registration';
import Login from './components/Authentication/Volunteer/Login';
import Dashboard from './components/Authentication/Volunteer/Dashboard';
import TMGFHomepage from './components/Home/TMGFHomepage';
import VolunteerView from './components/Event/VolunteerView';
import OrganizerView from './components/Event/OrganizerView';
import AdminRegister from './components/Authentication/Admin/AdminRegister';
import AdminLogin from './components/Authentication/Admin/AdminLogin';
import AdminDashboard from './components/Authentication/Admin/AdminDashboard';
import HelpSection from './components/Help/HelpSection';
import AllVolunteers from './components/Features/AdminDashboard/AllVolunteers/AllVolunteers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<TMGFHomepage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/Registration" element={<Registration/>} />
        <Route path="/dashboard/:userId" element={<Dashboard />} />
        <Route path="/volunteer-view/:userId" element={<VolunteerView/>} />
        <Route path="/organizer-view" element={<OrganizerView/>} />
         <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
         <Route path="/admin-dashboard/:uid" element={<AdminDashboard />} />
        <Route path="/help-section/:uid" element={<HelpSection />} />
        <Route path="/allvolunteers" element={<AllVolunteers />} />
      </Routes>
    </Router>
  );
}

export default App;