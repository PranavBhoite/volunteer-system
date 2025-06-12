import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button, Alert } from "react-bootstrap";

const Dashboard = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Dashboard mounted with userId:", userId); // Debug log

    if (!userId) {
      setError("No user ID provided");
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        console.log("Fetching user data for ID:", userId); // Debug log
        const response = await axios.get(
          `http://localhost:5000/api/users/display/${userId}`
        );
        console.log("User data received:", response.data); // Debug log
        setUser(response.data);
        setError("");
      } catch (err) {
        console.error("Error fetching user:", err);
        console.error("Error response:", err.response?.data); // Debug log
        console.error("Error status:", err.response?.status); // Debug log
        setError(err.response?.data?.message || "Failed to load user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      setError("");
      console.log("Updating user with data:", {
        name: user.name,
        address: user.address,
        mobileNo: user.mobileNo,
      }); // Debug log

      const response = await axios.put(
        `http://localhost:5000/api/users/update/${userId}`,
        {
          name: user.name,
          address: user.address,
          mobileNo: user.mobileNo,
        }
      );

      console.log("Update response:", response.data); // Debug log
      alert("User updated successfully");
    } catch (err) {
      console.error("Update error:", err);
      console.error("Update error response:", err.response?.data); // Debug log
      setError(err.response?.data?.message || "Failed to update user");
    }
  };

  const handleVolunteerView = () => {
          navigate(`/volunteer-view/${userId}`);
  } ;

  // Show loading state
  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center">
          <p>Loading user data...</p>
          <p className="text-muted">User ID: {userId}</p>
        </div>
      </Container>
    );
  }

  // Show error state
  if (error) {
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
          <p className="text-muted">User ID: {userId}</p>
        </Alert>
      </Container>
    );
  }

  // Show message if no user data
  if (!user) {
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>No User Data</Alert.Heading>
          <p>No user data found for ID: {userId}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h3>User Dashboard</h3>
      <p className="text-muted mb-4">User ID: {userId}</p>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={user.name || ""}
            onChange={handleChange}
            placeholder="Enter name"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email (read only)</Form.Label>
          <Form.Control
            name="email"
            value={user.email || ""}
            readOnly
            className="bg-light"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Mobile No</Form.Label>
          <Form.Control
            name="mobileNo"
            value={user.mobileNo || ""}
            onChange={handleChange}
            placeholder="Enter mobile number"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="address"
            value={user.address || ""}
            onChange={handleChange}
            placeholder="Enter address"
          />
        </Form.Group>

        <Button variant="primary" onClick={handleUpdate}>
          Update Profile
        </Button>
        <Button
  variant="success"
  className="mt-3 ms-2"
  onClick={handleVolunteerView}
>
  Go to Volunteer View
</Button>
      </Form>
    </Container>
  );
};

export default Dashboard;
