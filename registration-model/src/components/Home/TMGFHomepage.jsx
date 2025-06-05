import React from "react";
import {
  Container,
  Navbar,
  Nav,
  Button,
  Row,
  Col,
  Card,
  Badge,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const TMGFLandingPage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleSignup = () => {
    navigate("/Registration");
  };

  return (
    <div
      className="min-vh-100"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      {/* Navigation Bar */}
      <Navbar
        expand="lg"
        className="navbar-dark"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
        }}
      >
        <Container>
          <Navbar.Brand href="#" className="fw-bold fs-3 text-white">
            TMGF
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto align-items-center">
              <Nav.Link
                href="#about"
                className="text-white mx-2 fw-medium"
                style={{ fontSize: "1.1rem" }}
              >
                About
              </Nav.Link>
              <Nav.Link
                className="text-white-50 mx-2 fw-medium position-relative"
                style={{ fontSize: "1.1rem", cursor: "not-allowed" }}
              >
                Events
                <Badge
                  bg="warning"
                  className="position-absolute top-0 start-100 translate-middle"
                  style={{ fontSize: "0.6rem" }}
                >
                  Soon
                </Badge>
              </Nav.Link>
              <Button
                variant="outline-light"
                className="mx-2 px-4 py-2 fw-medium"
                onClick={handleLogin}
                style={{ borderRadius: "25px", transition: "all 0.3s ease" }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.2)";
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Login
              </Button>
              <Button
                variant="light"
                className="mx-2 px-4 py-2 fw-medium"
                onClick={handleSignup}
                style={{
                  borderRadius: "25px",
                  transition: "all 0.3s ease",
                  color: "#667eea",
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "#f8f9fa";
                  e.target.style.transform = "translateY(-2px)";
                  e.target.style.boxShadow = "0 8px 25px rgba(0,0,0,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "white";
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow = "none";
                }}
              >
                Sign Up
              </Button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <Container className="py-5 mt-5">
        <Row className="align-items-center min-vh-75">
          <Col lg={6} className="text-white">
            <div className="mb-4">
              <h1
                className="display-3 fw-bold mb-4"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
                  lineHeight: "1.2",
                }}
              >
                Making a <span style={{ color: "#ffd700" }}>Difference</span>{" "}
                Together
              </h1>
              <p
                className="lead mb-4 fs-4"
                style={{
                  textShadow: "1px 1px 2px rgba(0,0,0,0.3)",
                  opacity: 0.9,
                }}
              >
                Join TMGF in our mission to create positive change in
                communities worldwide. Your support and participation can
                transform lives.
              </p>
            </div>

            <div className="d-flex flex-wrap gap-3 mb-5">
              <Button
                size="lg"
                className="px-5 py-3 fw-medium"
                style={{
                  backgroundColor: "#ffd700",
                  border: "none",
                  borderRadius: "30px",
                  color: "#333",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 15px rgba(255, 215, 0, 0.3)",
                }}
                onClick={handleSignup}
                onMouseEnter={(e) => {
                  e.target.style.transform = "translateY(-3px)";
                  e.target.style.boxShadow =
                    "0 8px 25px rgba(255, 215, 0, 0.4)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "translateY(0)";
                  e.target.style.boxShadow =
                    "0 4px 15px rgba(255, 215, 0, 0.3)";
                }}
              >
                Become a Volunteer
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                className="px-5 py-3 fw-medium"
                style={{
                  borderRadius: "30px",
                  borderWidth: "2px",
                  transition: "all 0.3s ease",
                }}
                onClick={handleLogin}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.transform = "translateY(-3px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = "transparent";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Learn More
              </Button>
            </div>
          </Col>

          <Col lg={6} className="text-center">
            <div
              className="position-relative"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                borderRadius: "20px",
                padding: "3rem 2rem",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              <div className="mb-4">
                <div
                  className="mx-auto mb-4"
                  style={{
                    width: "120px",
                    height: "120px",
                    background: "linear-gradient(45deg, #ffd700, #ffed4e)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    boxShadow: "0 10px 30px rgba(255, 215, 0, 0.3)",
                  }}
                >
                  <span className="fs-1">🤝</span>
                </div>
                <h3 className="text-white fw-bold mb-3">Join Our Community</h3>
                <p className="text-white-50 mb-4">
                  Connect with like-minded individuals and make a lasting impact
                  in your community.
                </p>
              </div>

              <div className="d-grid gap-3">
                <Button
                  variant="light"
                  size="lg"
                  onClick={handleSignup}
                  className="fw-medium"
                  style={{
                    borderRadius: "15px",
                    padding: "12px 0",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = "scale(1.05)";
                    e.target.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = "scale(1)";
                    e.target.style.boxShadow = "none";
                  }}
                >
                  🚀 Start Your Journey
                </Button>
                <Button
                  variant="outline-light"
                  size="lg"
                  onClick={handleLogin}
                  className="fw-medium"
                  style={{
                    borderRadius: "15px",
                    padding: "12px 0",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.transform = "scale(1.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = "transparent";
                    e.target.style.transform = "scale(1)";
                  }}
                >
                  🔑 Access Portal
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Features Section */}
      <Container className="py-5" id="about">
        <Row className="text-center mb-5">
          <Col>
            <h2 className="display-5 fw-bold text-white mb-4">
              Why Choose TMGF?
            </h2>
            <p
              className="lead text-white-50 mx-auto"
              style={{ maxWidth: "600px" }}
            >
              We're committed to creating meaningful change through community
              engagement and volunteer empowerment.
            </p>
          </Col>
        </Row>

        <Row className="g-4">
          <Col md={4}>
            <Card
              className="h-100 border-0 shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
              }}
            >
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <span className="fs-1">🌍</span>
                </div>
                <Card.Title className="text-white fw-bold mb-3">
                  Global Impact
                </Card.Title>
                <Card.Text className="text-white-50">
                  Make a difference on a global scale through our international
                  volunteer programs and initiatives.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="h-100 border-0 shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
              }}
            >
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <span className="fs-1">👥</span>
                </div>
                <Card.Title className="text-white fw-bold mb-3">
                  Community Focus
                </Card.Title>
                <Card.Text className="text-white-50">
                  Build stronger communities through collaborative projects and
                  grassroots initiatives.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4}>
            <Card
              className="h-100 border-0 shadow-lg"
              style={{
                background: "rgba(255, 255, 255, 0.1)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-10px)";
                e.currentTarget.style.boxShadow = "0 20px 40px rgba(0,0,0,0.2)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 30px rgba(0,0,0,0.1)";
              }}
            >
              <Card.Body className="text-center p-4">
                <div className="mb-3">
                  <span className="fs-1">⭐</span>
                </div>
                <Card.Title className="text-white fw-bold mb-3">
                  Personal Growth
                </Card.Title>
                <Card.Text className="text-white-50">
                  Develop new skills, gain valuable experience, and grow
                  personally through meaningful volunteer work.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* Footer */}
      <Container className="py-4 mt-5">
        <Row>
          <Col className="text-center">
            <p className="text-white-50 mb-0">
              © 2024 TMGF. Making a difference, one volunteer at a time.
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TMGFLandingPage;
