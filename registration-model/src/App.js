import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from './components/Authentication/Volunteer/Registration';
import Login from './components/Authentication/Volunteer/Login';
import Dashboard from './components/Authentication/Volunteer/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path = "/" element = {<Registration/>}/>
        <Route path="/login" element={<Login/>} />
        <Route path="/dashboard" element={<Dashboard/>} />

      </Routes>
    </Router>
  );
}

export default App;
