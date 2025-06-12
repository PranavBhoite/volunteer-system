import './App.css';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";


// Public pages
import TMGFHomepage from './components/Home/TMGFHomepage';
import Login from './components/Authentication/Volunteer/Login';
import Registration from './components/Authentication/Volunteer/Registration';

// Dashboard layout
import DashboardLayout from './layouts/DashboardLayout';

function App() {
  return (
    <Router>
      <Routes>
        {/* ✅ Public routes without layout */}
        <Route path="/" element={<TMGFHomepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />

        {/* ✅ All dashboard-related routes go inside layout */}
        <Route path="/*" element={<DashboardLayout />} />
      </Routes>
    </Router>
  );
}

export default App;
