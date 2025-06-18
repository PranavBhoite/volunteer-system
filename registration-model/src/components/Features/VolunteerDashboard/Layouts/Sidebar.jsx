import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { FaUser, FaCalendarAlt, FaQuestionCircle } from "react-icons/fa";

export default function Sidebar() {
  const [showHelp, setShowHelp] = useState(false);
  const { uid } = useParams();
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  return (
    <nav
      className="d-flex flex-column bg-info text-white"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "250px",
        height: "100vh",
        paddingTop: "60px", // To NOT overlap header
        overflowY: "auto",
        zIndex: 1100, // Sidebar on top of header
      }}
    >
      <div className="text-center mb-4">
        <img src="/LOGO.png" alt="Logo" style={{ width: "120px", height: "auto" }} />
      </div>

      <Nav className="flex-column">
        <Nav.Item>
          <Nav.Link
            as={Link}
            to={`/dashboard/${uid}/profile`}
            className={`text-white d-flex align-items-center ${
              isActive("/profile") ? "bg-primary" : ""
            }`}
          >
            <FaUser className="me-2" />
            Profile
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <Nav.Link
            as={Link}
            to={`/dashboard/${uid}/volunteer-view`}
            className={`text-white d-flex align-items-center ${
              isActive("/volunteer-view") ? "bg-primary" : ""
            }`}
          >
            <FaCalendarAlt className="me-2" />
            Event
          </Nav.Link>
        </Nav.Item>

        <Nav.Item>
          <div
            className="text-white d-flex align-items-center"
            style={{ cursor: "pointer" }}
            onClick={() => setShowHelp((prev) => !prev)}
          >
            <FaQuestionCircle className="me-2" />
            Help
          </div>

          {showHelp && (
            <Nav className="flex-column ms-3 mt-2">
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to={`/dashboard/${uid}/help`}
                  className={`text-white ${isActive("/help") ? "bg-primary" : ""}`}
                >
                  Help Section
                </Nav.Link>
              </Nav.Item>
            </Nav>
          )}
        </Nav.Item>
      </Nav>
    </nav>
  );
}
