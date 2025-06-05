import React, { useState } from "react";
import { Form, Button, Card, Alert, Spinner, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const styles = {
    fullScreenContainer: {
      background: "linear-gradient(to right, #6A1B9A, #880E4F)",
      minHeight: "100vh",
      width: "100vw",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px"
    },
    leftContentPanel: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "flex-start",
      color: "white",
      padding: "40px",
      textAlign: "left"
    },
    leftPanelLogo: {
      height: "100px",
      width: "auto",
      marginBottom: "20px"
    },
    leftPanelHeading: {
      fontSize: "3rem",
      fontWeight: "bold",
      marginBottom: "15px",
      lineHeight: "1.2"
    },
    leftPanelText: {
      fontSize: "1.1rem",
      lineHeight: "1.5",
      maxWidth: "500px",
      marginBottom: "30px"
    },
    formCard: {
      width: "100%",
      maxWidth: "450px",
      padding: "30px",
      borderRadius: "12px",
      backgroundColor: "rgba(255, 255, 255, 0.5)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      backdropFilter: "blur(5px)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    cardLogoCircle: {
      height: "100px",
      width: "100px",
      borderRadius: "50%",
      backgroundColor: "#FFC107",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginBottom: "20px",
      overflow: "hidden"
    },
    cardLogoImage: {
      height: "80%",
      width: "80%",
      objectFit: "contain"
    },
    cardHeading: {
      textAlign: "center",
      fontWeight: "bold",
      marginBottom: "20px",
      fontSize: "24px",
      color: "#333"
    },
    formControl: {
      borderRadius: "8px",
      padding: "12px",
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      border: "1px solid rgba(0, 0, 0, 0.1)"
    },
    buttonPrimary: {
      backgroundColor: "#6A1B9A",
      borderColor: "#6A1B9A",
      borderRadius: "8px",
      fontWeight: "bold",
      padding: "12px"
    },
    footer: {
      marginTop: "20px",
      textAlign: "center",
      color: "#555",
      fontSize: "0.9rem"
    },
    footerLink: {
      color: "#6A1B9A",
      fontWeight: "bold",
      textDecoration: "none"
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Both email and password are required.");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      alert(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Container fluid style={styles.fullScreenContainer}>
      <Row className="flex-grow-1 w-100 g-0">
        {/* Left Panel */}
        <Col lg={6} className="d-none d-lg-flex" style={styles.leftContentPanel}>
          <img src="/LOGO.png" alt="TMGF Logo" style={styles.leftPanelLogo} />
          <h1 style={styles.leftPanelHeading}>Welcome Back!</h1>
          <p style={styles.leftPanelText}>
            We're glad to see you again. Log in to continue supporting TMGF’s mission to change lives.
          </p>
        </Col>

        {/* Right Panel - Centered Form */}
        <Col
          lg={6}
          className="d-flex justify-content-center align-items-center"
          style={{ minHeight: "100vh" }}
        >
          <Card style={styles.formCard}>
            <div style={styles.cardLogoCircle}>
              <img src="/LOGO.png" alt="TMGF Logo" style={styles.cardLogoImage} />
            </div>

            <h2 style={styles.cardHeading}>Login to Your Account</h2>

            {error && <Alert variant="danger">{error}</Alert>}

            <Form onSubmit={handleSubmit} className="w-100">
              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  style={styles.formControl}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  style={styles.formControl}
                />
              </Form.Group>

              <div className="d-grid">
                <Button
                  type="submit"
                  variant="primary"
                  disabled={isSubmitting}
                  style={styles.buttonPrimary}
                >
                  {isSubmitting ? <Spinner animation="border" size="sm" /> : "Login"}
                </Button>
              </div>
            </Form>

            <div style={styles.footer}>
              Don't have an account? <Link to="/" style={styles.footerLink}>Register here</Link>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
