import { Navigate, Route, Routes } from "react-router-dom";

import OrganizerView from "../../../components/Event/OrganizerView.jsx";
import VolunteerView from "../../../components/Event/VolunteerView.jsx";
import Header from "../VolunteerDashboard/Layouts/Header.jsx";
import Sidebar from "../VolunteerDashboard/Layouts/Sidebar.jsx";
import Event from "../VolunteerDashboard/Event/Event.jsx";
import Help from "../VolunteerDashboard/Help/Help.jsx";
import HelpApproved from "../VolunteerDashboard/Help/HelpApproved.jsx";
import HelpCreate from "../VolunteerDashboard/Help/HelpCreate.jsx";
import HelpDisapproved from "../VolunteerDashboard/Help/HelpDisapproved.jsx";
import Profile from "../VolunteerDashboard/Profile/Profile.jsx";

export default function VolunteerDashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
          <Routes>
        
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