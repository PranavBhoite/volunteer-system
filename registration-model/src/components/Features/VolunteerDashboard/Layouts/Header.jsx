import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Header() {
  const { uid } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/display/${uid}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("User fetch error:", err));
  }, [uid]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "80px",            // Increased height
        backgroundColor: "#fff",
        borderBottom: "1px solid #e9ecef",
        display: "flex",
        alignItems: "center",
        padding: "0 20px",
        zIndex: 1000,
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        fontWeight: "600",
        fontSize: "1.1rem",
        color: "#333",
        marginLeft: "250px",       // Same as sidebar width
      }}
    >
      Hello, {user?.name || "User"} :)
    </header>
  );
}