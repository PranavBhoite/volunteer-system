import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaHandsHelping } from 'react-icons/fa';

const HelpMe = () => {
  return (
    <div className="main-content-container">
    <Container className="mt-4">
      <Row className="justify-content-center">
        <Col xs={12} md={10}>
          {/* Header */}
          <div
            className="d-inline-flex align-items-center mb-3"
            style={{
              background: 'white',
              color: '#a70a4a',
              padding: '10px 24px',
              fontSize: '1.5rem',
              fontWeight: 'bold',
              borderRadius: '12px',
              border: '2px solid #8ee8ff',
            }}
          >
            <FaHandsHelping style={{ marginRight: '10px', fontSize: '1.6rem' }} />
            Help & Support
          </div>

          {/* Scrollable Help Content */}
          <div
            style={{
              maxHeight: '400px',
              overflowY: 'auto',
              border: '2px solid #8ee8ff',
              borderRadius: '12px',
              padding: '20px',
              backgroundColor: '#fff',
              boxShadow: '0 0 12px rgba(80, 209, 255, 0.3)',
            }}
          >
            <h5 style={{ fontWeight: 'bold', marginBottom: '15px', color: '#a70a4a' }}>
              Welcome Volunteer!
            </h5>
            <p>We’re here to help you use all features smoothly and resolve your queries.</p>

            <h6 className="mt-4" style={{ fontWeight: 'bold' }}>
              How to Use:
            </h6>
            <ul style={{ paddingLeft: '1.2rem' }}>
              <li style={{ marginBottom: "10px" }}>
                <strong>Profile:</strong> In <b>Profile</b>, you can edit your information using the
                Edit option. It also displays your <b>User ID</b> and other details.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Home:</strong> See <b>TMGF Moments</b> and <b>Events</b> at a glance.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Event:</strong> View events shared by the NGO. You can participate, and view
                <b> upcoming</b>, <b>past</b>, and <b>completed</b> events with full details.
              </li>
              <li style={{ marginBottom: "10px" }}>
                <strong>Event Initiatives:</strong> Create your own events! For example, if you're a
                teacher, use the <b>Create</b> button to propose sessions, mention if you need
                volunteers, and submit. Once approved by admin, you'll be contacted via email or phone.
              </li>
            </ul>
            <hr />
          </div>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

export default HelpMe;
