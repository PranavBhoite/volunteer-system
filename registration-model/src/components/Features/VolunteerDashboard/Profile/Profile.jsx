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
import { isPendingUser, isReadOnlyMode } from "../../../../utils/userPermissions";

const Profile = () => {
  const { uid } = useParams();
  const [errors, setErrors] = useState({ mobileNo: "" }); // 👈 Added to track mobile number validation
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
          `api/users/display/${uid}`
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
    // ✅ Prevent saving if mobile number is not exactly 10 digits
    if (formData.mobileNo.length !== 10) {
      alert("Mobile number must be exactly 10 digits");
      return;
    }

    try {
      await axios.put(
        `httpapi/users/update/${uid}`,
        formData
      );
      alert("Profile updated successfully");
    } catch (err) {
      if (err.response?.status === 403) {
        alert(err.response.data.message || "You don't have permission to update your profile.");
      } else {
        alert("Failed to update profile.");
      }
      return; // Don't toggle editing state if update failed
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
    <div className="main-content">

      <div className="text-center mt-4">
        <img src="/images/LOGO.png" alt="TMGF" style={{ width: 120, marginTop: 20 }} />
        <h2 style={{ fontWeight: "bold", marginTop: 20, marginBottom: 24 }}>
          <span style={{ color: "#0599C2" }}>The </span>
          <span style={{ color: "#a70a4a" }}>Mother </span>
          <span style={{ color: "#0599C2" }}>Global Foundation</span>
        </h2>
      </div>

      <Container >
        <Card
          className="p-2"
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
              color: "#a70a4a",
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
            <FaUserCircle size={24} style={{ marginRight: "10px", color: "#a70a4a" }} />
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
                    onChange={(e) => {
                      let input = e.target.value.replace(/\D/g, ""); // Remove non-digits
                      if (input.length > 10) input = input.slice(0, 10); // Limit to 10 digits

                      // Update form data
                      setFormData((prev) => ({ ...prev, mobileNo: input }));

                      // 👇 Show error if less than 10 digits
                      if (input.length < 10) {
                        setErrors((prev) => ({ ...prev, mobileNo: "Mobile number must be exactly 10 digits" }));
                      } else {
                        setErrors((prev) => ({ ...prev, mobileNo: "" }));
                      }
                    }}
                    readOnly={!isEditing}
                    style={inputStyle}
                  />
                  {errors.mobileNo && (
                    <small style={{ color: "red", fontSize: "0.85rem" }}>{errors.mobileNo}</small> // 👈 Show validation message
                  )}

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
            {isPendingUser() && (
              <div className="alert alert-warning mb-3" role="alert">
                <i className="fa fa-exclamation-triangle me-2"></i>
                Your account is pending approval. Profile editing is disabled until approved.
              </div>
            )}
            <Button
              variant="primary"
              onClick={handleEditToggle}
              disabled={isPendingUser()}
              style={{ 
                backgroundColor: isPendingUser() ? "#6c757d" : "#15b1d3", 
                borderRadius: "8px",
                opacity: isPendingUser() ? 0.7 : 1 
              }}
              title={isPendingUser() ? "Account pending approval - Read-only access" : "Edit profile details"}
            >
              {isPendingUser() ? "Read Only Mode" : (isEditing ? "Save Details" : "Edit Details")}
            </Button>
          </div>
        </Card>
      </Container>
    </div>

  );
};

export default Profile;