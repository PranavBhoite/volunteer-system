import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, Spinner } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    mobileNo: "",
    type: "Volunteer",
    interests: ""
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
    if (!formData.interests.trim()) newErrors.interests = "Please specify your areas of interest"; 

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
      await axios.post("http://localhost:5000/api/auth/register", formData);
      setServerMsg("Registration successful!");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setServerMsg(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{
      backgroundImage: "url('/images/Login.png')", // Use same background as Login
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    }}>
      <Container style={{ paddingTop: "40px", paddingBottom: "40px" }}>
        <Row>
          <Col md={6} lg={5}>
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              padding: "2.5rem",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
            }}>
              <h2 className="mb-4 text-center" style={{ color: "#2c3e50", fontWeight: "bold" }}>User Registration</h2>

              {serverMsg && (
                <Alert variant={serverMsg.includes("successful") ? "success" : "danger"} className="text-center">
                  {serverMsg}
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4" controlId="formName">
                  <Form.Label style={{ fontWeight: "600", color: "#555" }}>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    isInvalid={!!errors.name}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "rgba(255, 255, 255, 0.8)"
                    }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formEmail">
                  <Form.Label style={{ fontWeight: "600", color: "#555" }}>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    isInvalid={!!errors.email}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "rgba(255, 255, 255, 0.8)"
                    }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label style={{ fontWeight: "600", color: "#555" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    isInvalid={!!errors.password}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "rgba(255, 255, 255, 0.8)"
                    }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formAddress">
                  <Form.Label style={{ fontWeight: "600", color: "#555" }}>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    isInvalid={!!errors.address}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "rgba(255, 255, 255, 0.8)"
                    }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.address}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formMobileNo">
                  <Form.Label style={{ fontWeight: "600", color: "#555" }}>Mobile Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter mobile number"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    isInvalid={!!errors.mobileNo}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "rgba(255, 255, 255, 0.8)"
                    }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.mobileNo}</Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formUserType">
                  <Form.Label style={{ fontWeight: "600", color: "#555" }}>User Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "rgba(255, 255, 255, 0.8)"
                    }}
                  >
                    <option value="Volunteer">Volunteer</option>
                    <option value="Intern">Intern</option>
                    <option value="Field Worker">Field Worker</option>
                    <option value="Other">Other</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formInterests">
                  <Form.Label style={{ fontWeight: "600", color: "#555" }}>Interests</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    placeholder="Enter Interests space seperated"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    isInvalid={!!errors.interests}
                    style={{
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "rgba(255, 255, 255, 0.8)"
                    }}
                  />
                  <Form.Control.Feedback type="invalid">{errors.interests}</Form.Control.Feedback>
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                    style={{
                      width: "100%",
                      padding: "12px",
                      borderRadius: "6px",
                      backgroundColor: "#3498db",
                      border: "none",
                      fontWeight: "600",
                      fontSize: "1rem"
                    }}
                  >
                    {isSubmitting ? <Spinner animation="border" size="sm" /> : "Register"}
                  </Button>
                </div>
              </Form>

              <p className="mt-4 text-center" style={{ color: "#666" }}>
                Already have an account? <a href="/login" style={{ color: "#3498db", textDecoration: "none" }}>Login</a>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Registration;
