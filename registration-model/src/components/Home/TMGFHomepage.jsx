import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  Card,
  Badge,
  Alert,
  ProgressBar,
} 
from "react-bootstrap";

const TMGFHomepage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate("/login");
  };

  const features = [
    {
      icon: "🏠",
      title: "Orphanages & Shelter Homes",
      description:
        "Runs 4 orphanages—like Shree Manashanti Chhatralaya, Mamata Bal Sadan and Maainagari—offering safe shelter, food and care to 260+ children",
      gradient: "linear-gradient(135deg, #ff6b9d, #4ecdc4)",
    },
    {
      icon: "🎓",
      title: "Education Support",
      description:
        "Supports education for 260+ children across 12 schools and 5 colleges; includes libraries, computer labs and motivational sessions",
      gradient: "linear-gradient(135deg, #667eea, #764ba2)",
    },
    {
      icon: "🩺",
      title: "Healthcare & Nutrition",
      description:
        "Provides quality food, routine medical care, and hospital tie‑ups to ensure holistic health and well‑being",
      gradient: "linear-gradient(135deg, #f093fb, #f5576c)",
    },
    {
      icon: "🌱",
      title: "Emotional & Social Upliftment",
      description:
        "Creates loving, home‑like environments to build confidence, emotional stability and seamless integration into society",
      gradient: "linear-gradient(135deg, #4facfe, #00f2fe)",
    },
    {
      icon: "🏆",
      title: "Alumni Success & Impact",
      description:
        "Over 2,100 orphaned individuals raised; 1,000+ are employed and 400+ are married, reflecting long‑term rehabilitation success",
      gradient: "linear-gradient(135deg, #a8edea, #fed6e3)",
    },
    {
      icon: "📄",
      title: "Registered & Credible NGO",
      description:
        "Officially registered since 2017, working under a transparent governance structure led by trusts and Padma Shri recipient Sindhutai Maai",
      gradient: "linear-gradient(135deg, #ff9a9e, #fecfef)",
    },
  ];

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Navigation */}
      <Navbar
        expand="lg"
        className="shadow-sm"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container>
          <Navbar.Brand className="d-flex align-items-center">
            <div
              className="me-3 d-flex align-items-center justify-content-center text-white fw-bold rounded-3"
              style={{
                width: "50px",
                height: "50px",
                background: "linear-gradient(135deg, #ff6b9d, #4ecdc4)",
                fontSize: "18px",
              }}
            >
              TMGF
            </div>
            <span className="fw-bold text-dark fs-5">
              The Mother Global Foundation
            </span>
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Button
              onClick={handleGetStartedClick}
              className="px-4 py-2 border-0 fw-semibold"
              style={{
                background: "linear-gradient(135deg, #ff6b9d, #4ecdc4)",
              }}
            >
              Get Started
            </Button>
          </Nav>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container className="py-5">
        <Row className="align-items-center py-5">
          <Col lg={6} className="mb-5 mb-lg-0">
            <div className="text-center text-lg-start text-white">
              <h1 className="display-1 fw-bold mb-4">
                <span
                  style={{
                    background: "linear-gradient(135deg, #4facfe, #00f2fe)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Volunteer
                </span>
                <br />
                <span
                  style={{
                    background: "linear-gradient(135deg, #ff6b9d, #ffc3a0)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  Management
                </span>
              </h1>
              <p className="lead mb-4 text-light fs-4">
                Empower your NGO with our comprehensive volunteer management
                platform for TMGF
              </p>

              <div className="d-flex flex-wrap gap-3 justify-content-center justify-content-lg-start mb-5">
                <Button
                  size="lg"
                  className="px-4 py-3 border-0 fw-semibold"
                  style={{
                    background: "linear-gradient(135deg, #ff6b9d, #4ecdc4)",
                  }}
                >
                  Donate Now
                </Button>
                <Button
                  size="lg"
                  className="px-4 py-3 text-white fw-semibold"
                  variant="outline-light"
                  href="https://youtu.be/XE2zps1lWdQ?si=9yKWSCVlCX0JOP1X"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Watch about TMGF
                </Button>
              </div>

              {/* Stats */}
              <Row className="text-center">
                <Col xs={4}>
                  <div
                    className="p-3 rounded-4 mb-2"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <h2 className="fw-bold text-white mb-1">120</h2>
                    <p className="text-light small mb-0">Active Volunteers</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div
                    className="p-3 rounded-4 mb-2"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <h2 className="fw-bold text-white mb-1">24</h2>
                    <p className="text-light small mb-0">Events</p>
                  </div>
                </Col>
                <Col xs={4}>
                  <div
                    className="p-3 rounded-4 mb-2"
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <h2 className="fw-bold text-white mb-1">24/7</h2>
                    <p className="text-light small mb-0">Support</p>
                  </div>
                </Col>
              </Row>
            </div>
          </Col>

          {/* Enhanced Dashboard Preview */}
          <Col lg={6}>
            <div className="position-relative">
              {/* Main Dashboard Card */}
              <Card
                className="shadow-lg border-0 mb-4"
                style={{
                  transform: "rotate(2deg)",
                  transition: "transform 0.3s ease",
                  background: "linear-gradient(135deg, #667eea, #764ba2)",
                }}
              >
                <Card.Header className="border-0 text-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0 fw-bold">Dashboard Overview</h4>
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle me-2"
                        style={{
                          width: "12px",
                          height: "12px",
                          backgroundColor: "#4ade80",
                          animation: "pulse 2s infinite",
                        }}
                      ></div>
                      <Badge bg="success" className="px-3 py-2">
                        Live
                      </Badge>
                    </div>
                  </div>
                </Card.Header>
                <Card.Body className="text-white">
                  {/* Active Volunteers Section */}
                  <div
                    className="p-4 rounded-4 mb-4"
                    style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                  >
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <div>
                        <h6 className="mb-1">Active Volunteers</h6>
                        <h2
                          className="fw-bold mb-0"
                          style={{ color: "#fbbf24" }}
                        >
                          145
                        </h2>
                      </div>
                      <div className="text-end">
                        <small className="text-light">Last updated</small>
                        <div className="fw-semibold">Just Now</div>
                      </div>
                    </div>
                    <ProgressBar
                      now={85}
                      className="mb-2"
                      style={{
                        height: "8px",
                        backgroundColor: "rgba(255, 255, 255, 0.2)",
                      }}
                    />
                    <small className="text-light">85% engagement rate</small>
                  </div>

                  {/* Stats Grid */}
                  <Row className="g-3">
                    <Col xs={6}>
                      <div
                        className="p-3 rounded-4 text-center h-100"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      >
                        <div className="fs-5 mb-2">📅</div>
                        <h6 className="mb-1">Registered Events</h6>
                        <h4
                          className="fw-bold mb-0"
                          style={{ color: "#34d399" }}
                        >
                          145
                        </h4>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div
                        className="p-3 rounded-4 text-center h-100"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      >
                        <div className="fs-5 mb-2">✅</div>
                        <h6 className="mb-1">Completed Events</h6>
                        <h4
                          className="fw-bold mb-0"
                          style={{ color: "#fbbf24" }}
                        >
                          23
                        </h4>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div
                        className="p-3 rounded-4 text-center h-100"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      >
                        <div className="fs-5 mb-2">⏰</div>
                        <h6 className="mb-1">Pending</h6>
                        <h4
                          className="fw-bold mb-0"
                          style={{ color: "#f472b6" }}
                        >
                          12
                        </h4>
                      </div>
                    </Col>
                    <Col xs={6}>
                      <div
                        className="p-3 rounded-4 text-center h-100"
                        style={{ backgroundColor: "rgba(255, 255, 255, 0.15)" }}
                      >
                        <div className="fs-5 mb-2">📊</div>
                        <h6 className="mb-1">Impact Score</h6>
                        <h4
                          className="fw-bold mb-0"
                          style={{ color: "#60a5fa" }}
                        >
                          98%
                        </h4>
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>

              {/* Floating Management Card */}
              <Card
                className="position-absolute shadow-lg border-0 text-white"
                style={{
                  bottom: "-30px",
                  right: "-30px",
                  transform: "rotate(-5deg)",
                  maxWidth: "220px",
                  background: "linear-gradient(135deg, #ff6b9d, #4ecdc4)",
                  transition: "transform 0.3s ease",
                }}
              >
                <Card.Body className="text-center p-4">
                  <div className="fs-1 mb-2">🤝</div>
                  <h5 className="fw-bold mb-1">Volunteer</h5>
                  <h6 className="mb-0">Management</h6>
                  <div className="mt-3">
                    <Badge bg="light" text="dark" className="px-3 py-2">
                      System Active
                    </Badge>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <div
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)",
        }}
      >
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-4 fw-bold mb-4" style={{ color: "#2d3748" }}>
              Services Provided by TMGF
            </h2>
            <p
              className="lead text-muted fs-5 mx-auto"
              style={{ maxWidth: "600px" }}
            >
              Transforming Lives with Compassion, Education, and Empowerment—One
              Child at a Time.
            </p>
          </div>

          <Row className="g-4">
            {features.map((feature, index) => (
              <Col key={index} sm={6} lg={4}>
                <Card
                  className="h-100 border-0 shadow-lg position-relative overflow-hidden"
                  style={{
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform =
                      "translateY(-10px) scale(1.02)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translateY(0) scale(1)";
                  }}
                >
                  <div
                    className="position-absolute top-0 start-0 w-100"
                    style={{
                      height: "6px",
                      background: feature.gradient,
                    }}
                  ></div>
                  <Card.Body className="text-center p-4">
                    <div
                      className="d-inline-flex align-items-center justify-content-center rounded-circle mb-4"
                      style={{
                        width: "80px",
                        height: "80px",
                        background: feature.gradient,
                        fontSize: "2rem",
                      }}
                    >
                      {feature.icon}
                    </div>
                    <Card.Title
                      className="h5 fw-bold mb-3"
                      style={{ color: "#2d3748" }}
                    >
                      {feature.title}
                    </Card.Title>
                    <Card.Text className="text-muted lh-base">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      {/* Footer */}
      <footer
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <Container>
          <Row className="align-items-center">
            <Col md={6}>
              <div className="d-flex align-items-center">
                <div
                  className="me-3 d-flex align-items-center justify-content-center text-white fw-bold rounded-3"
                  style={{
                    width: "40px",
                    height: "40px",
                    background: "linear-gradient(135deg, #ff6b9d, #4ecdc4)",
                    fontSize: "14px",
                  }}
                >
                  TMGF
                </div>
                <span className="fw-bold text-white">
                  The Mother Global Foundation
                </span>
              </div>
            </Col>
            <Col md={6} className="text-md-end mt-3 mt-md-0">
              <small className="text-light">
                © 2025 TMGF NGO. All rights reserved.
              </small>
            </Col>
          </Row>
        </Container>
      </footer>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
};

export default TMGFHomepage;
