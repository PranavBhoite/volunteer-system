import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";

export default function VirtualIDCard({uid, onClose}) {
  const [flipped, setFlipped] = useState(false);
  const [user, setUser] = useState(null);

  const fetchUserData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/users/display/${uid}`);
      console.log(response);
      if(!response.data)
        return alert("Error with fetching user")

      setUser(response.data);

    } catch (error) {
      console.error("User fetch error:", error)
    }
  }
  
    useEffect( () => {
      fetchUserData();
    }, []);


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

    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/dom-to-image/2.6.0/dom-to-image.min.js",
      "dom-to-image-script",
      () => {}
    );
    loadScript(
      "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js",
      "jspdf-script",
      () => {}
    );
  }, []);

  const handleDownloadPdf = async () => {
    const frontEl = document.getElementById("virtual-id-front");
    const backEl = document.getElementById("virtual-id-back");
    if (!frontEl || !backEl || !window.domtoimage || !window.jspdf) return;

    try {
      const { jsPDF } = window.jspdf;
      const pdf = new jsPDF("landscape", "mm", "a4");

      for (const [el, label] of [
        [frontEl, "Front"],
        [backEl, "Back"],
      ]) {
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
            let imgWidthMm = (img.width * 25.4) / 96;
            let imgHeightMm = (img.height * 25.4) / 96;
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

  return (
    <>
      <AnimatePresence>
      <motion.div
              onClick={onClose} // <- click outside closes the card
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
                zIndex: 12000,
              }}
            >

            <div onClick={(e) => e.stopPropagation()} style={{ perspective: "1500px" }}>
              <motion.div
                onClick={() => setFlipped(!flipped)}
                animate={{ rotateY: flipped ? 180 : 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  transformStyle: "preserve-3d",
                  width: "520px",
                  height: "350px",
                  maxWidth: "95vw",
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: "0.5rem",
                  border: "5px solid #2D9CDB", // Indigo, matching TMGF 'T' letter darkness
                  background: "white",
                }}
                className="virtual-card-container"
              >
                {/* FRONT */}
                <Card
                  id="virtual-id-front"
                  className="p-3 border-0"
                  style={{
                    color: "#0e4b73",
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    backfaceVisibility: "hidden",
                    borderRadius: "0.5rem",
                    overflowWrap: "break-word",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "20px",
                    fontSize: "0.9rem",
                    lineHeight: "1.3rem",
                  }}
                >
                  <Card.Body className="text-center" style={{ padding: 0 }}>
                    <img
                      src="/images/LOGO.png"
                      alt="TMGF Logo"
                      style={{ height: "40px", marginBottom: "0.5rem" }}
                    />
                    <h6 style={{ color: "#C71585", marginBottom: "0.3rem" }}>
                      Volunteer ID Card
                    </h6>
                    <h5 className="fw-bold" style={{ fontSize: "1.3rem", marginBottom: "0.3rem" }}>
                      {user?.name}
                    </h5>
                    <p style={{ marginBottom: "0.6rem" }}>ID: {user?.virtualId}</p>
                    <div style={{ textAlign: "left", fontSize: "0.85rem", lineHeight: "1.2rem" }}>
                      <b>Name:</b> {user?.name}
                      <br />
                      <b>Email ID:</b> {user?.email}
                      <br />
                      <b>Mobile No:</b> {user?.mobileNo || "N/A"}
                      <br />
                      <b>Address:</b> {user?.address || "N/A"}
                    </div>
                    <Button
                      onClick={handleDownloadPdf}
                      variant="light"
                      size="sm"
                      className="mt-2 download-button"
                      style={{ alignSelf: "center" }}
                    >
                      Download PDF
                    </Button>
                  </Card.Body>
                </Card>

                {/* BACK */}
                <Card
                  id="virtual-id-back"
                  className="p-3 border-0"
                  style={{
                    width: "100%",
                    height: "100%",
                    position: "absolute",
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                    borderRadius: "0.5rem",
                    color: "#0e4b73",
                    background: "white",
                  }}
                >
                  <Card.Body style={{ fontSize: "0.8rem" }}>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      <img
                        src="/images/LOGO.png"
                        alt="TMGF Logo"
                        style={{ height: "40px", marginBottom: "0.4rem" }}
                      />
                    </div>
                    <p style={{ color: "#C71585", marginBottom: "3px" }}>
                      We are an NGO focused on uplifting orphaned children and destitutes.
                    </p>
                    <p style={{ color: "#C71585", marginBottom: "3px" }}>
                      We run orphanages to support children to become self-sufficient and stable.
                    </p>
                    <hr style={{ margin: "8px 0" }} />
                    <p>
                      <strong>Contact:</strong>
                    </p>
                    <p>
                      info@tmgf.in
                      <br />
                      +91 9881337914 / +91 8600760014
                    </p>
                    <p>
                      Plot No 100,101,102, S.N. 1300/1316, Maainagari,
                      <br />
                      Babanrao More Nagar, Bhorade Mala,
                      <br />
                      Shirur, Maharashtra 412210
                    </p>
                  </Card.Body>
                </Card>
              </motion.div>
            </div>
          </motion.div>
      </AnimatePresence>
    </>
  );
}