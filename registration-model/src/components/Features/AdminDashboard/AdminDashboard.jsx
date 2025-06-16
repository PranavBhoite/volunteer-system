import { Outlet } from "react-router-dom";
import Sidebar from "./Layouts/Sidebar";
import Header from "./Layouts/Header";

export default function AdminDashboard() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Sidebar />

      <div style={{ flex: 1, backgroundColor: '#f8f9fa' }}>
        <Header />

        <div style={{ padding: '30px' }}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '25px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
            border: '1px solid #e9ecef'
          }}>
              
              {/* Outlet renders the matched child route component */}
              <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
