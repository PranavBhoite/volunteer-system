import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Sidebar from "./Layouts/Sidebar";
import Header from "./Layouts/Header";
import "../Dashboard.css";

const VolunteerDashboard = () => {
  const location = useLocation();

  // trigger the toast
  React.useEffect(() => {
    if (location.state?.toastMessage) {
      toast.success(location.state.toastMessage, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [location.state]);

  return (
    <div style={{ height: '100vh', overflow: 'hidden' }}>
      {/* Fixed Sidebar */}
      <Sidebar />

      {/* Main Content Area - with left margin to account for sidebar */}
      <div 
        className="main-content"
        style={{ 
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Fixed Header */}
        <Header />

        {/* Scrollable Inner Content */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          <Outlet />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default VolunteerDashboard;