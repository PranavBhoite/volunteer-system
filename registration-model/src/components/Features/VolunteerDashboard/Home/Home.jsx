import { useEffect, useState } from "react";
import { Button, Carousel, Col, Container, Modal, Row } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";

const Home = () => {
  const [events, setEvents] = useState([]);
  const [eventSlides, setEventSlides] = useState([]);
  const [eventDetails, setEventDetails] = useState({});
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [showHelpModal, setShowHelpModal] = useState(false);

  useEffect(() => {
    const hasSeenHelp = localStorage.getItem("seenHelpPopup");
    if (!hasSeenHelp) {
      setShowHelpModal(true);
      localStorage.setItem("seenHelpPopup", "true");
    }
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/events/getall");
        const fetchedEvents = response.data;

        setEvents(fetchedEvents);

        // Group events into slides of 3 per slide
        const grouped = [];
        for (let i = 0; i < fetchedEvents.length; i += 3) {
          grouped.push(fetchedEvents.slice(i, i + 3));
        }
        setEventSlides(grouped);

        // Create a simple event details object
        const detailMap = {};
        fetchedEvents.forEach(event => {
          detailMap[event.title] = {
            startDate: event.startDate,
            endDate: event.endDate,
            description: event.description || "No description available.",
            location: event.location
          };
        });
        setEventDetails(detailMap);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % eventSlides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + eventSlides.length) % eventSlides.length);

  useEffect(() => {
    const handleClickOutside = () => setSelectedEvent(null);
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div className="main-content ">
      <Container className="mt-4">
      {/* Help Modal */}
      <Modal show={showHelpModal} onHide={() => setShowHelpModal(false)} centered backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "#a70a4a", fontWeight: "bold" }}>Welcome Volunteer!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li><strong>Profile:</strong> Edit your personal details and view your <strong>User ID</strong>.</li>
            <li><strong>Home:</strong> View <strong>TMGF Moments</strong> and highlighted events.</li>
            <li><strong>Event:</strong> Participate in ongoing/upcoming/completed events.</li>
            <li><strong>Event Initiatives:</strong> Create your own events and track approval status.</li>
          </ul>
          <p className="text-muted">Return to Help section anytime from sidebar.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            style={{ backgroundColor: "#15b1d3", border: "none" }}
            onClick={() => setShowHelpModal(false)}
          >
           ok OK
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Header Section */}
      <div style={{
        width: "100%",
        maxWidth: "1200px",
        backgroundColor: "#fff",
        borderRadius: "16px",
        boxShadow: "0 0 25px rgba(0, 0, 0, 0.1)",
        padding: "20px",
        marginTop:"20px"
      }}>
        <div className="text-center mb-4">
          <img src="/images/LOGO.png" alt="TMGF Logo" style={{ width: "140px" }} />
          <h2 style={{ fontWeight: "bold", marginTop: 10, marginBottom: 24 }}>
            <span style={{ color: "#0599C2" }}>The </span>
            <span style={{ color: "#a70a4a" }}>Mother </span>
            <span style={{ color: "#0599C2" }}>Global Foundation</span>
          </h2>
          <p style={{ color: "#003366", fontWeight: 500 }}>
            Founder: Padma Shri Dr. Sindhutai Sapkal 'Maai'
          </p>
          <p className="mt-2 fw-semibold" style={{ maxWidth: "80%", margin: "0 auto" }}>
            We are an NGO focused on uplifting and empowering orphaned children and destitutes through orphanages,
            support, and education.
          </p>
        </div>

        {/* Moments & Events Grid */}
        <Container>
          <Row className="g-4">
            {/* Moments Section */}
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

            {/* Events Section */}
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
                  {eventSlides[currentSlide]?.map((event, index) => (
                    <div
                      key={index}
                      className="p-2 my-1 rounded border"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedEvent(event.title);
                      }}
                      style={{ borderColor: "#a70a4a", cursor: "pointer" }}
                    >
                      <div style={{display : "flex", justifyContent : 'space-between'}}>
                      <h6 className="fw-bold mb-1" style={{ color: "#a70a4a" }}>{event.title}</h6>
                      <span className="text-muted fst-italic">{event.status}</span>
                      </div>
                      <p className="mb-0" style={{ fontSize: "0.9rem" }}>{event.description}</p>
                    </div>
                  ))}
                </div>

                <div className="d-flex justify-content-between mt-2">
                  <button onClick={prevSlide} className="btn btn-light p-1">
                    <FaArrowLeft style={{ color: "#a70a4a" }} />
                  </button>
                  <button onClick={nextSlide} className="btn btn-light p-1">
                    <FaArrowRight style={{ color: "#a70a4a" }} />
                  </button>
                </div>

                {/* Event Popup */}
                {selectedEvent && eventDetails[selectedEvent] && (
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
                    <p><strong>Start Date:</strong> {eventDetails[selectedEvent].startDate}</p>
                    <p><strong>End Date:</strong> {eventDetails[selectedEvent].endDate}</p>
                    <p><strong>Description:</strong> {eventDetails[selectedEvent].description}</p>
                    <p><strong>Location:</strong> {eventDetails[selectedEvent].location}</p>
                  </div>
                )}
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      </Container>
    </div>
  );
};

export default Home;
