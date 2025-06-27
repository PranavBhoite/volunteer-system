import { useState, useEffect } from "react";
import { useParams, useLocation, NavLink } from "react-router-dom";
import {
  FaUser,
  FaHome,
  FaCalendarAlt,
  FaQuestionCircle,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { BsClipboardCheckFill } from "react-icons/bs";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Sidebar() {
  const { uid } = useParams();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const activeStyle = {
    background: "linear-gradient(90deg, rgb(150, 50, 85), rgba(204, 47, 112, 1))",
    boxShadow: "0 0 8px rgba(204, 47, 112, 0.4)",
    color: "white",
  };

  const defaultStyle = {
    backgroundColor: "rgba(180, 234, 241, 0.2)",
    color: "white",
  };

  const links = [
    { to: `/dashboard/${uid}/profile`, label: "Profile", icon: <FaUser className="me-2" /> },
    { to: `/dashboard/${uid}/home`, label: "Home", icon: <FaHome className="me-2" /> },
    { to: `/dashboard/${uid}/volunteer-view`, label: "Event", icon: <FaCalendarAlt className="me-2" /> },
    { to: `/dashboard/${uid}/help`, label: "Event Initiatives", icon: <BsClipboardCheckFill className="me-2" /> },
    { to: `/dashboard/${uid}/help-me`, label: "Help", icon: <FaQuestionCircle className="me-2" /> },
  ];

  return (
    <>
      {windowWidth < 768 && !isSidebarOpen && (
        <button
          className="btn btn-light m-2 position-fixed"
          style={{ zIndex: 2001 }}
          onClick={() => setIsSidebarOpen(true)}
        >
          <FaBars style={{ color: "#a70a4a" }} />
        </button>
      )}

      {(isSidebarOpen || windowWidth >= 768) && (
        <div
          className="d-flex flex-column p-3 bg-info text-white position-fixed"
          style={{
            width: "250px",
            height: "100vh",
            top: windowWidth < 768 ? 60 : 0,

            left: 0,
            zIndex: 2000,
            overflowY: "auto",
            transition: "transform 0.3s ease-in-out",
            
            transform:
              isSidebarOpen || windowWidth >= 768
                ? "translateX(0)"
                : "translateX(-100%)",
          }}
        >
          {windowWidth < 768 && (
            <div className="d-flex justify-content-end mb-2">
              <button
                className="btn btn-light btn-sm"
                onClick={() => setIsSidebarOpen(false)}
              >
                <FaTimes style={{ color: "#a70a4a" }} />
              </button>
            </div>
          )}

          <div className="text-center mb-4">
            <img src="/images/LOGO.png" alt="Logo" className="rounded" style={{ width: "120px" }} />
          </div>

          <ul className="nav flex-column gap-2">
  {links.map(({ to, label, icon }) => (
    <li className="nav-item" key={label}>
      <NavLink
        to={to}
        end
        className="sidebar-button nav-link px-3 py-2 rounded"
        style={({ isActive }) => (isActive ? activeStyle : defaultStyle)}
        onClick={() => {
          if (windowWidth < 768) setIsSidebarOpen(false);
        }}
      >
        {icon} {label}
      </NavLink>
    </li>
  ))}
</ul>

        </div>
      )}
    </>
  );
}