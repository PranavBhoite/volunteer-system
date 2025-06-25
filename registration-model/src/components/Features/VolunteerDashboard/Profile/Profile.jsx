import React, { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const { uid } = useParams();
  const location = useLocation();

  const isActive = (path) => location.pathname.includes(path);

  const activeStyle = {
    background:
      "linear-gradient(90deg, rgba(150, 50, 85, 1) 24%, rgba(204, 47, 112, 1) 45%, rgba(171, 24, 85, 1) 62%)",
    boxShadow: "0 0 8px rgba(204, 47, 112, 0.4)",
    color: "white",
    width: "100%",
    padding: "6px 15px",
    boxSizing: "border-box",
  };

  const triggerHelpAction = (action) => {
    const event = new CustomEvent("help-action", { detail: action });
    window.dispatchEvent(event);
  };

  return (
    <>
      {/* Hamburger button for mobile */}
      <button
        aria-label="Toggle sidebar"
        onClick={toggleSidebar}
        className={`hamburger-btn ${isOpen ? "open" : ""}`}
      >
        <span />
        <span />
        <span />
      </button>

      {/* Sidebar container */}
      <div
        className={`sidebar d-flex flex-column p-3 bg-info text-white ${
          isOpen ? "sidebar-open" : ""
        }`}
      >
        {/* Logo */}
        <div className="text-center mb-4">
          <img
            src="/LOGO.png"
            alt="Logo"
            className="rounded"
            style={{ width: "120px", height: "auto" }}
          />
        </div>

        <ul className="nav flex-column gap-2 flex-grow-1">
          <li className="nav-item">
            <Link
              to={`/dashboard/${uid}/profile`}
              className="sidebar-button"
              style={
                location.pathname === `/dashboard/${uid}/profile`
                  ? activeStyle
                  : {}
              }
              onClick={() => isOpen && toggleSidebar()}
            >
              Profile
            </Link>
          </li>

          <li className="nav-item">
            <Link
              to={`/dashboard/${uid}/volunteer-view`}
              className="sidebar-button"
              style={
                location.pathname === `/dashboard/${uid}/volunteer-view`
                  ? activeStyle
                  : {}
              }
              onClick={() => isOpen && toggleSidebar()}
            >
              Event
            </Link>
          </li>

          <li className="nav-item">
            <button
              className="sidebar-button btn text-start w-100"
              onClick={() => setShowHelpDropdown(!showHelpDropdown)}
              style={isActive("help") ? activeStyle : {}}
            >
              Help
            </button>
            {showHelpDropdown && (
              <div className="d-flex flex-column gap-2 mt-2 ps-3">
                {["create", "approved", "disapproved"].map((action) => (
                  <button
                    key={action}
                    className="custom-tab-button text-start"
                    onClick={() => triggerHelpAction(action)}
                  >
                    {action.charAt(0).toUpperCase() + action.slice(1)}
                  </button>
                ))}
              </div>
            )}
          </li>
        </ul>

        {/* Mobile-only: Logout and Virtual ID inside sidebar */}
        <div className="mobile-extra-buttons mt-auto pt-3 border-top">
          <button
            className="sidebar-button"
            onClick={() => {
              alert("Virtual ID clicked! Implement your logic.");
              if (isOpen) toggleSidebar();
            }}
          >
            Virtual ID
          </button>
          <button
            className="sidebar-button"
            onClick={() => {
              alert("Logout clicked! Implement your logic.");
              if (isOpen) toggleSidebar();
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <style>{`
        /* Sidebar styles */
        .sidebar {
          width: 250px;
          height: 100vh;
          position: fixed;
          top: 0;
          left: 0;
          overflow-y: auto;
          transition: transform 0.3s ease;
          z-index: 999;
          background: #15b1d3;
          color: white;
          display: flex;
          flex-direction: column;
        }

        /* Sidebar buttons */
        .sidebar-button {
          text-decoration: none;
          color: white;
          padding: 6px 15px;
          display: flex;
          align-items: center;
          border-radius: 8px;
          transition: background 0.3s, transform 0.2s;
          cursor: pointer;
          font-weight: 600;
          width: 100%;
          box-sizing: border-box;
          background: transparent;
          border: none;
        }

        .sidebar-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateX(4px);
          color: white;
          text-decoration: none;
        }

        .custom-tab-button {
          background: transparent;
          border: none;
          color: white;
          font-weight: 500;
          padding: 8px 12px;
          border-bottom: 2px solid white;
          border-radius: 12px;
          transition: all 0.3s ease;
          cursor: pointer;
          text-transform: capitalize;
        }

        .custom-tab-button:hover {
          background-color: rgba(106, 75, 207, 0.35);
          transform: translateX(6px);
          color: white;
        }

        /* Hamburger button */
        .hamburger-btn {
          display: none;
          position: fixed;
          top: 15px;
          left: 15px;
          width: 40px;
          height: 30px;
          flex-direction: column;
          justify-content: space-between;
          background: transparent;
          border: none;
          cursor: pointer;
          z-index: 1100;
          padding: 0;
        }
        .hamburger-btn span {
          display: block;
          height: 4px;
          background: #15b1d3;
          border-radius: 2px;
          transition: all 0.3s ease;
          transform-origin: 4px 2px;
          width: 100%;
        }
        .hamburger-btn.open span:nth-child(1) {
          transform: rotate(45deg) translate(5px, 5px);
          background: #a70a4a;
        }
        .hamburger-btn.open span:nth-child(2) {
          opacity: 0;
        }
        .hamburger-btn.open span:nth-child(3) {
          transform: rotate(-45deg) translate(6px, -6px);
          background: #a70a4a;
        }

        /* Responsive behavior */
        @media (max-width: 768px) {
          .sidebar {
            transform: translateX(-100%);
            width: 80vw;
            max-width: 300px;
            background: #15b1d3;
          }
          .sidebar.sidebar-open {
            transform: translateX(0);
            box-shadow: 4px 0 12px rgba(0,0,0,0.2);
          }
          .hamburger-btn {
            display: flex;
          }
          /* Mobile-only extra buttons */
          .mobile-extra-buttons {
            display: flex;
            flex-direction: column;
            gap: 8px;
            padding-top: 1rem;
            border-top: 1px solid rgba(255,255,255,0.3);
          }
        }

        @media (min-width: 769px) {
          .mobile-extra-buttons {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
