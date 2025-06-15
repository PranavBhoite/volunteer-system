import { Navigate, Route, Routes, useParams } from "react-router-dom";
import VolunteerView from "./Event/VolunteerView.jsx";
import Header from "../VolunteerDashboard/Layouts/Header.jsx";
import Sidebar from "../VolunteerDashboard/Layouts/Sidebar.jsx";
import Profile from "../VolunteerDashboard/Profile/Profile.jsx";
import HelpSection from "./Help/HelpSection.jsx";

const VolunteerDashboard = () => {
  const { uid } = useParams(); // Changed from userId to uid to match App.js
  
  return (
    <div className="layout">
      <Sidebar uid={uid} /> {/* Pass uid as prop to Sidebar */}
      <div className="main">
        <Header />
        <div className="content">
          <Routes>
            {/* Use relative paths - remove /dashboard/ prefix */}
            <Route path="volunteer-view" element={<VolunteerView userId={uid} />} />
            <Route path="profile" element={<Profile userId={uid} />} />
            <Route path="help" element={<HelpSection />} />
            {/* Default route should redirect to profile */}
            <Route path="*" element={<Navigate to="profile" replace />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default VolunteerDashboard;