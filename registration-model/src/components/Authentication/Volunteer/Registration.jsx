import React, { useState } from "react";
import { Form, Button, Card, Alert, Spinner, Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    mobileNo: ""
  });

  const [errors, setErrors] = useState({});
  const [serverMsg, setServerMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mobileRegex = /^[6-9]\d{9}$/;

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!emailRegex.test(formData.email)) newErrors.email = "Invalid email";
    if (formData.password.length < 8) newErrors.password = "Minimum 8 characters";
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!mobileRegex.test(formData.mobileNo)) newErrors.mobileNo = "Invalid mobile number";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
    setErrors((prev) => ({
      ...prev,
      [e.target.name]: ""
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerMsg("");

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await axios.post("http://localhost:5000/api/auth/register", formData);
      setServerMsg("Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setServerMsg(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
    leftPanelButton: {
      backgroundColor: "#FFC107",
      borderColor: "#FFC107",
      color: "#000",
      fontWeight: "bold",
      padding: "12px 25px",
      borderRadius: "8px"
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
    buttonOutlineSecondary: {
      borderRadius: "8px",
      fontWeight: "bold",
      padding: "12px",
      borderColor: "#6A1B9A",
      color: "#6A1B9A",
      backgroundColor: "rgba(255, 255, 255, 0.8)"
    },
    orSeparator: {
      textAlign: "center",
      margin: "20px 0",
      color: "#666",
      fontSize: "0.9rem",
      width: "100%"
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

  return (
    <Container fluid style={styles.fullScreenContainer}>
      <Row className="flex-grow-1 w-100 g-0">
        {/* Left Panel */}
        <Col lg={6} className="d-none d-lg-flex" style={styles.leftContentPanel}>
          <img src="/LOGO.png" alt="TMGF Logo" style={styles.leftPanelLogo} />
          <h1 style={styles.leftPanelHeading}>Making a Difference Together</h1>
          <p style={styles.leftPanelText}>
            Join TMGF in our mission to create positive change in communities worldwide. Your support and participation can transform lives.
          </p>
          <div className="d-flex gap-3">
            <Button style={styles.leftPanelButton}>Become a Volunteer</Button>
            <Button style={styles.leftPanelButton}>Learn More</Button>
          </div>
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

            <h2 style={styles.cardHeading}>Sign up to Volunteer</h2>

            {serverMsg && (
              <Alert variant={serverMsg.includes("successful") ? "success" : "danger"}>
                {serverMsg}
              </Alert>
            )}

            <Button variant="outline-secondary" className="w-100 mb-3" style={styles.buttonOutlineSecondary}>
              Sign up with Google
            </Button>

            <div className="text-center mb-3 text-muted" style={styles.orSeparator}>OR</div>

            <Form onSubmit={handleSubmit} className="w-100">
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  isInvalid={!!errors.name}
                  style={styles.formControl}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                  style={styles.formControl}
                />
                <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                  style={styles.formControl}
                />
                <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  isInvalid={!!errors.address}
                  style={styles.formControl}
                />
                <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="Mobile Number"
                  name="mobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  isInvalid={!!errors.mobileNo}
                  style={styles.formControl}
                />
                <Form.Control.Feedback type="invalid">{errors.mobileNo}</Form.Control.Feedback>
              </Form.Group>

              <div className="d-grid">
                <Button type="submit" variant="primary" disabled={isSubmitting} style={styles.buttonPrimary}>
                  {isSubmitting ? <Spinner animation="border" size="sm" /> : "Register"}
                </Button>
              </div>
            </Form>

            <div style={styles.footer}>
              Already registered? <a href="/login" style={styles.footerLink}>Login here</a>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Registration;
