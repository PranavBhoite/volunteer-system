import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import TMGFHomepage from './components/Home/TMGFHomepage';
import Login from './components/Authentication/Volunteer/Login'
import Registration from './components/Authentication/Volunteer/Registration'
import VolunteerDashboard from './components/Features/VolunteerDashboard/VolunteerDashboard';
import AdminDashboard from './components/Features/AdminDashboard/AdminDashboard';
import AdminRegister from './components/Authentication/Admin/AdminRegister';
import AdminLogin from './components/Authentication/Admin/AdminLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<TMGFHomepage/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/Registration" element={<Registration/>} />

        <Route path="/admin/register" element={<AdminRegister />} />
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/admin-dashboard/:uid/*" element={<AdminDashboard />} />

        <Route path="/dashboard/:uid/*" element={<VolunteerDashboard />} /> 
      </Routes>
    </Router>
  );
}

export default App;