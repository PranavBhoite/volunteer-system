import React, { useState, useEffect, useRef } from "react";
import {
  Card,
  Container,
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

  const pinkColor = "#e91e63"; // Pink color for headings and highlights

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

  const [registeredEvents, setRegisteredEvents] = useState([]);
  const [completedEvents, setCompletedEvents] = useState([]);

  const successTimeoutRef = useRef(null);

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
      } catch (err) {
        setError("Failed to load user info.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [uid]);

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const [registeredRes, completedRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/events/${uid}/Registered`),
          axios.get(`http://localhost:5000/api/events/${uid}/Completed`),
        ]);
        setRegisteredEvents(registeredRes.data || []);
        setCompletedEvents(completedRes.data || []);
      } catch (err) {
        console.error("Error fetching events: ", err);
      }
    };
    fetchEventData();
  }, [uid]);

  useEffect(() => {
    return () => {
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
    };
  }, []);

  const validate = () => {
    const errors = {};
    if (!formData.name.trim()) errors.name = "Name is required";
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email)) {
      errors.email = "Invalid email address";
    }
    if (formData.mobileNo.trim() && !/^\d{7,15}$/.test(formData.mobileNo.trim())) {
      errors.mobileNo = "Mobile number should be digits only (7-15 chars)";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
    setValidationErrors((prev) => ({ ...prev, [e.target.name]: "" }));
  };

  const handleSave = async () => {
    if (!validate()) return;
    setSaving(true);
    setSaveError("");
    setSaveSuccess(false);
    try {
      await axios.put(`http://localhost:5000/api/users/update/${uid}`, formData);
      setUser(formData);
      setSaveSuccess(true);
      setEditMode(false);
      if (successTimeoutRef.current) clearTimeout(successTimeoutRef.current);
      successTimeoutRef.current = setTimeout(() => setSaveSuccess(false), 2500);
    } catch (error) {
      setSaveError("Failed to save changes. Please try again.");
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
    <Container
      className="py-5 min-vh-100"
      fluid
      style={{
        maxWidth: "100%",
        paddingLeft: "20px",
        paddingRight: "20px",
        boxSizing: "border-box",
      }}
    >
      <h2
        className="mb-4"
        style={{ fontWeight: "700", color: pinkColor, textAlign: "left" }}
      >
        User Profile
      </h2>

      <Card
        className="shadow-sm rounded-4 border-0 mb-4"
        style={{ border: `2px solid ${pinkColor}` }}
      >
        <Card.Body>
          {["name", "email", "address", "mobileNo"].map((field) => (
            <div key={field} className="mb-4">
              <h5 style={{ color: pinkColor, fontWeight: "600" }}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </h5>
              {editMode ? (
                <Form.Control
                  type={
                    field === "email"
                      ? "email"
                      : field === "mobileNo"
                      ? "tel"
                      : field === "address"
                      ? "textarea"
                      : "text"
                  }
                  name={field}
                  value={formData[field]}
                  onChange={handleChange}
                  placeholder={`Enter ${field}`}
                  isInvalid={!!validationErrors[field]}
                  as={field === "address" ? "textarea" : "input"}
                  rows={field === "address" ? 3 : undefined}
                  style={{ boxShadow: `inset 0 0 8px ${pinkColor}80` }}
                />
              ) : (
                <p className="fs-5 text-secondary">{user[field] || "N/A"}</p>
              )}
              <Form.Control.Feedback type="invalid">
                {validationErrors[field]}
              </Form.Control.Feedback>
            </div>
          ))}

          <div className="d-flex justify-content-center gap-3 mt-4">
            {editMode ? (
              <>
                <Button
                  variant="pink"
                  style={{ backgroundColor: pinkColor, borderColor: pinkColor }}
                  onClick={handleSave}
                  disabled={saving || !isFormChanged()}
                >
                  {saving ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
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
                      name: user.name,
                      email: user.email,
                      address: user.address,
                      mobileNo: user.mobileNo,
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
                style={{ backgroundColor: pinkColor, borderColor: pinkColor }}
                onClick={() => setEditMode(true)}
              >
                Edit Details
              </Button>
            )}
          </div>

          {saveError && (
            <Alert variant="danger" className="mt-4 text-center">
              {saveError}
            </Alert>
          )}

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
        </Card.Body>
      </Card>

      <Card
        className="shadow-sm rounded-4 border-0"
        style={{ border: `2px solid ${pinkColor}` }}
      >
        <Card.Body>
          <h4 style={{ color: pinkColor }}>Registered Events</h4>
          {registeredEvents.length === 0 ? (
            <p className="text-muted">No registered events found.</p>
          ) : (
            registeredEvents.map((event) => (
              <Card
                key={event._id}
                className="border-0 shadow-sm rounded-4 mb-3"
              >
                <Card.Body>
                  <Card.Title style={{ fontWeight: "600", color: pinkColor }}>
                    {event.title}
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    {event.description}
                  </Card.Text>
                  <div className="text-muted small">
                    {event.date} at {event.time}
                  </div>
                  <div className="text-muted small">Location: {event.location}</div>
                </Card.Body>
              </Card>
            ))
          )}

          <h4 className="mt-4" style={{ color: pinkColor }}>
            Completed Events
          </h4>
          {completedEvents.length === 0 ? (
            <p className="text-muted">No completed events yet.</p>
          ) : (
            completedEvents.map((event) => (
              <Card
                key={event._id}
                className="border-0 shadow-sm rounded-4 bg-light mb-3"
              >
                <Card.Body>
                  <Card.Title style={{ fontWeight: "600", color: pinkColor }}>
                    {event.title}
                  </Card.Title>
                  <Card.Text className="text-secondary">
                    {event.description}
                  </Card.Text>
                  <div className="text-muted small">
                    {event.date} at {event.time}
                  </div>
                  <div className="text-muted small">Location: {event.location}</div>
                </Card.Body>
              </Card>
            ))
          )}
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Profile;
