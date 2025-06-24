import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Card, Container, Row, Col, Spinner, Alert } from "react-bootstrap";

const Profile = () => {
  const { uid } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/users/display/${uid}`);
      setUserData(res.data);
    } catch (err) {
      setError("Failed to fetch user data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  if (loading) return <Spinner animation="border" className="mt-5 mx-auto d-block" />;
  if (error) return <Alert variant="danger" className="mt-5 mx-auto w-50">{error}</Alert>;

  return (
    <Container className="mt-5">
      <Card className="shadow-lg p-4">
        <h3 className="text-center mb-4">👤 User Profile</h3>
        <Row>
          <Col md={6}>
            <p><strong>Full Name:</strong> {userData.name}</p>
            <p><strong>Email:</strong> {userData.email}</p>
            <p><strong>Mobile:</strong> {userData.mobileNo}</p>
            <p><strong>Type:</strong> {userData.type}</p>
          </Col>
        </Row>
        <hr />
        <p className="text-muted text-end"><strong>User ID:</strong> {uid}</p>
      </Card>
    </Container>
  );
};

export default Profile;
