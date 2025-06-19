import { useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
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
    padding: "6px 15px",  // Reduced vertical padding here
    boxSizing: "border-box",
  };

  const triggerHelpAction = (action) => {
    const event = new CustomEvent("help-action", { detail: action });
    window.dispatchEvent(event);
  };

  return (
    <div
      className="d-flex flex-column p-3 bg-info text-white"
      style={{ width: "250px", height: "100vh", position: "fixed" }}
    >
      <div className="text-center mb-4">
        <img
          src="/LOGO.png"
          alt="Logo"
          className="rounded"
          style={{ width: "120px", height: "auto" }}
        />
      </div>

      <ul className="nav flex-column gap-2">
        <li className="nav-item">
          <Link
            to={`/dashboard/${uid}/profile`}
            className="sidebar-button"
            style={
              location.pathname === `/dashboard/${uid}/profile`
                ? activeStyle
                : {}
            }
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

      <style>{`
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

        .sidebar-button {
          text-decoration: none;
          color: white;
          padding: 6px 15px;  /* Reduced vertical padding */
          display: flex;
          align-items: center;
          border-radius: 8px;
          transition: background 0.3s, transform 0.2s;
          cursor: pointer;
          font-weight: 600;
          width: 100%;
          box-sizing: border-box;
        }

        .sidebar-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateX(4px);
        }
      `}</style>
    </div>
  );
}
