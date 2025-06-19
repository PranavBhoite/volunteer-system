import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  const [showHelp, setShowHelp] = useState(false);
  const { uid } = useParams();
  const location = useLocation();

  // Function to check if link is active
  const isActive = (path) => {
    return location.pathname.includes(path);

  }
  // Active style for sidebar links
  const activeStyle = {
  background: 'linear-gradient(90deg, rgba(150, 50, 85, 1) 24%, rgba(204, 47, 112, 1) 45%, rgba(171, 24, 85, 1) 62%)',
  boxShadow: '0 0 8px rgba(204, 47, 112, 0.4)',
  color: 'white'
};

  
  

  return (
    //Logo

    <div className="d-flex flex-column p-3 bg-info text-white" style={{ width: "250px", height: "100vh" }}>
      <div className="text-center mb-4">
        <img src="/LOGO.png" alt="Logo" className="rounded" style={{ width: "120px", height: "auto" }} />
      </div>
      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <Link 
            to={`/dashboard/${uid}/profile`}
            className={`sidebar-button ${location.pathname === `/dashboard/${uid}/profile` ? 'active' : ''}`}
            style={location.pathname === `/dashboard/${uid}/profile` ? activeStyle : {}}
          >
            <FaUser className="me-2" /> Profile
          </Link>
        </li>
        
        <li className="nav-item">
          <Link 
            to={`/dashboard/${uid}/volunteer-view`}
            className={`sidebar-button ${location.pathname === `/dashboard/${uid}/profile` ? 'active' : ''}`}
            style={location.pathname === `/dashboard/${uid}/profile` ? activeStyle : {}}
          >
            <FaCalendarAlt className="me-2" /> Event
          </Link>
        </li>

        <li className="nav-item">
         <Link
           to={`/dashboard/${uid}/help`}
           className={`sidebar-button ${
           location.pathname === `/dashboard/${uid}/help` ? 'active' : ''
          }`}
          style={location.pathname === `/dashboard/${uid}/help` ? activeStyle : {}}
          >
          <FaQuestionCircle className="me-2" />
          Help
         </Link>
        </li>

       </ul>
          
        
      
    </div>
  );
}
