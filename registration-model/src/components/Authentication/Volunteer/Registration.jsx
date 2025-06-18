import React, { useState } from "react";
import { Form, Button, Container, Alert, Spinner } from "react-bootstrap";
import axios from "axios";

const Registration = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    address: "",
    mobileNo: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");
    setSuccessMsg("");

    try {
      const response = await axios.post("http://localhost:5000/api/auth/register", formData);
      setSuccessMsg(response.data.message || "Registration successful!");
      setFormData({ name: "", email: "", password: "", address: "", mobileNo: "" });
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container style={{ maxWidth: "500px", marginTop: "40px" }}>
      <h3 className="mb-4">Register</h3>
      {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}
      {successMsg && <Alert variant="success">{successMsg}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAddress">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="Your address"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formMobileNo">
          <Form.Label>Mobile Number</Form.Label>
          <Form.Control
            type="text"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            placeholder="Enter your mobile number"
          />
        </Form.Group>

        <Button variant="primary" type="submit" disabled={loading} className="w-100">
          {loading ? <Spinner animation="border" size="sm" /> : "Register"}
        </Button>
      </Form>
    </Container>
  );
};

export default Registration;
