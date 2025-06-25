import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Alert, FormCheck } from "react-bootstrap";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

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

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", formData);
      alert(res.data.message);

      // Store user ID locally (using localStorage or sessionStorage based on rememberMe)
      if (rememberMe) {
        localStorage.setItem("userId", res.data.userId);
      } else {
        sessionStorage.setItem("userId", res.data.userId);
      }

      // Navigate to dashboard
      navigate(`/dashboard/${res.data.userId}`);
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div style={{
      backgroundImage: "url('/images/Login.png')", // Replace with your image path
      backgroundSize: "cover",
      backgroundPosition: "center",
      minHeight: "100vh",
      display: "flex",
      alignItems: "center"
    }}>
      <Container>
        <Row>
          <Col md={6} lg={5}>
            <div style={{
              backgroundColor: "rgba(255, 255, 255, 0.85)",
              padding: "2.5rem",
              borderRadius: "10px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
            }}>
              <h2 className="mb-4" style={{ color: "#2c3e50", fontWeight: "bold" }}>Account Login</h2>
              
              {error && <Alert variant="danger" className="text-center">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: "600", color: "#555" }}>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    style={{ 
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "rgba(255, 255, 255, 0.8)"
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: "600", color: "#555" }}>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    style={{ 
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "rgba(255, 255, 255, 0.8)"
                    }}
                  />
                </Form.Group>

                <div className="d-flex justify-content-between align-items-center mb-4">
                  <FormCheck>
                    <FormCheck.Input 
                      type="checkbox" 
                      id="rememberMe"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                    />
                    <FormCheck.Label htmlFor="rememberMe" style={{ color: "#555" }}>Remember Me</FormCheck.Label>
                  </FormCheck>
                  <Link to="/forgot-password" style={{ color: "#3498db", textDecoration: "none" }}>Forgot Password?</Link>
                </div>

                <Button 
                  variant="primary" 
                  type="submit" 
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
                  Login
                </Button>
              </Form>

              <p className="mt-4 text-center" style={{ color: "#666" }}>
                Don't have an account? <Link to="/Registration" style={{ color: "#3498db", textDecoration: "none" }}>Register</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Login;