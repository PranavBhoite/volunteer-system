import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Profile from './components/Profile/profile';



// Public pages
import TMGFHomepage from './components/Home/TMGFHomepage';
import Login from './components/Authentication/Volunteer/Login';
import Registration from './components/Authentication/Volunteer/Registration';

// Dashboard layout
import DashboardLayout from './components/Authentication/Volunteer/Dashboard/layouts/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public routes without layout */}
        <Route path="/" element={<TMGFHomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<Profile />} />


        {/* ✅ All dashboard-related routes go inside layout */}
        <Route path="/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
