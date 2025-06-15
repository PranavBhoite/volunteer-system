import { Navigate, Route, Routes, useParams } from "react-router-dom";

import OrganizerView from "../../../../Event/OrganizerView.jsx";
import VolunteerView from "../../../../Event/VolunteerView.jsx";
import Header from "../Header.jsx";
import Sidebar from "../Sidebar.jsx";
import Dashboard from "../Dashboard.jsx";
import Event from "../pages/Event.jsx";
import Help from "../pages/Help.jsx";
import HelpApproved from "../pages/HelpApproved.jsx";
import HelpCreate from "../pages/HelpCreate.jsx";
import HelpDisapproved from "../pages/HelpDisapproved.jsx";
import Profile from "../pages/Profile.jsx";

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
