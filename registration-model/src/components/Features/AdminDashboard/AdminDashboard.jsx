import { Outlet } from "react-router-dom";
import Sidebar from "./Layouts/Sidebar";
import Header from "./Layouts/Header";
import "../Dashboard.css";

export default function AdminDashboard() {
  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      <Sidebar />

      <div 
        className="main-content"
        style={{ 
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        <Header />

        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
