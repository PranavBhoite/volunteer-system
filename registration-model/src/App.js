import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import TMGFHomepage from './components/Home/TMGFHomepage';
import Login from './components/Authentication/Volunteer/Login'
import Registration from './components/Authentication/Volunteer/Registration'
import VolunteerDashboard from './components/Features/VolunteerDashboard/VolunteerDashboard';
import AdminDashboard from './components/Features/AdminDashboard/AdminDashboard';
import AdminRegister from './components/Authentication/Admin/AdminRegister';
import AdminLogin from './components/Authentication/Admin/AdminLogin';






// Import your actual components
import VolunteerView from './components/Features/VolunteerDashboard/Event/VolunteerView';
import Profile from './components/Features/VolunteerDashboard/Profile/Profile';
import HelpSection from './components/Features/VolunteerDashboard/Help/HelpSection';
import OrganizerView from './components/Features/AdminDashboard/Event/OrganizerView';
import AllVolunteers from './components/Features/AdminDashboard/VolunteerList/AllVolunteers';
import Help from './components/Features/AdminDashboard/Help/Help';
import HelpMe from './components/Features/VolunteerDashboard/HelpMe/HelpMe';
import Home from './components/Features/VolunteerDashboard/Home/Home';





function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TMGFHomepage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/Registration" element={<Registration/>} />

        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />

          <Route path="/admin-dashboard/:uid" element={<AdminDashboard />} >
            <Route path= "organizer-view" element={<OrganizerView />} />
            <Route path="allvolunteers" element={<AllVolunteers />} />
            <Route path="help" element={<Help/>} />
            <Route index element={<Navigate to= "allvolunteers" replace />} />
          </Route>

        {/* Volunteer Dashboard with nested routes */}
        <Route path="/dashboard/:uid" element={<VolunteerDashboard />}>
          {/* These are the nested routes that will render in the Outlet */}
          <Route path="profile" element={<Profile />} />
          <Route path="home" element={<Home/>}/>
          <Route path="volunteer-view" element={<VolunteerView />} />
          <Route path="help" element={<HelpSection />} />
          <Route path="help-me" element={<HelpMe />} />



          <Route index element={<Navigate to="Home" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;