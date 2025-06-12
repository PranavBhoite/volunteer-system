import { FaUserCircle } from "react-icons/fa";

export default function Header() {
  return (
    <div
      className="d-flex justify-content-between align-items-center px-4 py-2"
      style={{ backgroundColor: "#f2f0eb" }}
    >
      {/* Left section */}
      <div className="fs-5">
        Welcome to Dashboard
      </div>

      {/* Right section */}
      <div className="d-flex align-items-center gap-3">
        <div className="d-flex align-items-center gap-2">
          <FaUserCircle size={24} />
          <span>Profile</span>
        </div>
      </div>
    </div>
  );
}
