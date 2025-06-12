import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "../components/Sidebar.jsx";
import Header from "../components/Header.jsx";
import Dashboard from "../components/Authentication/Volunteer/Dashboard.jsx";
import VolunteerView from "../components/Event/VolunteerView.jsx";
import OrganizerView from "../components/Event/OrganizerView.jsx";
import Profile from "../pages/Profile.jsx";
import Event from "../pages/Event.jsx";
import Help from "../pages/Help.jsx";
import HelpCreate from "../pages/HelpCreate";
import HelpApproved from "../pages/HelpApproved";
import HelpDisapproved from "../pages/HelpDisapproved";

export default function DashboardLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/volunteer-view" element={<VolunteerView />} />
            <Route path="/organizer-view" element={<OrganizerView />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/event" element={<Event />} />
            <Route path="/help" element={<Help />} />
            <Route path="*" element={<Navigate to="/profile" />} />
            <Route path="/help/create" element={<HelpCreate />} />
            <Route path="/help/approved" element={<HelpApproved />} />
            <Route path="/help/disapproved" element={<HelpDisapproved />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
