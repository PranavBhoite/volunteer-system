import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Table, Button, Container, Form } from 'react-bootstrap';
import axios from 'axios';

const Help = () => {
  const { uid } = useParams();
  const [events, setEvents] = useState([]);

  const [showModal, setShowModal] = useState(false);
  const [currentStatus, setCurrentStatus] = useState('');
  const [currentEventId, setCurrentEventId] = useState(null);
  const [feedbackMessage, setFeedbackMessage] = useState('');

  const handleSubmitStatusChange = () => {
    if (feedbackMessage.trim() === '') {
      alert("Feedback message cannot be empty.");
      return;
    }

    handleStatusChange(currentEventId, currentStatus, feedbackMessage.trim());
    setShowModal(false);
    setFeedbackMessage('');
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/help/all');
      console.log(res.data)
      setEvents(res.data);
    } catch (error) {
      console.error('Failed to fetch help events:', error);
    }
  };

  const handleStatusChange = async (id, status, message) => {
    try {
      console.log(message);
      await axios.put(`http://localhost:5000/api/help/status/${id}`, { status, message });
      fetchEvents();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <Container className="mt-5">
      <h2>Admin Dashboard</h2>
      <p>Logged in as UID: {uid}</p>
      <Table striped bordered responsive>
        <thead>
          <tr>
            <th>Name</th>
            <th>Title</th>
            <th>Description</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Location</th>
            <th>Volunteers Needed</th>
            <th>Event Status</th>
            <th>Help Status</th>
            <th>FeedBack</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {events.map(ev => (
            <tr key={ev.userId}>
              <td>{ev.userId?.name || '-'}</td>
              <td>{ev.title}</td>
              <td>{ev.description}</td>
              <td>{ev.startDate}</td>
              <td>{ev.endDate}</td>
              <td>{ev.location}</td>
              <td>{ev.volunteersNeeded}</td>
              <td>{ev.status}</td>
              <td>{ev.helpStatus}</td>
              <td>{ev.helpStatus === 'pending' ? (
                  <span className="text-muted fst-italic">Add feedback by approving or disapproving</span>
                ) : (
                  <span>{ev.helpFeedback || '—'}</span>
                )}</td>
              <td>
                {ev.helpStatus === "approved" ? (
                  <span className="text-success fw-bold">Approved</span>
                ) : ev.helpStatus === "disapproved" ? (
                  <span className="text-danger fw-bold">Disapproved</span>
                ) :(
                  <>
                    <Button
                      variant="success"
                      size="sm"
                      onClick={() => {
                        setCurrentStatus("approved");
                        setCurrentEventId(ev.id);
                        setShowModal(true);
                      }}
                    >
                      Approve
                    </Button>{' '}
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => {
                        setCurrentStatus("disapproved");
                        setCurrentEventId(ev.id);
                        setShowModal(true);
                      }}
                    >
                      Disapprove
                    </Button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Provide Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Feedback Message</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={feedbackMessage}
              onChange={(e) => setFeedbackMessage(e.target.value)}
              placeholder="Enter your feedback..."
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmitStatusChange}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>

    </Container>
  );
};

export default Help;
