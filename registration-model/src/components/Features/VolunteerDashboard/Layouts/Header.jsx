import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Header() {
  const { uid } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/display/${uid}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.error("User fetch error:", err));
  }, [uid]);

  return (
    <header className="main-header">
      Hello, {user?.name || "User"} :

      <style>{`
        .main-header {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 80px;
          background-color: #fff;
          border-bottom: 1px solid #e9ecef;
          display: flex;
          align-items: center;
          padding: 0 20px;
          z-index: 1000;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          font-weight: 600;
          font-size: 1.1rem;
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