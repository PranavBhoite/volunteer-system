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
  const pinkColor = "#a70a4a";
 

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    mobileNo: "",
  });

  const [registeredEvents, setRegisteredEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userRes = await axios.get(`http://localhost:5000/api/users/display/${uid}`);
        setUser(userRes.data);
        setFormData({
          name: userRes.data.name || "",
          email: userRes.data.email || "",
          address: userRes.data.address || "",
          mobileNo: userRes.data.mobileNo || "",
        });
      } catch {
        alert("Failed to load user info.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [uid]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/events/${uid}/Registered`);
        setRegisteredEvents(res.data || []);
      } catch {
        console.log("Event fetch error");
      }
    };
    fetchEvents();
  }, [uid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleEditToggle = async () => {
    if (isEditing) {
      // On Save
      try {
        await axios.put(`http://localhost:5000/api/users/update/${uid}`, formData);
        alert("Profile updated successfully");
      } catch {
        alert("Failed to update profile.");
      }
    }
    setIsEditing(!isEditing);
  };

  if (loading) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "60vh" }}>
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <div style={{ background: "#fff" }}>
      <div className="text-center mt-4">
        <img src="/LOGO.png" alt="TMGF" style={{ width: 120 }} />
        <h2 style={{ fontWeight: "bold", marginTop: 10, marginBottom: 24 }}>
          <span style={{ color: "#0599C2" }}>The </span>
          <span style={{ color: pinkColor }}>Mother </span>
          <span style={{ color: "#0599C2" }}>Global Foundation</span>
        </h2>
      </div>

      <Container className="mb-5">
        <Card className="shadow-sm  p-4" style={{ border: `1px solid ${pinkColor}`,  
    borderRadius: "16px",
    boxShadow: "0 0 12px rgba(167, 10, 74, 0.1)" }}>
          <h4
            className="mb-4 d-flex align-items-center"
            style={{
              background: 'white',
              color: '#a70a4a',
              padding: '10px 24px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              borderRadius: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              border: '2px solid #8ee8ff',
              marginBottom: '20px',
              maxWidth: '290px'
            }}
          >
            <FaUserCircle size={24} style={{ marginRight: "10px" }} />
            Personal Details
          </h4>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  name="address"
                  type="text"
                  value={formData.address}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  name="mobileNo"
                  type="tel"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  readOnly={!isEditing}
                />
              </Form.Group>
            </Col>
          </Row>

          <div className="text-center">
            <Button
              variant="primary"
              onClick={handleEditToggle}
              style={{ backgroundColor: "#15b1d3", borderRadius: "8px" }}
            >
              {isEditing ? "Save Details" : "Edit Details"}
            </Button>
          </div>
        </Card>

        {/* Registration Count Card */}
        <Card className="mt-4 shadow-sm text-center" style={{
          border: `1px solid ${pinkColor}`,
          borderRadius: "12px",
          maxWidth: 400,
          margin: "20px auto",
          padding: "10px 0"
        }}>
          <div className="d-flex justify-content-between px-3 fw-bold">
            <span>Your Registration Count</span>
            <span>{registeredEvents.length}</span>
          </div>
        </Card>
      </Container>
    </div>
  );
};

export default Profile;