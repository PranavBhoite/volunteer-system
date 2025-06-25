import React, { useState, useEffect, forwardRef } from "react";
import { useParams } from "react-router-dom";
import { Dropdown } from "react-bootstrap";

export default function Header() {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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

  const userInitial = user?.name?.charAt(0).toUpperCase() || "";

  const CustomToggle = forwardRef(({ onClick }, ref) => (
    <button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{
        borderRadius: "50%",
        width: 42,
        height: 42,
        fontSize: "1.2rem",
        fontWeight: "bold",
        backgroundColor: "#6a4bcf",
        border: "none",
        color: "white",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userInitial}
    </button>
  ));

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: windowWidth >= 768 ? 250 : 0,
        right: 0,
        height: 60,
        backgroundColor: "#fff",
        borderBottom: "1px solid #e9ecef",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 16px",
        zIndex: 1100,
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {windowWidth < 768 && (
          <button
            className="btn btn-light"
            onClick={() =>
              document
                .querySelector(".btn.btn-light.m-2.position-fixed")
                ?.click()
            }
            style={{
              padding: "6px 8px",
              fontSize: "1.2rem",
              lineHeight: 1,
              color: "#a70a4a",
              background: "transparent",
              border: "none",
            }}
          >
            ☰
          </button>
        )}
        <span style={{ fontWeight: 600, fontSize: "1rem", color: "#333" }}>
          Hello, {user?.name || "User"}
        </span>
      </div>

      <Dropdown align="end">
        <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-toggle" />
        <Dropdown.Menu>
          <Dropdown.Item
            onClick={() => {
              localStorage.clear();
              window.location.href = "/login";
            }}
          >
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </header>
  );
}