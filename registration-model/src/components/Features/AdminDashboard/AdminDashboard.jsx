import { Navigate, Route, Routes } from "react-router-dom";
import VolunteerList from "./VolunteerList/VolunteerList";
import OrganizerView from "../../Event/OrganizerView";
import Event from "./Event/Event";
import Help from "../VolunteerDashboard/Help/Help";
import HelpCreate from "./Help/HelpCreate";
import HelpApproved from "./Help/HelpApproved";
import HelpDisapproved from "../VolunteerDashboard/Help/HelpDisapproved";
import Sidebar from "./Layouts/Sidebar";
import Header from "./Layouts/Header";
import VolunteerView from "../../Event/VolunteerView.jsx";






export default function AdminDashboard() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main">
        <Header />
        <div className="content">
            <Routes>
             <Route path="/volunteer-list" element={<VolunteerList />} />
             <Route path="/volunteer-view" element={<VolunteerView/>} />
             <Route path="/organizer-view" element={<OrganizerView/>} />
             <Route path="/event" element={<Event/>} />
             <Route path="/help" element={<Help/>} />
             <Route path="/help/create" element={<HelpCreate />} />
             <Route path="/help/approved" element={<HelpApproved />} />
             <Route path="/help/disapproved" element={<HelpDisapproved />} />
             <Route path="*" element={<Navigate to="volunteer-list" />} />
           </Routes>

        </div>
      </div>
    </div>
  );
}
