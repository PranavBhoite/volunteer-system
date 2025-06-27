import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { FaUser, FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  const { uid } = useParams();
  const location = useLocation();

  // Active style for sidebar links
  const activeStyle = {
    background: 'linear-gradient(90deg, rgba(150, 50, 85, 1) 24%, rgba(204, 47, 112, 1) 45%, rgba(171, 24, 85, 1) 62%)',
    boxShadow: '0 0 8px rgba(204, 47, 112, 0.4)',
    color: 'white'
  };

  return (
    <div className="d-flex flex-column p-3 bg-info text-white" style={{ width: "250px", height: "100vh" }}>
      <div className="text-center mb-4">
        <img src="/LOGO.png" alt="Logo" className="rounded" style={{ width: "120px", height: "auto" }} />
      </div>

      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <Link
            to={`/admin-dashboard/${uid}/allvolunteers`}
            className="sidebar-button"
            style={location.pathname === `/admin-dashboard/${uid}/allvolunteers` ? activeStyle : {}}
          >
            <FaUser className="me-2" /> Volunteer List
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/admin-dashboard/${uid}/organizer-view`}
            className="sidebar-button"
            style={location.pathname === `/admin-dashboard/${uid}/organizer-view` ? activeStyle : {}}
          >
            <FaCalendarAlt className="me-2" /> Event
          </Link>
        </li>

        <li className="nav-item">
          <Link
            to={`/admin-dashboard/${uid}/help`}
            className="sidebar-button"
            style={location.pathname === `/admin-dashboard/${uid}/help` ? activeStyle : {}}
          >
            <FaQuestionCircle className="me-2" /> Help
          </Link>
        </li>
      </ul>
    </div>
  );
}
