import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Table, Button, Container, Row, Col, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
import { BsCalendarEvent, BsCheck2Circle, BsXCircle } from 'react-icons/bs';
import { FaEye, FaEdit, FaTrash } from 'react-icons/fa';


const AdminHelp = () => {
  const { uid } = useParams();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [feedback, setFeedback] = useState('');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/help/all');
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch help events:', error);
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/help/status/${id}`, { status });
      fetchEvents();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleFeedbackSubmit = async () => {
    try {
      await axios.put(`http://localhost:5000/api/help/feedback/${selectedEvent._id}`, {
        feedback
      });
      setSelectedEvent(null);
      fetchEvents();
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    }
  };

  return (
    <Container className="mt-5">
      <Row className="align-items-center justify-content-between mb-4">
        <Col>
          <h3 className="events-heading">
            <BsCalendarEvent style={{ marginRight: '10px' }} />
            Help Requests
          </h3>
        </Col>
        <Col className="text-end fw-semibold text-muted">
          UID: {uid}
        </Col>
      </Row>

      <div style={{ maxHeight: '450px', overflowY: 'auto'  }}>
        <Table  bordered responsive className="table-bordered-blue ">
          <thead className="table-header-maroon">
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Title</th>
              <th>Start-Date</th>
              <th>Status</th>
              <th style={{ textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((ev, index) => {
              const rowColor = index % 2 === 0 ? '#ffffff' : '#e6f7ff';
              return (
                <tr key={ev._id}>
                  <td style={{ backgroundColor: rowColor }}>{ev.userId?.name || '-'}</td>
                  <td style={{ backgroundColor: rowColor }}>{ev.userId?.email || '-'}</td>
                  <td style={{ backgroundColor: rowColor }}>{ev.userId?.mobileNo || '-'}</td>
                  <td style={{ backgroundColor: rowColor }}>{ev.title}</td>
                  <td style={{ backgroundColor: rowColor }}>{ev.date}</td>
                  <td style={{ backgroundColor: rowColor }}>
                    {ev.status.charAt(0).toUpperCase() + ev.status.slice(1)}
                  </td>
                  <td style={{ backgroundColor: rowColor }}>
                    <div className="d-flex gap-2 justify-content-center">
                      <Button variant="outline-info" size="sm" onClick={() => {
                        setSelectedEvent(ev);
                        setFeedback(ev.feedback || '');
                      }}>
                        <FaEye />
                      </Button>
                      <Button
                        variant={ev.status === 'approved' ? 'success' : 'outline-success'}
                        size="sm"
                        onClick={() => handleStatusChange(ev._id, 'approved')}
                      >
                        <BsCheck2Circle />
                      </Button>
                      <Button
                        variant={ev.status === 'disapproved' ? 'danger' : 'outline-danger'}
                        size="sm"
                        onClick={() => handleStatusChange(ev._id, 'disapproved')}
                      >
                        <BsXCircle />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {/* View Event Modal */}
      {selectedEvent && (
        <Modal show onHide={() => setSelectedEvent(null)} centered>
          <Modal.Header closeButton>
            <Modal.Title>Event Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p><strong>Title:</strong> {selectedEvent.title}</p>
            <p><strong>Start Date:</strong> {selectedEvent.date}</p>
            <p><strong>End Date:</strong> {selectedEvent.endDate || '-'}</p>
            <p><strong>Time:</strong> {selectedEvent.time}</p>
            <p><strong>Place:</strong> {selectedEvent.place}</p>
            <p><strong>Volunteers Needed:</strong> {selectedEvent.extraVolunteers ? "Yes" : "No"}</p>
            <p><strong>Status:</strong> {selectedEvent.status}</p>

            <Form.Group className="mt-3">
              <Form.Label><strong>Admin Feedback:</strong></Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Write feedback here (optional)"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setSelectedEvent(null)}>Close</Button>
            <Button variant="primary" onClick={handleFeedbackSubmit}>Save Feedback</Button>
          </Modal.Footer>
        </Modal>
      )}
    </Container>
  );
};

export default AdminHelp;


