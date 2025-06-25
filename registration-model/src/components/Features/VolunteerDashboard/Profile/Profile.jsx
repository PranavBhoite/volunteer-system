import React, { useState, useEffect } from "react";
import {
  Card,
  Container,
  Spinner,
  Button,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaUserCircle } from "react-icons/fa";

const Profile = () => {
  const { uid } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    mobileNo: "",
    type: "",
    interest: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(
          `http://localhost:5000/api/users/display/${uid}`
        );
        setUser(userRes.data);
        setFormData({
          name: userRes.data.name || "",
          email: userRes.data.email || "",
          address: userRes.data.address || "",
          mobileNo: userRes.data.mobileNo || "",
          type: userRes.data.type || "",
          interest: userRes.data.interests || "",
        });
      } catch {
        alert("Failed to load user info.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      try {
        await axios.put(
          `http://localhost:5000/api/users/update/${uid}`,
          formData
        );
        alert("Profile updated successfully");
      } catch {
        alert("Failed to update profile.");
      }
    }
    setIsEditing(!isEditing);
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "60vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  const fieldBoxStyle = {
    padding: "12px 16px",
    border: "none",
    borderBottom: "1px solid #e0e0e0",
    backgroundColor: "#fff",
    borderRadius: "6px",
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    boxShadow: "none",
    fontSize: "1rem",
    backgroundColor: "transparent",
    paddingLeft: "0",
  };

  return (
   <div className="main-content-container">
    <div style={{ background: "#fff" }}>
      <div className="text-center mt-4">
        <img src="/images/LOGO.png" alt="TMGF" style={{ width: 120,marginTop: 20 }} />
        <h2 style={{ fontWeight: "bold", marginTop: 20, marginBottom: 24 }}>
          <span style={{ color: "#0599C2" }}>The </span>
          <span style={{ color: "#a70a4a" }}>Mother </span>
          <span style={{ color: "#0599C2" }}>Global Foundation</span>
        </h2>
      </div>

      <Container className="mb-5">
        <Card
          className="p-4"
          style={{
            border: "1px solid #ccc",
            borderRadius: "16px",
            background: "#f9f9f9",
          }}
        >
          <h4
            className="mb-4 d-flex align-items-center"
            style={{
              background: "white",
              color: "#a70a4a" ,
              padding: "10px 24px",
              fontSize: "1.5rem",
              fontWeight: "bold",
              borderRadius: "10px",
              display: "inline-flex",
              alignItems: "center",
              border: "2px solid #8ee8ff",
              marginBottom: "20px",
              maxWidth: "290px",
            }}
          >
            <FaUserCircle size={24} style={{ marginRight: "10px", color: "#a70a4a"  }} />
            Personal Details
          </h4>

          <Row>
            <Col md={6} className="mb-3">
              <div style={fieldBoxStyle}>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold" }}>Name</Form.Label>
                  <Form.Control
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    style={inputStyle}
                  />
                </Form.Group>
              </div>
            </Col>

            <Col md={6} className="mb-3">
              <div style={fieldBoxStyle}>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Address
                  </Form.Label>
                  <Form.Control
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    style={inputStyle}
                  />
                </Form.Group>
              </div>
            </Col>

            <Col md={6} className="mb-3">
              <div style={fieldBoxStyle}>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold" }}>Email</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    style={inputStyle}
                  />
                </Form.Group>
              </div>
            </Col>

            <Col md={6} className="mb-3">
              <div style={fieldBoxStyle}>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Contact No
                  </Form.Label>
                  <Form.Control
                    name="mobileNo"
                    type="tel"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    style={inputStyle}
                  />
                </Form.Group>
              </div>
            </Col>

            <Col md={6} className="mb-3">
              <div style={fieldBoxStyle}>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold" }}>Type</Form.Label>
                  <Form.Control
                    name="type"
                    type="text"
                    value={formData.type}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    style={inputStyle}
                  />
                </Form.Group>
              </div>
            </Col>

            <Col md={6} className="mb-3">
              <div style={fieldBoxStyle}>
                <Form.Group>
                  <Form.Label style={{ fontWeight: "bold" }}>
                    Interest
                  </Form.Label>
                  <Form.Control
                    name="interest"
                    type="text"
                    value={formData.interest}
                    onChange={handleChange}
                    readOnly={!isEditing}
                    style={inputStyle}
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>

          <div className="text-center mt-3">
            <Button
              variant="primary"
              onClick={handleEditToggle}
              style={{ backgroundColor: "#15b1d3", borderRadius: "8px" }}
            >
              {isEditing ? "Save Details" : "Edit Details"}
            </Button>
          </div>
        </Card>
      </Container>
    </div>
    </div>
  );
};

export default Profile;