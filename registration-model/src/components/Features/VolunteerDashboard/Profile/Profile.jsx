import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Container,
  Row,
  Col,
  Spinner,
  Alert,
  Button,
  Form,
} from "react-bootstrap";
import { useParams } from "react-router-dom";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Profile = () => {
  const { uid } = useParams();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    mobileNo: "",
  });
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState("");
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const successTimeoutRef = useRef(null);

  // Fetch user data on mount and uid change
  useEffect(() => {
    setLoading(true);
    setError("");
    axios
      .get(`http://localhost:5000/api/users/display/${uid}`)
      .then((res) => {
        setUser(res.data);
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          address: res.data.address || "",
          mobileNo: res.data.mobileNo || "",
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error("User fetch error:", err);
        setError("Failed to load user info.");
        setLoading(false);
      });
  }, [uid]);

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  // Validate inputs, return true if all good
  const validate = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email.trim())
    ) {
      errors.email = "Invalid email address";
    }

    if (formData.mobileNo.trim()) {
      if (!/^\d{7,15}$/.test(formData.mobileNo.trim())) {
        errors.mobileNo = "Mobile number should be digits only (7-15 chars)";
      }
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  // Detect if form data changed from original user data
  const isFormChanged = () => {
    if (!user) return false;
    return (
      formData.name !== user.name ||
      formData.email !== user.email ||
      formData.address !== user.address ||
      formData.mobileNo !== user.mobileNo
    );
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear validation error on change
    setValidationErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSave = async () => {
    if (!validate()) return; // stop save if validation fails

    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);

    try {
      await axios.put(`http://localhost:5000/api/users/update/${uid}`, formData);
      setUser(formData);
      setSaveSuccess(true);
      setEditMode(false);

      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = setTimeout(() => {
        setSaveSuccess(false);
      }, 2500);
    } catch (error) {
      setSaveError("Failed to save changes. Please try again.");
      console.error(error);
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "50vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="mt-4">
        <Alert variant="danger" className="text-center">
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="py-5 min-vh-100" style={{ maxWidth: "900px" }}>
      <h2
        className="mb-5 text-center"
        style={{ fontWeight: "700", color: "#4b0082" }}
      >
        User Profile
      </h2>

      <Row className="gy-4 justify-content-center">
        {/** Cards for each field **/}
        <Col xs={12} md={6} lg={4}>
          <Card
            className="shadow-sm rounded-4 h-100 border-0"
            style={{ borderRadius: "12px" }}
          >
            <Card.Body>
              <Card.Title
                className="mb-3"
                style={{ color: "#6a4bcf", fontWeight: "600" }}
              >
                Name
              </Card.Title>
              {editMode ? (
                <>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter name"
                    isInvalid={!!validationErrors.name}
                    style={{ boxShadow: "inset 0 0 8px rgba(111,66,193,0.3)" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.name}
                  </Form.Control.Feedback>
                </>
              ) : (
                <Card.Text className="fs-5 text-secondary">{user.name}</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <Card
            className="shadow-sm rounded-4 h-100 border-0"
            style={{ borderRadius: "12px" }}
          >
            <Card.Body>
              <Card.Title
                className="mb-3"
                style={{ color: "#6a4bcf", fontWeight: "600" }}
              >
                Email
              </Card.Title>
              {editMode ? (
                <>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter email"
                    isInvalid={!!validationErrors.email}
                    style={{ boxShadow: "inset 0 0 8px rgba(111,66,193,0.3)" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.email}
                  </Form.Control.Feedback>
                </>
              ) : (
                <Card.Text className="fs-5 text-secondary">{user.email}</Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <Card
            className="shadow-sm rounded-4 h-100 border-0"
            style={{ borderRadius: "12px" }}
          >
            <Card.Body>
              <Card.Title
                className="mb-3"
                style={{ color: "#6a4bcf", fontWeight: "600" }}
              >
                Address
              </Card.Title>
              {editMode ? (
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  style={{ boxShadow: "inset 0 0 8px rgba(111,66,193,0.3)" }}
                />
              ) : (
                <Card.Text className="fs-5 text-secondary">
                  {user.address || "N/A"}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col xs={12} md={6} lg={4}>
          <Card
            className="shadow-sm rounded-4 h-100 border-0"
            style={{ borderRadius: "12px" }}
          >
            <Card.Body>
              <Card.Title
                className="mb-3"
                style={{ color: "#6a4bcf", fontWeight: "600" }}
              >
                Mobile
              </Card.Title>
              {editMode ? (
                <>
                  <Form.Control
                    type="tel"
                    name="mobileNo"
                    value={formData.mobileNo}
                    onChange={handleChange}
                    placeholder="Enter mobile number"
                    isInvalid={!!validationErrors.mobileNo}
                    style={{ boxShadow: "inset 0 0 8px rgba(111,66,193,0.3)" }}
                  />
                  <Form.Control.Feedback type="invalid">
                    {validationErrors.mobileNo}
                  </Form.Control.Feedback>
                </>
              ) : (
                <Card.Text className="fs-5 text-secondary">
                  {user.mobileNo || "N/A"}
                </Card.Text>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Buttons */}
      <div className="mt-5 d-flex justify-content-center gap-3">
        {editMode ? (
          <>
            <Button
              variant="purple"
              style={{ backgroundColor: "#6a4bcf", borderColor: "#6a4bcf" }}
              onClick={handleSave}
              disabled={saving || !isFormChanged()}
              aria-disabled={saving || !isFormChanged()}
            >
              {saving ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    className="me-2"
                    role="status"
                    aria-hidden="true"
                  />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
            <Button
              variant="outline-secondary"
              onClick={() => {
                setEditMode(false);
                setFormData({
                  name: user.name || "",
                  email: user.email || "",
                  address: user.address || "",
                  mobileNo: user.mobileNo || "",
                });
                setSaveError("");
                setSaveSuccess(false);
                setValidationErrors({});
              }}
            >
              Cancel
            </Button>
          </>
        ) : (
          <Button
            variant="primary"
            style={{ backgroundColor: "#6a4bcf", borderColor: "#6a4bcf" }}
            onClick={() => setEditMode(true)}
          >
            Edit Details
          </Button>
        )}
      </div>

      {/* Save error */}
      {saveError && (
        <Alert variant="danger" className="mt-4 text-center">
          {saveError}
        </Alert>
      )}

      {/* Animated Save success alert */}
      <AnimatePresence>
        {saveSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.7, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              variant="success"
              className="mt-4 text-center shadow-lg"
              style={{ borderRadius: "12px", fontWeight: "600" }}
            >
              Changes saved successfully!
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>
    </Container>
  );
};

export default Profile;
