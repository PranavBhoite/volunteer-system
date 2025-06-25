import { useEffect, useState } from "react";
import { Button, Carousel, Col, Container, Modal, Row } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

  // Show Help Modal only once using localStorage
  useEffect(() => {
    const hasSeenHelp = localStorage.getItem("seenHelpPopup");
    if (!hasSeenHelp) {
      setShowHelpModal(true);
      localStorage.setItem("seenHelpPopup", "true");
    }
  }, []);

  // Dummy event slides and details
  const eventSlides = [
    ["Tree Plantation", "Health Camp", "Blood Donation"],
    ["Clothing Drive", "Women Empowerment", "Skill Workshops"],
    ["Clean Drive", "Awareness Rally", "Education Session"]
  ];

  const eventDetails = {
    "Tree Plantation": {
      date: "2025-07-10", start: "9:00 AM", end: "12:00 PM",
      purpose: "Planting trees in local parks.",
      requirements: "Bring water bottles and gloves."
    },
    "Health Camp": {
      date: "2025-07-15", start: "10:00 AM", end: "3:00 PM",
      purpose: "Free medical checkups for underprivileged.",
      requirements: "Medical volunteers welcome."
    },
    "Blood Donation": {
      date: "2025-07-20", start: "11:00 AM", end: "4:00 PM",
      purpose: "Donating blood for emergency needs.",
      requirements: "Eat well before donation."
    },
    "Clothing Drive": {
      date: "2025-08-01", start: "10:00 AM", end: "2:00 PM",
      purpose: "Collect clothes for rural areas.",
      requirements: "Clothes should be clean and usable."
    },
    "Women Empowerment": {
      date: "2025-08-08", start: "1:00 PM", end: "5:00 PM",
      purpose: "Workshops for self-employment training.",
      requirements: "Registration required."
    },
    "Skill Workshops": {
      date: "2025-08-15", start: "11:00 AM", end: "3:00 PM",
      purpose: "Training in basic computer and tailoring.",
      requirements: "Open for all women above 18."
    }
  };

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % eventSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + eventSlides.length) % eventSlides.length);

  // Close event detail popup on outside click
  useEffect(() => {
    const handleClickOutside = () => setSelectedEvent(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
  <div className="main-content">
    
      {/* Help Modal shown only on first login */}
      <Modal show={showHelpModal} onHide={() => setShowHelpModal(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#a70a4a", fontWeight: "bold" }}>Welcome Volunteer!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <ul>
  <li style={{ marginBottom: "10px" }}>
    <strong> Profile:</strong>Use the Profile Section to Edit your personal details and view your <strong>User ID</strong>. Keep your contact information up to date.
  </li>
  <li style={{ marginBottom: "10px" }}>
    <strong> Home:</strong>Home Section allows you to view <strong>TMGF Moments</strong> and <strong>highlighted events</strong> at a glance.
  </li>
  <li style={{ marginBottom: "10px" }}>
    <strong> Event:</strong> Event Section helps you to Participate in various events. You can view complete event details and register for <strong>ongoing</strong>, <strong>upcoming</strong>, or <strong>completed</strong> events.
  </li>
  <li style={{ marginBottom: "10px" }}>
    <strong> Event Initiatives:</strong>Contribute by creating your own events. You can also track whether your event is <strong>Approved</strong>, <strong>Disapproved</strong>, or <strong>Pending</strong> under the <strong>Event Initiatives</strong> Section.
  </li>
</ul>

          </ul>
          <p className="text-muted">You can always return to the <strong>Help section</strong> from the sidebar.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            style={{ backgroundColor: "#15b1d3", border: "none" }}
            onClick={() => setShowHelpModal(false)}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/*  Header and About Section */}
      <div style={{
        width: "100%",
        maxWidth: "1200px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        margin: "0 auto"
      }}>
        <div className="text-center mb-4">
          <img src="/images/LOGO.png" alt="TMGF Logo" style={{ width: "140px" }} />
         <h2 style={{ fontWeight: "bold", marginTop: 10, marginBottom: 24 }}>
          <span style={{ color: "#0599C2" }}>The </span>
          <span style={{ color: "#a70a4a" }}>Mother </span>
          <span style={{ color: "#0599C2" }}>Global Foundation</span>
        </h2>
          <p className="mt-2 fw-semibold" style={{ maxWidth: "80%", margin: "0 auto" }}>
            <p style={{color:"#003366"}}>Founder: Padma Shri Dr. Sindhutai Sapkal 'Maai'</p>
            We are an NGO with a dedicated focus to uplift, enable and empower Orphaned Children and Destitutes.
            We run orphanages where we strive to provide the necessary platform and support for our children to make 
            them self-sufficient, independent and able to lead a stable life.
          </p>
        </div>

        {/*  Responsive Grid for Moments & Events */}
        <Container>
          <Row className="g-4">
            {/* Our Moments Section */}
            <Col xs={12} md={6}>
              <div style={{
                border: "2px solid rgb(155, 234, 252)",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(15, 161, 252, 0.15)",
                padding: "10px",
                backgroundColor: "white"
              }}>
                <h5 className="text-center fw-bold mb-2" style={{ color: "#003366" }}>Our Moments</h5>
                <Carousel controls={false} indicators={false} interval={2500}>
                  {["/images/homeImg1.jpg", "/images/homeImg2.jpg", "/images/homeImg3.jpg", "/images/homeImg4.jpg"].map((src, i) => (
                    <Carousel.Item key={i}>
                      <img
                        src={src}
                        alt={`Moment ${i + 1}`}
                        className="d-block w-100 img-fluid"
                        style={{ height: "240px", objectFit: "cover", borderRadius: "8px" }}
                      />
                    </Carousel.Item>
                  ))}
                </Carousel>
              </div>
            </Col>

            {/*  Our Events Section */}
            <Col xs={12} md={6}>
              <div style={{
                border: "2px solid rgb(155, 234, 252)",
                borderRadius: "10px",
                boxShadow: "0 4px 12px rgba(0, 183, 255, 0.15)",
                padding: "10px",
                backgroundColor: "white",
                position: "relative"
              }}>
                <h5 className="text-center fw-bold mb-2" style={{ color: "#003366" }}>Our Events</h5>
                <div>
                  {eventSlides[currentSlide].map((event, index) => (
                    <div
                      key={index}
                      className="p-2 my-1 rounded border"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event);
                      }}
                      style={{ borderColor: "#a70a4a", cursor: "pointer" }}
                    >
                      <h6 className="fw-bold mb-1" style={{ color: "#a70a4a" }}>{event}</h6>
                      <p className="mb-0" style={{ fontSize: "0.9rem" }}>Description</p>
                    </div>
                  ))}
                </div>

                {/*  Arrows for Slide */}
                <div className="d-flex justify-content-between mt-2">
                  <button onClick={prevSlide} className="btn btn-light p-1">
                    <FaArrowLeft style={{ color: "#a70a4a" }} />
                  </button>
                  <button onClick={nextSlide} className="btn btn-light p-1">
                    <FaArrowRight style={{ color: "#a70a4a" }} />
                  </button>
                </div>

                {/*  Event Detail Popup */}
                {selectedEvent && (
                  <div
                    className="position-absolute bg-white p-3 rounded shadow"
                    style={{
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      zIndex: 999,
                      border: "1px solid #ccc",
                      width: "300px"
                    }}
                  >
                    <h5 className="fw-bold text-center mb-2" style={{ color: "#a70a4a" }}>{selectedEvent}</h5>
                    <p><strong>Date:</strong> {eventDetails[selectedEvent].date}</p>
                    <p><strong>Start:</strong> {eventDetails[selectedEvent].start}</p>
                    <p><strong>End:</strong> {eventDetails[selectedEvent].end}</p>
                    <p><strong>Purpose:</strong> {eventDetails[selectedEvent].purpose}</p>
                    <p><strong>Requirements:</strong> {eventDetails[selectedEvent].requirements}</p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Home;
