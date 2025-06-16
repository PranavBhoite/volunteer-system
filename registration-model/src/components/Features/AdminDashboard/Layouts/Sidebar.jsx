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
  };


  return (
    <div className="d-flex flex-column p-3 bg-info text-white" style={{ width: "250px", height: "100vh" }}>
      <div className="text-center mb-4">
        <img src="/LOGO.png" alt="Logo" style={{ width: "120px", height: "auto" }} />
      </div>

      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <Link to={`/admin-dashboard/${uid}/allvolunteers`} 
          className={`nav-link text-white hover-bg d-flex align-items-center ${isActive('/profile') ? 'bg-primary' : ''}`}
          >
            <FaUser className="me-2" /> Volunteer List
          </Link>
        </li>
        <li className="nav-item">
          <Link to={`/admin-dashboard/${uid}/organizer-view`}  
            className={`nav-link text-white hover-bg d-flex align-items-center ${isActive('/profile') ? 'bg-primary' : ''}`}
            >
            <FaCalendarAlt className="me-2" /> Event
          </Link>
        </li>

        <li className="nav-item">
          <div
            className="nav-link text-white hover-bg d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => setShowHelp(!showHelp)}
          >
            <FaQuestionCircle className="me-2" /> Help
          </div>

          {showHelp && (
            <ul className="nav flex-column ms-3 mt-2">
              <li className="nav-item">
                <Link 
                  to={`/admin-dashboard/${uid}/help`} 
                  className={`nav-link text-white hover-bg ${isActive('/help') ? 'bg-primary' : ''}`}
                >
                  Help Section
                </Link>
              </li>
              {/* Add more help-related routes if needed */}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}