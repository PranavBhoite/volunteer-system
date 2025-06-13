import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Profile from './components/Profile/profile';



// Public pages
import TMGFHomepage from './components/Home/TMGFHomepage';
<<<<<<< HEAD
import VolunteerView from './components/Event/VolunteerView';
import OrganizerView from './components/Event/OrganizerView';
import AdminRegister from './components/Authentication/Admin/AdminRegister';
import AdminLogin from './components/Authentication/Admin/AdminLogin';
import AdminDashboard from './components/Authentication/Admin/AdminDashboard';
import HelpSection from './components/Help/HelpSection';
=======
import Login from './components/Authentication/Volunteer/Login';
import Registration from './components/Authentication/Volunteer/Registration';

// Dashboard layout
import DashboardLayout from './components/Authentication/Volunteer/Dashboard/layouts/DashboardLayout';
>>>>>>> caa20d14f0c5089db4c2764609c84d1b0860df31

function App() {
  return (
    <Router>
      <Routes>
<<<<<<< HEAD
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
=======
        {/* ✅ Public routes without layout */}
        <Route path="/" element={<TMGFHomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />


        {/* ✅ All dashboard-related routes go inside layout */}
        <Route path="/*" element={<DashboardLayout />} />
>>>>>>> caa20d14f0c5089db4c2764609c84d1b0860df31
      </Routes>
    </Router>
  );
}

export default App;