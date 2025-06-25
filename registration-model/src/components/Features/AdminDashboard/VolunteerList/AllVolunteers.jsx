import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Form, Button, Spinner, Badge, Alert } from "react-bootstrap";
import axios from "axios";

const AllVolunteers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("active"); // "active" or "inactive"

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/users/allusers");
      setUsers(response.data);
    } catch (err) {
      setError("Failed to load volunteers");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = activeTab === "active" ? user.isActive === true: user.isActive === false;
    return matchesSearch && matchesStatus;
  });

  return (
    <Container 
    className="px-4 py-3" style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0" style={{ color: '#a70a4a', fontWeight: '600' }}>Volunteer Management</h2>
          <p className="text-muted mb-0">Manage your volunteer community</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4 gap-2">
        <Form.Control
          type="text"
          placeholder="Search volunteers..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '300px', borderRadius: '6px', border: '1px solid #ddd' }}
        />

        <div className="btn-group" role="group">
          <Button
            variant={activeTab === "active" ? "success" : "outline-secondary"}
            onClick={() => setActiveTab("active")}
            style={{
              backgroundColor: activeTab === "active" ? 'rgb(25, 135, 84)' : 'transparent',
              borderColor: '#ddd',
              color: activeTab === "active" ? 'white' : 'rgb(25, 135, 84)',
              fontWeight: '500'
            }}
          >
            Active
          </Button>

          <Button
            variant={activeTab === "inactive" ? "secondary" : "outline-secondary"}
            onClick={() => setActiveTab("inactive")}
            style={{
              backgroundColor: activeTab === "inactive" ? '#ef5a5a' : 'transparent',
              borderColor: '#ddd',
              color: activeTab === "inactive" ? 'white' : '#ef5a5a',
              fontWeight: '500'
            }}
          >
            Inactive
          </Button>
        </div>
      </div>

      {/* Content Section */}
      {error && (
        <Alert variant="danger" className="mb-4">
          {error}
        </Alert>
      )}

      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" style={{ color: '#4a6ee0' }} />
          <p className="mt-3" style={{ color: '#6c757d' }}>Loading volunteers...</p>
        </div>
      ) : filteredUsers.length === 0 ? (
        <Card className="h-100" style={{
          border: '2px solid #0d6efd',
          borderRadius: '8px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'transform 0.2s'
        }}>
          <Card.Body>
            <i className="bi bi-people" style={{ fontSize: "3rem", color: '#adb5bd' }}></i>
            <h5 className="mt-3" style={{ color: '#495057' }}>No volunteers found</h5>
            <p className="text-muted">
              {searchTerm ? "Try a different search term" : "No volunteers in this category"}
            </p>
          </Card.Body>
        </Card>
      ) : (
        <Row xs={1} md={2} lg={3} className="g-4">
          {filteredUsers.map((user) => (
            <Col key={user.id}>
              <Card className="h-100" style={{
                border: '2px solid rgb(50, 221, 252)', //  Blue border here
                borderRadius: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.2s'
              }}>
                <Card.Body>
                  <div className="mb-3">
                    <h5 style={{ color: '#3a3a3a', fontWeight: '600' }}>{user.name}</h5>
                    <small className="text-muted" style={{ display: 'block', fontSize: '0.85rem' }}>
                      ID: {user._id}
                    </small>
                  </div>

                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-envelope me-2" style={{ color: '#6c757d', width: '20px' }}></i>
                      <span style={{ color: '#495057', fontSize: '0.9rem' }}>Email: {user.email}</span>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <i className="bi bi-telephone me-2" style={{ color: '#6c757d', width: '20px' }}></i>
                      <span style={{ color: '#495057', fontSize: '0.9rem' }}>Phone: {user.mobileNo}</span>
                    </div>
                    <div className="d-flex align-items-center">
                      <i className="bi bi-calendar me-2" style={{ color: '#6c757d', width: '20px' }}></i>
                      <span style={{ color: '#495057', fontSize: '0.9rem' }}>
                        Address: {user.address}
                      </span>
                    </div>
                  </div>
                </Card.Body>
                <Card.Footer style={{
                  backgroundColor: 'transparent',
                  borderTop: '1px solid #eee',
                  padding: '12px 16px'
                }}>
                  <div className="d-flex justify-content-between align-items-center">
                    {/* Placeholder for future footer content */}
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default AllVolunteers;