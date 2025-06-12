import React from "react";
import { Container, Row, Col, Card, Image, Badge, ListGroup } from "react-bootstrap";

const ModernProfile = () => {
  const userData = {
    name: "SYK",
    profileImage:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&h=300&fit=crop&crop=face",
    email: "syk@gmail.com",
    address: "Pune, Maharashtra",
    mobileNo: "11122333000",
    availability: "Available for tasks",
    tasks: {
      upcoming: 2,
      ongoing: 1,
      completed: 5,
    },
  };

  const styles = {
    container: {
      minHeight: "100vh",
      padding: "40px 20px",
      background: "linear-gradient(to right, #6A1B9A, #880E4F)",
      color: "#fff",
    },
    card: {
      borderRadius: "12px",
      boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
      backgroundColor: "rgba(255, 255, 255, 0.9)",
      color: "#333",
    },
    cardHeader: {
      fontWeight: "bold",
      fontSize: "1.25rem",
      marginBottom: "15px",
    },
    badge: {
      fontSize: "1rem",
      padding: "6px 12px",
    },
    profileTitle: {
      fontSize: "2rem",
      fontWeight: "bold",
      marginBottom: "30px",
    },
  };

  return (
    <div style={styles.container}>
      <Container>
        <Row className="mb-4">
          <Col>
            <h2 style={styles.profileTitle}>My Profile</h2>
          </Col>
        </Row>

        <Row className="g-4">
          {/* Profile Card */}
          <Col md={6}>
            <Card style={styles.card} className="text-center">
              <Card.Body>
                <Image
                  src={userData.profileImage}
                  roundedCircle
                  style={{ width: "160px", height: "160px", objectFit: "cover", border: "4px solid #6A1B9A" }}
                  className="mb-4"
                />
                <Card.Title as="h3">{userData.name}</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Volunteer Info */}
          <Col md={6}>
            <Card style={styles.card} className="position-relative">
              <div
                style={{
                  position: "absolute",
                  top: "20px",
                  right: "20px",
                  width: "12px",
                  height: "12px",
                  backgroundColor: "#22c55e",
                  borderRadius: "50%",
                }}
              ></div>
              <Card.Body>
                <Card.Title style={styles.cardHeader}>Volunteer Information</Card.Title>
                <ListGroup variant="flush">
                  <ListGroup.Item className="bg-transparent border-0">
                    <strong>Email:</strong> {userData.email}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-transparent border-0">
                    <strong>Availability:</strong> {userData.availability}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-transparent border-0">
                    <strong>Address:</strong> {userData.address}
                  </ListGroup.Item>
                  <ListGroup.Item className="bg-transparent border-0">
                    <strong>Contact No:</strong> {userData.mobileNo}
                  </ListGroup.Item>
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        {/* Task Section */}
        <Row className="mt-4">
          <Col>
            <Card style={styles.card}>
              <Card.Body>
                <Card.Title style={styles.cardHeader}>Tasks</Card.Title>
                <Row>
                  <Col md={4} className="text-center">
                    <h5>Upcoming</h5>
                    <Badge bg="secondary" pill style={styles.badge}>
                      {userData.tasks.upcoming}
                    </Badge>
                  </Col>
                  <Col md={4} className="text-center">
                    <h5>Ongoing</h5>
                    <Badge bg="warning" text="dark" pill style={styles.badge}>
                      {userData.tasks.ongoing}
                    </Badge>
                  </Col>
                  <Col md={4} className="text-center">
                    <h5>Completed</h5>
                    <Badge bg="success" pill style={styles.badge}>
                      {userData.tasks.completed}
                    </Badge>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ModernProfile;
