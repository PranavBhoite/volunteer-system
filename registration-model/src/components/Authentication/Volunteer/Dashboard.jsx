import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Modal, Form, Row, Col, Container, Spinner, Alert } from "react-bootstrap";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:5000/api/auth/users");
      setUsers(res.data);
    } catch (err) {
      setError("Failed to load users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    setLoading(true);
    setError("");
    try {
      await axios.put(`http://localhost:5000/api/auth/delete/${id}`);
      await fetchUsers();
    } catch {
      setError("Failed to delete user.");
    } finally {
      setLoading(false);
    }
  };

  const handleShowModal = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    setModalLoading(true);
    setError("");
    try {
      await axios.put(`http://localhost:5000/api/auth/update/${currentUser._id}`, currentUser);
      setShowModal(false);
      await fetchUsers();
    } catch {
      setError("Failed to update user.");
    } finally {
      setModalLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  const styles = {
    container: {
      minHeight: "100vh",
      padding: "40px 20px",
      background: "linear-gradient(to right, #6A1B9A, #880E4F)",
      color: "#fff",
    },
    heading: {
      fontSize: "2.5rem",
      fontWeight: "bold",
      marginBottom: "30px",
      textAlign: "center",
      textShadow: "0 2px 4px rgba(0,0,0,0.5)",
    },
    card: {
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      color: "#333",
    },
    cardTitle: {
      fontWeight: "bold",
      fontSize: "1.25rem",
      marginBottom: "10px",
    },
    cardText: {
      fontSize: "1rem",
      marginBottom: "15px",
    },
    buttonWarning: {
      backgroundColor: "#FFC107",
      borderColor: "#FFC107",
      color: "#000",
      fontWeight: "bold",
      borderRadius: "8px",
      padding: "8px 15px",
      marginRight: "10px",
    },
    buttonDanger: {
      borderRadius: "8px",
      fontWeight: "bold",
      padding: "8px 15px",
    },
    modalHeader: {
      backgroundColor: "#6A1B9A",
      color: "#fff",
      fontWeight: "bold",
      fontSize: "1.25rem",
    },
    modalBody: {
      color: "#333",
    },
    modalFooter: {
      borderTop: "none",
    },
    formControl: {
      borderRadius: "8px",
      padding: "10px",
      border: "1px solid #ccc",
    },
    alert: {
      marginBottom: "20px",
    },
  };

  return (
    <Container fluid style={styles.container}>
      <h2 style={styles.heading}>User Dashboard</h2>

      {error && <Alert variant="danger" style={styles.alert}>{error}</Alert>}

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "300px" }}>
          <Spinner animation="border" variant="light" />
        </div>
      ) : (
        <Row>
          {users.length === 0 && (
            <Col>
              <p className="text-center">No users found.</p>
            </Col>
          )}
          {users.map((user) => (
            <Col md={4} key={user._id} className="mb-4">
              <Card style={styles.card}>
                <Card.Body>
                  <Card.Title style={styles.cardTitle}>{user.name}</Card.Title>
                  <Card.Text style={styles.cardText}>
                    <strong>Email:</strong> {user.email} <br />
                    <strong>Address:</strong> {user.address} <br />
                    <strong>Mobile:</strong> {user.mobileNo}
                  </Card.Text>
                  <Button
                    style={styles.buttonWarning}
                    onClick={() => handleShowModal(user)}
                  >
                    Update
                  </Button>
                  <Button
                    variant="danger"
                    style={styles.buttonDanger}
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton style={styles.modalHeader}>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body style={styles.modalBody}>
          {currentUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentUser.name}
                  onChange={handleChange}
                  style={styles.formControl}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={currentUser.address}
                  onChange={handleChange}
                  style={styles.formControl}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <Form.Control
                  type="text"
                  name="mobileNo"
                  value={currentUser.mobileNo}
                  onChange={handleChange}
                  style={styles.formControl}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer style={styles.modalFooter}>
          <Button
            variant="secondary"
            onClick={() => setShowModal(false)}
            disabled={modalLoading}
            style={{ borderRadius: "8px", fontWeight: "bold" }}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={handleUpdate}
            disabled={modalLoading}
            style={{ borderRadius: "8px", fontWeight: "bold" }}
          >
            {modalLoading ? <Spinner animation="border" size="sm" /> : "Update"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
