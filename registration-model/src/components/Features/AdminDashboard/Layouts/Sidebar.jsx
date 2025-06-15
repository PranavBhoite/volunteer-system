import { useState } from "react";
import { Link } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div className="d-flex flex-column p-3 bg-info text-white" style={{ width: "250px", height: "100vh" }}>
      <div className="text-center mb-4">
        <img src="/LOGO.png" alt="Logo" style={{ width: "120px", height: "auto" }} />
      </div>

      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <Link to="/admin-dashboard/allvolunteers" className="nav-link text-white hover-bg d-flex align-items-center">
            <FaUser className="me-2" /> Volunteer List
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/admin-dashboard/organizer-view"  className="nav-link text-white hover-bg d-flex align-items-center">
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
                <Link to="/admin-dashboard/help/create"  className="nav-link text-white hover-bg">Create</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin-dashboard/help/approved" className="nav-link text-white hover-bg">Approved</Link>
              </li>
              <li className="nav-item">
                <Link to="/admin-dashboard/help/disapproved" className="nav-link text-white hover-bg">Disapproved</Link>
              </li>
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
}