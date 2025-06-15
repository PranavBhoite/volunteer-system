import { Navigate, Route, Routes } from "react-router-dom";
import OrganizerView from "./Event/OrganizerView.jsx";
import Sidebar from "./Layouts/Sidebar";
import Header from "./Layouts/Header";
import AllVolunteers from "./VolunteerList/AllVolunteers.jsx";
import HelpSection from "../VolunteerDashboard/Help/HelpSection.jsx";

export default function AdminDashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
            <Routes>
            <Route path= "/admin-dashboard/organizer-view" element={<OrganizerView />} />
            <Route path="/admin-dashboard/allvolunteers" element={<AllVolunteers />} />
            <Route path="/admin-dashboard/*" element={<Navigate to= "admin-dashboard/allvolunteers" />} />
            <Route path="/admin-dashboard/help" element={<HelpSection />} />
           </Routes>

        </div>
      </div>
    </div>
  );
}
