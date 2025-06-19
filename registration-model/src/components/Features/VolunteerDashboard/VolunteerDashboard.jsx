import React, { useState, useEffect, forwardRef } from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "./Layouts/Sidebar"; // Assuming Sidebar exports default
import Header from "./Layouts/Header"; // Assuming Header exports default
import { Dropdown, Card } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

const VolunteerDashboard = () => {
  const { uid } = useParams();

  const [user, setUser] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [domToImageLoaded, setDomToImageLoaded] = useState(false);
  const [jsPDFLoaded, setJsPDFLoaded] = useState(false);

  // Define sidebar and header dimensions for consistent layout
  const sidebarWidth = '250px';
  const headerHeight = '60px'; // Consistent with current fixed height

  useEffect(() => {
    const loadScript = (src, id, onLoadCallback) => {
      if (document.getElementById(id)) {
        onLoadCallback();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      script.onload = onLoadCallback;
      script.onerror = () => console.error(`Failed to load script: ${src}`);
      document.head.appendChild(script);
    };

    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js",
      "dom-to-image-script",
      () => setDomToImageLoaded(true)
    );

    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
      "jspdf-script",
      () => setJsPDFLoaded(true)
    );
  }, []);

  useEffect(() => {
    if (!uid) return;
    axios
      .get(`http://localhost:5000/api/users/display/${uid}`)
      .then((res) => setUser(res.data))
      .catch((err) => {
        console.error("User fetch error:", err);
      });
  }, [uid]);

  const handleDownloadPdf = async () => {
    const input = document.getElementById("virtual-id-card");
    if (!input || !window.domtoimage || !window.jspdf) {
      console.warn("Libraries not loaded or input element missing");
      return;
    }
    try {
      const { jsPDF } = window.jspdf;
      const scale = 2; // Increase scale for better quality before conversion
      const style = {
        transform: `scale(${scale})`,
        transformOrigin: "top left",
        width: `${input.offsetWidth}px`,
        height: `${input.offsetHeight}px`,
      };

      const dataUrl = await window.domtoimage.toPng(input, {
        width: input.offsetWidth * scale,
        height: input.offsetHeight * scale,
        style,
        quality: 0.95, // Adjust quality for better output
      });

      const pdf = new jsPDF("portrait", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();

      const img = new Image();
      img.src = dataUrl;

      img.onload = () => {
        // Calculate dimensions to fit within PDF page while maintaining aspect ratio
        let imgWidthMm = img.width * (25.4 / 96); // Convert px to mm (assuming 96 DPI)
        let imgHeightMm = img.height * (25.4 / 96);

        const aspectRatio = imgWidthMm / imgHeightMm;

        // Scale to fit page width if wider
        if (imgWidthMm > pageWidth) {
          imgWidthMm = pageWidth;
          imgHeightMm = pageWidth / aspectRatio;
        }

        // Scale to fit page height if taller (after fitting width)
        if (imgHeightMm > pageHeight) {
          imgHeightMm = pageHeight;
          imgWidthMm = pageHeight * aspectRatio;
        }

        const x = (pageWidth - imgWidthMm) / 2;
        const y = (pageHeight - imgHeightMm) / 2;

        pdf.addImage(dataUrl, "PNG", x, y, imgWidthMm, imgHeightMm);
        pdf.save("Virtual_ID.pdf");
      };
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  const userInitial = user?.name?.charAt(0).toUpperCase() || "";

  // Custom toggle without triangle, with hover/focus animation
  const CustomToggle = forwardRef(({ onClick }, ref) => (
    <button
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
      style={{
        borderRadius: "50%",
        width: 48,
        height: 48,
        fontSize: "1.5rem",
        fontWeight: "bold",
        lineHeight: 1,
        userSelect: "none",
        backgroundColor: "#6a4bcf",
        border: "none",
        color: "white",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 0,
        transition: "transform 0.2s ease, boxShadow 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.1)";
        e.currentTarget.style.boxShadow = "0 4px 10px rgba(106, 75, 207, 0.6)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(106, 75, 207, 0.7)";
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = "none";
      }}
      aria-haspopup="true"
      aria-expanded="false"
    >
      {userInitial}
    </button>
  ));

  return (
    <div style={{ display: "flex", minHeight: "100vh", fontFamily: "Arial, sans-serif" }}>
      {/* Sidebar - Position fixed and width defined */}
      <Sidebar style={{
        position: 'fixed',
        top: 0,
        left: 0,
        bottom: 0,
        width: sidebarWidth, // Use defined width
        zIndex: 1100, // Ensure sidebar is above content but below header
        backgroundColor: '#343a40', // Example background for sidebar visibility
        color: 'white',
        overflowY: 'auto' // Enable scrolling for long sidebar content
      }} />

      {/* Main content area wrapper */}
      <div style={{
        flex: 1,
        backgroundColor: "#f8f9fa",
        // Pushes content right by sidebar width
        marginLeft: sidebarWidth,
        // Ensures content fills remaining height below the header
        paddingTop: headerHeight,
        minHeight: '100vh', // Ensure it covers the full viewport height
        boxSizing: 'border-box' // Include padding in element's total width and height
      }}>
        {/* Header - Fixed to the top, starting after the sidebar */}
        <div
          style={{
            position: "fixed",
            top: 0,
            left: sidebarWidth, // Header starts where sidebar ends
            right: 0,
            height: headerHeight, // Use defined height
            zIndex: 1000,
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
            display: 'flex', // Use flex for header content alignment
            alignItems: 'center', // Vertically align header content
            padding: '0 20px', // Add padding inside the header
            boxSizing: 'border-box'
          }}
        >
          <Header />
        </div>

        {/* Profile dropdown with custom toggle */}
        <div
          style={{
            position: "fixed",
            top: 15, // Adjusted slightly to ensure it's visually aligned with header
            right: 20,
            zIndex: 13000,
            userSelect: "none",
            pointerEvents: "auto",
            maxWidth: "fit-content",
          }}
        >
          <Dropdown align="end">
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-toggle" />

            <Dropdown.Menu
              style={{
                minWidth: "160px",
                borderRadius: "8px",
                padding: "0",
                overflow: "hidden",
              }}
            >
              <Dropdown.Item
                onClick={() => setShowCard(true)}
                className="dropdown-item-custom"
              >
                View Virtual ID
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleLogout} className="dropdown-item-custom">
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        <AnimatePresence>
          {showCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                height: "100vh",
                width: "100vw",
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                backdropFilter: "blur(5px)",
                zIndex: 12000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={() => setShowCard(false)}
            >
              <motion.div
                id="virtual-id-card"
                initial={{ scale: 0.8, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 50 }}
                transition={{ type: "spring", stiffness: 80, damping: 20, mass: 0.8 }}
                style={{ position: "relative" }}
                onClick={(e) => e.stopPropagation()}
              >
                <Card
                  className="p-4 text-white shadow-lg border-0"
                  style={{
                    width: "22rem",
                    background: "linear-gradient(to bottom right, #8A2BE2, #4B0082)",
                    borderRadius: "1rem",
                    overflow: "hidden",
                  }}
                >
                  <Dropdown
                    className="position-absolute"
                    style={{ top: "1rem", right: "1rem" }}
                  >
                    <Dropdown.Toggle
                      variant="light"
                      size="sm"
                      className="bg-transparent border-0 text-white p-0"
                    >
                      <span style={{ fontSize: "1.5rem", lineHeight: "1" }}>
                        &#8942;
                      </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item onClick={handleDownloadPdf}>
                        Download PDF
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>

                  <Card.Body className="text-center">
                    <Card.Subtitle className="mb-2 text-white-50">
                      Virtual ID Card
                    </Card.Subtitle>
                    <Card.Title as="h3" className="mb-3 fw-bold">
                      {user?.name}
                    </Card.Title>
                    <Card.Text className="mb-4">ID: {user?._id}</Card.Text>
                    <Card.Text className="text-start" style={{ fontSize: "0.9rem" }}>
                      <strong>Email:</strong> {user?.email} <br />
                      <strong>Contact:</strong> {user?.mobileNo || "N/A"} <br />
                      <strong>Address:</strong> {user?.address || "N/A"}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Content Outlet where nested routes will render */}
        <div
          style={{
            // This div holds the actual content from the Outlet
            backgroundColor: "white",
            borderRadius: 8,
            padding: 25,
            boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
            border: "1px solid #e9ecef",
            minHeight: "calc(100vh - 2 * 30px - 60px)", // Adjusted to account for header height and surrounding padding (if any)
            // Removed fixed height to allow content to push it
            boxSizing: "border-box", // Include padding in dimensions
            // To ensure content within the outlet is padded from all sides
            margin: '30px', // Example padding for content within the main content area
          }}
        >
          <Outlet />
        </div>
      </div>

      {/* Inline styles for dropdown items */}
      <style>{`
        .dropdown-item-custom {
          transition: background-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
          padding: 10px 20px;
          font-weight: 600;
          cursor: pointer;
        }
        .dropdown-item-custom:hover, .dropdown-item-custom:focus {
          background-color: #6a4bcf;
          color: white;
          transform: scale(1.05);
          outline: none;
          border-radius: 6px;
          text-shadow: 0 0 3px rgba(0,0,0,0.3);
        }
      `}</style>
    </div>
  );
};

export default VolunteerDashboard;