import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, Button, Modal, Form, Row, Col, Container } from "react-bootstrap";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const fetchUsers = async () => {
    const res = await axios.get("http://localhost:5000/api/auth/users");
    setUsers(res.data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    await axios.put(`http://localhost:5000/api/auth/delete/${id}`);
    fetchUsers();
  };

  const handleShowModal = (user) => {
    setCurrentUser(user);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    await axios.put(`http://localhost:5000/api/auth/update/${currentUser._id}`, currentUser);
    setShowModal(false);
    fetchUsers();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">User Dashboard</h2>
      <Row>
        {users.map((user) => (
          <Col md={4} key={user._id} className="mb-4">
            <Card>
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Text>
                  <strong>Email:</strong> {user.email} <br />
                  <strong>Address:</strong> {user.address} <br />
                  <strong>Mobile:</strong> {user.mobileNo}
                </Card.Text>
                <Button variant="warning" className="me-2" onClick={() => handleShowModal(user)}>Update</Button>
                <Button variant="danger" onClick={() => handleDelete(user._id)}>Delete</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Update Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentUser && (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" name="name" value={currentUser.name} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" name="address" value={currentUser.address} onChange={handleChange} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="text" name="mobileNo" value={currentUser.mobileNo} onChange={handleChange} />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Update</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Dashboard;
