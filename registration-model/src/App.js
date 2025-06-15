import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TMGFHomepage from './components/Home/TMGFHomepage';
import VolunteerView from './components/Event/VolunteerView';
import OrganizerView from './components/Event/OrganizerView';
import AdminRegister from './components/Authentication/Admin/AdminRegister';
import AdminLogin from './components/Authentication/Admin/AdminLogin';
import AdminDashboard from './components/Authentication/Admin/AdminDashboard';
import HelpSection from './components/Help/HelpSection';
import AllVolunteers from './components/Features/AdminDashboard/AllVolunteers/AllVolunteers';
import Login from './components/Authentication/Volunteer/Login';
import Registration from './components/Authentication/Volunteer/Registration';
import DashboardLayout from './components/Authentication/Volunteer/Dashboard/layouts/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<TMGFHomepage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/Registration" element={<Registration/>} />
        {/* <Route path="/dashboard/:userId" element={<Dashboard />} /> */}
        <Route path="/volunteer-view/:userId" element={<VolunteerView/>} />
        <Route path="/organizer-view" element={<OrganizerView/>} />
         <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
         <Route path="/admin-dashboard/:uid" element={<AdminDashboard />} />
        <Route path="/help-section/:uid" element={<HelpSection />} />
        <Route path="/allvolunteers" element={<AllVolunteers />} />
        <Route path="/" element={<TMGFHomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/*:userId" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;