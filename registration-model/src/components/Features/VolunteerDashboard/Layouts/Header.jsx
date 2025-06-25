import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaBars } from "react-icons/fa";

export default function Header() {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/display/${uid}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("User fetch error:", err));
  }, [uid]);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSidebarToggle = () => {
    const sidebarToggle = document.querySelector(
      ".btn.btn-light.m-2.position-fixed"
    );
    if (sidebarToggle) {
      sidebarToggle.click();
      setIsSidebarOpen(!isSidebarOpen);
    }
  };

  return (
    <header className="main-header">
      {/* Only show hamburger on small screens when sidebar is closed */}
      {windowWidth < 768 && !isSidebarOpen && (
        <button className="btn btn-light me-3" onClick={handleSidebarToggle}>
          <FaBars style={{ color: "#a70a4a" }} />
        </button>
      )}

      <span className="user-greeting">
        Hello, {user?.name || "User"} :
      </span>

      <style>{`
        .main-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 60px;
          background-color: #fff;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 0 16px;
          z-index: 1000;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.08);
        }

        .user-greeting {
          font-weight: 600;
          font-size: 1rem;
          color: #333;
        }

        @media (min-width: 769px) {
          .main-header {
            margin-left: 250px;
          }
        }
      `}</style>
    </header>
  );
}
