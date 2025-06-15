import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Public pages
import TMGFHomepage from './components/Home/TMGFHomepage';
import Login from './components/Authentication/Volunteer/Login';
import Registration from './components/Authentication/Volunteer/Registration';

// Admin pages
import AdminRegister from './components/Authentication/Admin/AdminRegister';
import AdminLogin from './components/Authentication/Admin/AdminLogin';
import HelpSection from './components/Help/HelpSection';

// Dashboard Layouts
import VolunteerDashboard from './components/Features/VolunteerDashboard/VolunteerDashboard';
import AdminDashboard from './components/Features/AdminDashboard/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<TMGFHomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* Admin routes */}
        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/help-section/:uid" element={<HelpSection />} />

        {/* Admin  dashboard layout*/}
        <Route path="/admin-dashboard/*" element={<AdminDashboard />} />

        {/* Volunteer dashboard and nested routes */}
        <Route path="/*" element={<VolunteerDashboard />} /> 


      </Routes>

      
    </Router>
  );
}


export default App;
