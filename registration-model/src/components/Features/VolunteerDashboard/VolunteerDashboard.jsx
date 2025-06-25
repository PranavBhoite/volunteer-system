import React, { useState, useEffect, forwardRef } from "react";
import { Outlet, useParams } from "react-router-dom";
import Sidebar from "./Layouts/Sidebar";
import Header from "./Layouts/Header";
import { Dropdown, Card, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";

const VolunteerDashboard = () => {
  const { uid } = useParams();
  const [user, setUser] = useState(null);
  const [showCard, setShowCard] = useState(false);
  const [flipped, setFlipped] = useState(false);

  const sidebarWidth = '250px';
  const headerHeight = '60px';

  useEffect(() => {
    const loadScript = (src, id, callback) => {
      if (document.getElementById(id)) {
        callback();
        return;
      }
      const script = document.createElement("script");
      script.src = src;
      script.id = id;
      script.onload = callback;
      script.onerror = () => console.error(`Failed to load script: ${src}`);
      document.head.appendChild(script);
    };

    loadScript("https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js", "dom-to-image-script", () => {});
    loadScript("https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js", "jspdf-script", () => {});
  }, []);

  useEffect(() => {
    if (!uid) return;
    fetch(`http://localhost:5000/api/users/display/${uid}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error("User fetch error:", err));
  }, [uid]);

  const handleDownloadPdf = async () => {
    const frontEl = document.getElementById("virtual-id-front");
    const backEl = document.getElementById("virtual-id-back");
    if (!frontEl || !backEl || !window.domtoimage || !window.jspdf) return;

    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("landscape", "mm", "a4");

      for (const [el, label] of [[frontEl, "Front"], [backEl, "Back"]]) {
        el.querySelector(".download-button")?.classList.add("d-none");

        const scale = 2;
        const dataUrl = await window.domtoimage.toPng(el, {
          width: el.offsetWidth * scale,
          height: el.offsetHeight * scale,
          style: {
            transform: `scale(${scale})`,
            transformOrigin: "top left",
            width: `${el.offsetWidth}px`,
            height: `${el.offsetHeight}px`,
          },
          quality: 0.95,
        });

        const img = new Image();
        img.src = dataUrl;

        await new Promise((resolve) => {
          img.onload = () => {
            let imgWidthMm = img.width * (25.4 / 96);
            let imgHeightMm = img.height * (25.4 / 96);
            const pageWidth = pdf.internal.pageSize.getWidth();
            const pageHeight = pdf.internal.pageSize.getHeight();
            const aspectRatio = imgWidthMm / imgHeightMm;

            if (imgWidthMm > pageWidth) {
              imgWidthMm = pageWidth;
              imgHeightMm = pageWidth / aspectRatio;
            }
            if (imgHeightMm > pageHeight) {
              imgHeightMm = pageHeight;
              imgWidthMm = pageHeight * aspectRatio;
            }

            const x = (pageWidth - imgWidthMm) / 2;
            const y = (pageHeight - imgHeightMm) / 2;
            pdf.addImage(dataUrl, "PNG", x, y, imgWidthMm, imgHeightMm);
            if (label === "Front") pdf.addPage();
            resolve();
          };
        });

        el.querySelector(".download-button")?.classList.remove("d-none");
      }

      pdf.save("Virtual_ID.pdf");
    } catch (err) {
      console.error("Download error:", err);
    }
  };

  const userInitial = user?.name?.charAt(0).toUpperCase() || "";

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
        backgroundColor: "#6a4bcf",
        border: "none",
        color: "white",
        cursor: "pointer",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {userInitial}
    </button>
  ));

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />
      <div style={{ flex: 1, marginLeft: sidebarWidth, paddingTop: headerHeight }}>
        <div style={{ position: "fixed", top: 0, left: sidebarWidth, right: 0, height: headerHeight, zIndex: 1000 }}>
          <Header />
        </div>

        <div style={{ position: "fixed", top: 15, right: 20, zIndex: 13000 }}>
          <Dropdown align="end">
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-toggle" />
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { setShowCard(true); setFlipped(false); }}>View Virtual ID</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => { localStorage.clear(); window.location.href = "/login"; }}>Logout</Dropdown.Item>
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
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                zIndex: 12000
              }}
              onClick={() => setShowCard(false)}
            >
              <div onClick={(e) => e.stopPropagation()} style={{ perspective: "1500px" }}>
                <motion.div
                  onClick={() => setFlipped(!flipped)}
                  animate={{ rotateY: flipped ? 180 : 0 }}
                  transition={{ duration: 0.8 }}
                  style={{
                    transformStyle: "preserve-3d",
                    width: "460px",
                    height: "280px",
                    position: "relative",
                    cursor: "pointer",
                    borderRadius: "0.5rem",
                    border: "5px solid #0000FF",
                  }}
                >
                  {/* FRONT */}
                  <Card
                    id="virtual-id-front"
                    className="p-3 border-0"
                    style={{
                      background: "white",
                      color: "#000080",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      backfaceVisibility: "hidden",
                      borderRadius: "0.5rem"
                    }}
                  >
                    <Card.Body className="text-center">
                      <img src="/LOGO.png" alt="TMGF Logo" style={{ height: "40px", marginBottom: "0.4rem" }} />
                      <h6 style={{ color: "#C71585" }}>Volunteer ID Card</h6>
                      <h5 className="fw-bold">{user?.name}</h5>
                      <p>ID: {user?._id}</p>
                      <p style={{ fontSize: "0.8rem", textAlign: "left", lineHeight: "1.5rem" }}>
                        <span style={{ fontWeight: "bold", color: "#000080" }}>Name:</span> {user?.name}<br />
                        <span style={{ fontWeight: "bold", color: "#000080" }}>Email ID:</span> {user?.email}<br />
                        <span style={{ fontWeight: "bold", color: "#000080" }}>Mobile No:</span> {user?.mobileNo || "N/A"}<br />
                        <span style={{ fontWeight: "bold", color: "#000080" }}>Address:</span> {user?.address || "N/A"}
                      </p>
                      <Button onClick={handleDownloadPdf} variant="light" size="sm" className="mt-2 download-button">
                        Download PDF
                      </Button>
                    </Card.Body>
                  </Card>

                  {/* BACK */}
                  <Card
                    id="virtual-id-back"
                    className="p-3 border-0"
                    style={{
                      background: "white",
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                      borderRadius: "0.5rem",
                      color: "#000080"
                    }}
                  >
                    <Card.Body style={{ fontSize: "0.75rem" }}>
                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <img src="/LOGO.png" alt="TMGF Logo" style={{ height: "40px", marginBottom: "0.4rem" }} />
                      </div>
                      <p style={{ color: "#C71585", marginBottom: "2px" }}>We are an NGO focused on uplifting orphaned children and destitutes.</p>
                      <p style={{ color: "#C71585", marginBottom: "2px" }}>We run orphanages to support children to become self-sufficient and stable.</p>
                      <hr style={{ margin: "6px 0" }} />
                      <p style={{ marginBottom: "2px" }}><strong>Contact:</strong></p>
                      <p style={{ marginBottom: "2px" }}>info@tmgf.in</p>
                      <p style={{ marginBottom: "2px" }}>+91 9881337914 / +91 8600760014</p>
                      <p style={{ marginBottom: "2px" }}>
                        Plot No 100,101,102, S.N. 1300/1316, Maainagari,<br />
                        Babanrao More Nagar, Bhorade Mala,<br />
                        Shirur, Maharashtra 412210
                      </p>
                    </Card.Body>
                  </Card>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ margin: 30 }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
