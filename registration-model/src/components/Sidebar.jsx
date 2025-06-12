import { Link } from "react-router-dom";
import "./Sidebar.css";
import { FaUser, FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/logo.png" alt="Logo" style={{ width: "120px", height: "auto" }} />
      </div>
      <nav>
        <Link to="/profile">
          <FaUser /> Profile
        </Link>

        <Link to="/event">
          <FaCalendarAlt /> Event
        </Link>

        {/* Dropdown for Help */}
        <details className="dropdown">
          <summary>
            <FaQuestionCircle /> Help
          </summary>
          <ul className="submenu">
            <li><Link to="/help/create">Create</Link></li>
            <li><Link to="/help/approved">Approved</Link></li>
            <li><Link to="/help/disapproved">Disapproved</Link></li>
          </ul>
        </details>
      </nav>
    </div>
  );
}
