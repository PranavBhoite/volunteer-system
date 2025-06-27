import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Alert, Row, Col } from 'react-bootstrap';
import { useNavigate, Link } from 'react-router-dom';

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/admin/login', { email, password });
      const uid = res.data.uid;
      setError('');
      navigate(`/admin-dashboard/${uid}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
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
              <h2 className="mb-4" style={{ color: "#2c3e50", fontWeight: "bold" }}>Admin Login</h2>
              
              {error && <Alert variant="danger" className="text-center">{error}</Alert>}
              
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-4">
                  <Form.Label style={{ fontWeight: "600", color: "#555" }}>Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
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
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ 
                      padding: "12px",
                      borderRadius: "6px",
                      border: "1px solid #ddd",
                      backgroundColor: "rgba(255, 255, 255, 0.8)"
                    }}
                  />
                </Form.Group>

                <Button 
                  variant="success" 
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
                Go to <Link to="/login" style={{ color: "#3498db", textDecoration: "none" }}>Registration</Link>
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminLogin;