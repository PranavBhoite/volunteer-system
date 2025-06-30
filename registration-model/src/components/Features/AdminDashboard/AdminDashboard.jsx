import { Outlet } from "react-router-dom";
import Sidebar from "./Layouts/Sidebar";
import Header from "./Layouts/Header";

export default function AdminDashboard() {
  return (
    <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
          {/* Fixed Sidebar */}
          <Sidebar />
    
          {/* Right Section */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            {/* Fixed Header */}
            <Header />
    
            {/* Scrollable Inner Content */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              
                <Outlet />
              </div>
            </div>
          </div>
  );
}
